import { Link } from 'react-router-dom';
import { Routes } from '../../router/routes';
import styles from './registration-form.module.sass';
import { Formik, Form, Field } from 'formik';
import { registrationSchema } from './validation-schema';
import Loader from '../ui/loader/loader';
import { useState } from 'react';
import { RegistrationData } from '../../types/auth';
import { ReactComponent as RegistrationIcon } from '../../assets/images/icons/registration.svg';
import { useAppDispatch } from '../../hooks/redux';
import { register } from '../../store/user-slice/apiActions';

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (values: RegistrationData) => {
    setIsSubmitting(true);
    const sendedData = { ...values };
    delete sendedData['passwordCheck'];

    dispatch(register(sendedData))
      .unwrap()
      .catch((error) => {
        setErrorMessage(error);
      });

    setIsSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordCheck: '',
      }}
      validationSchema={registrationSchema}
      onSubmit={submitHandler}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form className={styles.registrationForm}>
          <h2 className={styles.title}>Регистрация</h2>
          <label>
            <Field
              className={styles.input}
              name="firstname"
              type="text"
              placeholder="Введите ваше имя"
            />
            {errors.firstname && touched.firstname ? (
              <p className={styles.error}>{errors.firstname}</p>
            ) : null}
          </label>
          <label>
            <Field
              className={styles.input}
              name="lastname"
              type="text"
              placeholder="Введите вашу фамилию"
            />
            {errors.lastname && touched.lastname ? (
              <p className={styles.error}>{errors.lastname}</p>
            ) : null}
          </label>
          <label>
            <Field
              className={styles.input}
              name="email"
              type="email"
              placeholder="Введите ваш email"
            />
            {errors.email && touched.email ? (
              <p className={styles.error}>{errors.email}</p>
            ) : null}
          </label>
          <label>
            <Field
              name="password"
              className={styles.input}
              type="password"
              placeholder="Введите пароль"
            />
            {errors.password && touched.password ? (
              <p className={styles.error}>{errors.password}</p>
            ) : null}
          </label>
          <label>
            <Field
              name="passwordCheck"
              className={styles.input}
              type="password"
              placeholder="Введите пароль еще раз"
            />
            {errors.passwordCheck && touched.passwordCheck ? (
              <p className={styles.error}>{errors.passwordCheck}</p>
            ) : null}
          </label>
          <button
            className={styles.registrationButton}
            type="submit"
            disabled={!(isValid && dirty) || isSubmitting}
          >
            {isSubmitting ? (
              <Loader width={24} height={24} />
            ) : (
              <>
                Зарегистрироваться
                <RegistrationIcon />
              </>
            )}
          </button>
          <Link className={styles.loginLink} to={Routes.Login}>
            Войти
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
