import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import styles from './recovery-form.module.sass';
import TextInput from '../ui/input/TextInput';
import Button from '../ui/button/Button';
import Loader from '../ui/loader/loader';
import { recoverySchema } from './validation-schema';

const RecoveryForm = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={recoverySchema}
      onSubmit={() => console.log()}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        isSubmitting,
        isValid,
        dirty,
      }) => (
        <Form className={styles.recoveryForm}>
          <h2 className={styles.title}>Забыли пароль?</h2>
          <p>
            Укажите адрес электронной почты для получения инструкции по смене
            пароля
          </p>
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
          <Button
            type="submit"
            disabled={!(isValid && dirty) || isSubmitting}
            variant={'accent'}
          >
            {isSubmitting ? <Loader width={24} height={24} /> : <>Продолжить</>}
          </Button>
          <button className={styles.returnLink} onClick={() => navigate(-1)}>
            Назад
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default RecoveryForm;
