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

  const submitHandler = (values: RegistrationData) => {
    setIsSubmitting(true);
    const sendedData = { ...values };
    delete sendedData['passwordCheck'];
    dispatch(register({ username: values.email, password: values.password }));
    console.log(sendedData);
    setTimeout(() => setIsSubmitting(false), 3000);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
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
              name="firstName"
              type="text"
              placeholder="Введите ваше имя"
            />
            {errors.firstName && touched.firstName ? (
              <p className={styles.error}>{errors.firstName}</p>
            ) : null}
          </label>
          <label>
            <Field
              className={styles.input}
              name="lastName"
              type="text"
              placeholder="Введите вашу фамилию"
            />
            {errors.lastName && touched.lastName ? (
              <p className={styles.error}>{errors.lastName}</p>
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
