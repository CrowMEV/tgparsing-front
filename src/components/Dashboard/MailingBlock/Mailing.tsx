import styles from './index.module.sass';

const Mailing = () => {
  return (
    <div className={styles.mailing}>
      <label>Предстоящие рассылки</label>
      <div className={styles.mailing__info}>
        <span>У вас пока нет ни одной предстоящей рассылки</span>
      </div>
    </div>
  );
};

export default Mailing;
