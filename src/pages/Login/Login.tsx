import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './login.module.sass';

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
};

export default Login;
