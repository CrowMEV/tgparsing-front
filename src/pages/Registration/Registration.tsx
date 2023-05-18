import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './registration.module.sass';

const Registration = () => {
  return (
    <div className={styles.wrapper}>
      <RegistrationForm />
    </div>
  );
};

export default Registration;
