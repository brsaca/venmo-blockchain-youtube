import styles from '../styles/Navbar.module.css'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { TransactionContext  } from '../context/context'
import { useContext  } from 'react'
import { shortenAddress } from '../utils/shortenAddress'

const Navbar = () => {
  const { currentAccount , connectWallet } = useContext(TransactionContext)

  return (
    <nav className={styles.navigationContainer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img 
            src='../assets/venmo-logo.svg' 
            alt='Venmo logo' 
            className={styles.logoImage}/>
        </div>
        {currentAccount ? (
          <div className={styles.actionsContainer}>
            <p>
              Hello, <span className={styles.accentColor}>{shortenAddress(currentAccount)}!</span> 👋
            </p>
            <ChevronDownIcon className={styles.arrowDownIcon} />
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatarImage}
                src='https://i.pravatar.cc/40'
                alt='' />
            </div>
          </div>
        ):(
          <button className={styles.connectBtn} onClick={connectWallet}>Connect Wallet</button>
        )}
        
      </div>
    </nav>
  )
}

export default Navbar
