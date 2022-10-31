import styles from '../styles/Navbar.module.css'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const Navbar = () => {
  return <nav className={styles.navigationContainer}>
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img 
          src='../assets/venmo-logo.svg' 
          alt='Venmo logo' 
          className={styles.logoImage}/>
      </div>
      <div className={styles.actionsContainer}>
        <p>
          Hello, <span className={styles.accentColor}>UserAddress!</span> 👋
        </p>
        <ChevronDownIcon className={styles.arrowDownIcon} />
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatarImage}
            src='https://i.pravatar.cc/40'
            alt='' />
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar
