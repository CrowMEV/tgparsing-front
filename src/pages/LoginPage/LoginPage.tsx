import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './login.module.sass';

const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
