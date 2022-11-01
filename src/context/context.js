import { useEffect, useState, createContext } from "react";
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'

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

    useEffect(() => {
        checkIfWalletIsConnected()
        checkIfTransactionsExists()
    },[transactionCount])

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert('Please install Metamask')
            }
            const accounts = await ethereum.request({ method:'eth_requestAccounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0])
            } else {
                console.log('No accounts found')
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

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
            {children}
        </TransactionContext.Provider>
    )
}