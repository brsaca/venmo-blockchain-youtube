import { ChatBubbleBottomCenterIcon, GlobeAltIcon, HeartIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/solid";
import styles from "../../styles/Activity.module.css";
import { useContext } from "react";
import { TransactionContext } from "../../context/context";
import { shortenAddress } from "../../utils/shortenAddress";

function ActivityCard() {
  const { transactions } = useContext(TransactionContext);
  const generateRandomAvatar = () => {
    const randomAvatar = Math.floor(Math.random() * 1000);
    return `https://i.pravatar.cc/${randomAvatar}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <p className={styles.tabTitle}>Activity</p>
        <div className={styles.navigationContainer}>
          <div className={styles.navigationItem} data-current>
            <GlobeAltIcon className={styles.navigationIcon} />
          </div>
          <div className={styles.navigationItem}>
            <UserIcon className={styles.navigationIcon} />
          </div>
          <div className={styles.navigationItem}>
            <UserGroupIcon className={styles.navigationIcon} />
          </div>
        </div>
      </div>

      <div className={styles.feedList}>
        {transactions.map(
          ({ addressFrom, timestamp, message, addressTo }, index) => (
            <div key={index} className={styles.feedItem}>
              <div className={styles.avatarContainer}>
                <img
                  className={styles.avatarImage}
                  src={generateRandomAvatar()}
                  alt=""
                />
              </div>

              <div className={styles.feedDetails}>
                <h3 className={styles.feedAuthor}>
                {shortenAddress(addressFrom)} to {shortenAddress(addressTo)}
                </h3>
                <span className={styles.feedCreatedAt}>
                  {timestamp}
                  <GlobeAltIcon className={styles.globeIcon} />
                </span>

                <p className={styles.feedBody}>{message}</p>
              </div>

              <div className={styles.feedCta}>
                <HeartIcon className={styles.likeIcon} />
                <ChatBubbleBottomCenterIcon className={styles.commentIcon} />
              </div>
            </div>
           )
        )} 
      </div>
    </div>
  );
}

export default ActivityCard;