import { ChatBubbleBottomCenterIcon, GlobeAltIcon, HeartIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/solid";
import styles from "../../styles/Activity.module.css";

function ActivityCard() {

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
            <div key='' className={styles.feedItem}>
              <div className={styles.avatarContainer}>
                <img
                  className={styles.avatarImage}
                  src='https://i.pravatar.cc/40'
                  alt=""
                />
              </div>

              <div className={styles.feedDetails}>
                <h3 className={styles.feedAuthor}>
                ADDRESS1 to ADDRESS2
                </h3>
                <span className={styles.feedCreatedAt}>
                  Date
                  <GlobeAltIcon className={styles.globeIcon} />
                </span>

                <p className={styles.feedBody}>Message</p>
              </div>

              <div className={styles.feedCta}>
                <HeartIcon className={styles.likeIcon} />
                <ChatBubbleBottomCenterIcon className={styles.commentIcon} />
              </div>
            </div>
      </div>
    </div>
  );
}

export default ActivityCard;