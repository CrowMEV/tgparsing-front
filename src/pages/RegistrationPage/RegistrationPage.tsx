import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './registration.module.sass';

const RegistrationPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
