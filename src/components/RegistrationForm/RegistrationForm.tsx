import styles from './registration-form.module.sass';
import { Formik, Form } from 'formik';
import { registrationSchema } from './validation-schema';
import Loader from '../ui/loader/loader';
import { useState } from 'react';
import { RegistrationData } from '../../types/auth';
import { useAppDispatch } from '../../hooks/redux';
import { register } from '../../store/user-slice/apiActions';
import TextInput from '../ui/input/TextInput';
import Button from '../ui/button/Button';
import { ReactComponent as HideIcon } from '../../assets/images/icons/closed-eye.svg';
import { ReactComponent as ShowIcon } from '../../assets/images/icons/opened-eye.svg';
import Сonfidentiality from '../../components/confidentiality/Сonfidentiality';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../router/routes';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const [checkPasswordIsShown, setCheckPasswordIsShown] = useState(false);

  const submitHandler = async (values: RegistrationData) => {
    setIsSubmitting(true);
    const sendedData = { ...values };
    delete sendedData['passwordCheck'];

    dispatch(register(sendedData))
      .unwrap()
      .then(() => {
        setErrorMessage('');
        navigate(Routes.Login);
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
      initialValues={{
        email: '',
        password: '',
        passwordCheck: '',
      }}
      validationSchema={registrationSchema}
      onSubmit={submitHandler}
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
        <Form className={styles.registrationForm}>
          <h2 className={styles.title}>Регистрация</h2>
          <label>
            <TextInput
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Введите ваш email"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
              errorMessage={errors.email && touched.email ? errors.email : ''}
            />
          </label>
          <label>
            <TextInput
              name="password"
              type={passwordIsShown ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Придумайте пароль"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
              errorMessage={
                errors.password && touched.password ? errors.password : ''
              }
              endIcon={
                passwordIsShown ? (
                  <ShowIcon
                    onClick={() => setPasswordIsShown(!passwordIsShown)}
                  />
                ) : (
                  <HideIcon
                    onClick={() => setPasswordIsShown(!passwordIsShown)}
                  />
                )
              }
            />
          </label>
          <label>
            <TextInput
              name="passwordCheck"
              type={checkPasswordIsShown ? 'text' : 'password'}
              value={values.passwordCheck}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Повторите пароль"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
              errorMessage={
                errors.passwordCheck && touched.passwordCheck
                  ? errors.passwordCheck
                  : ''
              }
              endIcon={
                checkPasswordIsShown ? (
                  <ShowIcon
                    onClick={() =>
                      setCheckPasswordIsShown(!checkPasswordIsShown)
                    }
                  />
                ) : (
                  <HideIcon
                    onClick={() =>
                      setCheckPasswordIsShown(!checkPasswordIsShown)
                    }
                  />
                )
              }
            />
          </label>
          <Button
            variant="accent"
            type="submit"
            disabled={!(isValid && dirty) || isSubmitting}
          >
            {isSubmitting ? <Loader width={24} height={24} /> : <>Продолжить</>}
          </Button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <Сonfidentiality />
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
