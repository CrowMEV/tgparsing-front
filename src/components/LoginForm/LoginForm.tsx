import styles from './login-form.module.sass';
import { loginSchema } from './validation-schema';
import { Formik, Form } from 'formik';
import Loader from '../ui/loader/loader';
import { useState } from 'react';
import { LoginData } from '../../types/auth';
import { useAppDispatch } from '../../hooks/redux';
import { login } from '../../store/user-slice/apiActions';
import Button from '../ui/button/Button';
import TextInput from '../ui/input/TextInput';
import { ReactComponent as HideIcon } from '../../assets/images/icons/closed-eye.svg';
import { ReactComponent as ShowIcon } from '../../assets/images/icons/opened-eye.svg';
import { Link } from 'react-router-dom';
import IconButton from '../ui/iconButton/IconButton';
import { Routes } from '../../router/routes';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (values: LoginData) => {
    setIsSubmitting(true);

    dispatch(login(values))
      .unwrap()
      .then(() => {
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error.detail);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(values) => submitHandler(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        dirty,
      }) => (
        <Form className={styles.loginForm}>
          <h2 className={styles.title}>Вход в личный кабинет</h2>
          <label>
            <TextInput
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
              onBlur={handleBlur}
              errorMessage={errors.email && touched.email ? errors.email : ''}
            />
          </label>
          <label>
            <TextInput
              name="password"
              type={passwordIsShown ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              placeholder="Пароль"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
              onBlur={handleBlur}
              errorMessage={
                errors.password && touched.password ? errors.password : ''
              }
              endIcon={
                <IconButton
                  onClick={() => setPasswordIsShown(!passwordIsShown)}
                  isError={
                    (dirty && errors.password && touched.password) || false
                  }
                >
                  {passwordIsShown ? <ShowIcon /> : <HideIcon />}
                </IconButton>
              }
            />
            <Link className={styles.resetPasswordLink} to={Routes.Recovery}>
              Забыли пароль?
            </Link>
          </label>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <Button
            type="submit"
            disabled={!(isValid && dirty) || isSubmitting}
            variant={'accent'}
          >
            {isSubmitting ? <Loader width={24} height={24} /> : <>Войти</>}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
