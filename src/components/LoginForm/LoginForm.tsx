import { Link } from 'react-router-dom';
import { Routes } from '../../router/routes';
import styles from './login-form.module.sass';
import { loginSchema } from './validation-schema';
import { Formik, Form, Field } from 'formik';
import Loader from '../ui/loader/loader';
import { useState } from 'react';
import { LoginData } from '../../types/auth';
import { ReactComponent as LoginIcon } from '../../assets/images/icons/login.svg';
import { useFetchBaseUserInfo } from '../../hooks/useFetchBaseUserInfo';

const LoginForm = () => {
  const { fetch } = useFetchBaseUserInfo();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = (values: LoginData) => {
    setIsSubmitting(true);
    console.log(values);
    fetch({ username: values.email, password: values.password });
    setTimeout(() => setIsSubmitting(false), 3000);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(values) => submitHandler(values)}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form className={styles.loginForm}>
          <h2 className={styles.title}>Авторизация</h2>
          <label>
            <Field
              className={styles.input}
              name="email"
              type="email"
              placeholder="Введите email"
            />
            {errors.email && touched.email ? (
              <p className={styles.error}>{errors.email}</p>
            ) : null}
          </label>
          <label>
            <Field
              className={styles.input}
              name="password"
              type="password"
              placeholder="Введите пароль"
            />
            {errors.password && touched.password ? (
              <p className={styles.error}>{errors.password}</p>
            ) : null}
          </label>
          <button
            className={styles.loginButton}
            type="submit"
            disabled={!(isValid && dirty) || isSubmitting}
          >
            {isSubmitting ? (
              <Loader width={24} height={24} />
            ) : (
              <>
                Войти
                <LoginIcon />
              </>
            )}
          </button>
          <Link className={styles.registrationLink} to={Routes.Registration}>
            Регистрация
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
