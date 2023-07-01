import styles from './confidentiality.module.sass';

const Сonfidentiality = () => {
  return (
    <p className={styles.text}>
      Нажимая “Продолжить” Вы соглашаетесь с{' '}
      <a
        className={styles.link}
        href={require('../../assets/pdfs/personal-data-policy.pdf')}
        target="_blank"
      >
        политикой конфиденциальности
      </a>{' '}
      и{' '}
      <a
        className={styles.link}
        href={require('../../assets/pdfs/public-offer.pdf')}
        target="_blank"
      >
        договором публичной оферты
      </a>
    </p>
  );
};
export default Сonfidentiality;
