import { useAppSelector } from '../../../hooks/redux';
import { mainDataValidation } from './main-validation-schema';

import { Formik, Form } from 'formik';
import Button from '../../ui/button/Button';
import TextInput from '../../ui/input/TextInput';

import sharedStyles from '../profile.module.sass';

type mainData = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
};

const MainData = () => {
  const user = useAppSelector((state) => state.UserData.user);

  const submitChanges = (values: mainData) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        email: user?.email || '',
        phoneNumber: '',
      }}
      validationSchema={mainDataValidation}
      onSubmit={submitChanges}
    >
      {({ values, errors, touched, handleChange, handleBlur, dirty }) => (
        <Form className={sharedStyles.column}>
          <TextInput
            name="firstname"
            type="text"
            placeholder="Имя"
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={
              dirty && errors.firstname && touched.firstname
                ? errors.firstname
                : ''
            }
          />
          <TextInput
            name="lastname"
            type="text"
            placeholder="Фамилия"
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={
              dirty && errors.lastname && touched.lastname
                ? errors.lastname
                : ''
            }
          />
          <TextInput
            name="email"
            type="text"
            placeholder="Электронная почта"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={
              dirty && errors.email && touched.email ? errors.email : ''
            }
          />
          <TextInput
            name="phoneNumber"
            type="text"
            placeholder="Телефон"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={
              errors.phoneNumber && touched.phoneNumber
                ? errors.phoneNumber
                : ''
            }
          />
          <Button disabled={!dirty} type="submit" variant="accent">
            Сохранить изменения
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MainData;
