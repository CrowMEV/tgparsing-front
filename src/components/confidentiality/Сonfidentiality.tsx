import { Link } from 'react-router-dom';
import styles from './confidentiality.module.sass';

const Сonfidentiality = () => {
  return (
    <p className={styles.text}>
      Нажимая “Продолжить” Вы соглашаетесь с{' '}
      <Link className={styles.link} to="/">
        политикой конфиденциальности
      </Link>{' '}
      и{' '}
      <Link className={styles.link} to="/">
        договором публичной оферты
      </Link>
    </p>
  );
};
export default Сonfidentiality;
