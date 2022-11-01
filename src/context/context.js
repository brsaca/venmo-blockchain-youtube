import { useEffect, useState, createContext } from "react";
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export const TransactionContext = createContext()

const { ethereum } = window

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer,
    )
  
    return transactionsContract
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [addressTo, setAddressTo] = useState('')
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(
      localStorage.getItem('transactionCount'),
    )
    const [transactions, setTransactions] = useState([])

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract()

                const availableTransactions =
                await transactionsContract.getAllTransactions()

                const structuredTransactions = availableTransactions.map(
                    transaction => ({
                        addressTo: transaction.receiver,
                        addressFrom: transaction.sender,
                        timestamp: timeAgo.format(
                        new Date(transaction.timestamp.toNumber() * 1000),
                        'mini',
                        ),
                        message: transaction.message,

                        amount: parseInt(transaction.amount._hex) / 10 ** 18,
                    }),
                )

                console.log(structuredTransactions)

                setTransactions(structuredTransactions)
            } else {
                console.log('Ethereum is not present')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert('Please install Metamask')
            }
            const accounts = await ethereum.request({ method:'eth_requestAccounts' })
            setCurrentAccount(accounts[0])
            window.location.reload()
        } catch (error) {
            console.log(error)
            throw new Error('No ethereum object')
        }
    } 

    const checkIfTransactionsExists = async () => {
        try {
          if (ethereum) {
            const transactionsContract = createEthereumContract()
            const currentTransactionCount =
              await transactionsContract.getTransactionCount()
    
            window.localStorage.setItem('transactionCount', currentTransactionCount)
          }
        } catch (error) {
          console.log(error)
    
          throw new Error('No ethereum object')
        }
    }

    const sendTransaction = async () => {
        try {
            if(ethereum) {
                const transactionsContract = createEthereumContract()
                const parsedAmount = ethers.utils.parseEther(amount)

                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: currentAccount,
                            to: addressTo,
                            gas: '0x5208',
                            value: parsedAmount._hex,
                        },
                    ],
                })

                const transactionHash = await transactionsContract.addToBlockchain(
                    addressTo,
                    parsedAmount,
                    message,
                )
        
                setIsLoading(true)
                console.log(`Loading - ${transactionHash.hash}`)
                await transactionHash.wait()
                console.log(`Success - ${transactionHash.hash}`)
                setIsLoading(false)
        
                const transactionsCount =
                await transactionsContract.getTransactionCount()
        
                setTransactionCount(transactionsCount.toNumber())
                window.location.reload()
            } else {
                console.log('No ethereum object')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            try {
                if (!ethereum) {
                    return alert('Please install Metamask')
                }
                const accounts = await ethereum.request({ method:'eth_requestAccounts' })
                if (accounts.length) {
                    setCurrentAccount(accounts[0])
    
                    getAllTransactions()
                } else {
                    console.log('No accounts found')
                }
            } catch (error) {
                console.log(error)
            }
        }
        checkIfWalletIsConnected()
        checkIfTransactionsExists()
    },[transactionCount])

    return (
        <TransactionContext.Provider value={{ 
            transactionCount,
            connectWallet, 
            transactions,
            isLoading,
            currentAccount, 
            sendTransaction,
            setAddressTo,
            addressTo,
            setAmount,
            amount,
            message,
            setMessage, 
        }}>
            {children}
        </TransactionContext.Provider>
    )
}