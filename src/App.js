import styles from './styles/App.module.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className={styles.wrapper}>
      <header>
        <Navbar />
      </header>
    </div>
  );
}

export default App;
