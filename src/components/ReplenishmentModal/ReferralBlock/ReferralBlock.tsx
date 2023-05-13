import React, { useState } from 'react';
import styles from './referralBlock.module.sass';

const referralLink = 'http://localhost:3000/';

const ReferralBlock = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(referralLink);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Приглашайте друзей и получайте до</h1>
        <div className={styles.discountOffer}>
          <p className={styles.discountOffer__text}>
            от бюджета
            <br />
            каждого приглашенного на свой
            <br />
            бонусный счет
          </p>
          <p>
            <span className={styles.discountOffer__amount}>5%</span>
          </p>
        </div>
      </div>
      <div className={styles.additionalText}>
        <p>
          По вашей ссылке каждый приглашенный получит
          <br />
          <span className={styles.accent}>личный кабинет</span> и{' '}
          <span className={styles.accent}>50 рублей</span> на свой баланс.
        </p>
        <p>Поделитесь ей со своими друзьями прямо сейчас!</p>
      </div>

      <div className={styles.referral}>
        <div className={styles.referral__top}>
          <h3>Ваша реферальная ссылка:</h3>
          <span
            className={`${styles.accent} ${styles.referral__copyBtn}`}
            onClick={handleCopy}
          >
            {isCopied ? 'скопировано!' : 'скопировать'}
          </span>
        </div>
        <p className={styles.referral__link} onClick={handleCopy}>
          {referralLink}
          <span className="material-icons-outlined">content_copy</span>
        </p>
      </div>

      <div className={styles.share}>
        <h3>Поделиться:</h3>
        <div className={styles.share__icons}>
          <a href="#" className={`${styles.share__icon} ${styles.WA}`}></a>
          <a href="#" className={`${styles.share__icon} ${styles.TG}`}></a>
          <a href="#" className={`${styles.share__icon} ${styles.VK}`}></a>
          <a href="#" className={`${styles.share__icon} ${styles.FB}`}></a>
          <a href="#" className={`${styles.share__icon} ${styles.TW}`}></a>
        </div>
      </div>
    </div>
  );
};

export default ReferralBlock;
