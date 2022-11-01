import { ArrowsUpDownIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import styles from '../../styles/Transaction.module.css'

function TransactionForm() {
  return (
    <div className={styles.container}>
      <h3 className={styles.formTitle}>Send Payment / Request</h3>

      <form>
        <div className={styles.formContainer}>
          <div className={styles.swapContainer}>
            <ArrowsUpDownIcon className={styles.swapIcon} />
            <p className={styles.swapTitle}>Swap to/from</p>
          </div>

          <div className={styles.formBody}>
            <div className={styles.formInputContainer}>
              <h4 className={styles.formInputTitle}>To</h4>
              <input
                className={styles.formInput}
                type="text"
                name="addressTo"
                value=''
                //onChange={(e) => setAddressTo(e.target.value)}
              />
            </div>
            <div className={styles.formInputContainer}>
              <h4 className={styles.formInputTitle}>Message</h4>
              <input
                className={styles.formInput}
                type="text"
                name="message"
                value=''
               // onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formFooter}>
            <h4 className={styles.footerTitle}>Amount</h4>

            <div className={styles.footerContainer}>
              <div className={styles.amountContainer}>
                <div className={styles.inputContainer}>
                  <CurrencyDollarIcon className={styles.dollarIcon} />
                  <input
                    className={styles.amountInput}
                    type="number"
                    name="amount"
                    value=''
                    step="0.001"
                   // onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <button className={styles.sendButton} type="submit">
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


export default TransactionForm
