import { Form, Formik } from 'formik';

import { Bot } from '../../../types/bot';
import { adminBotCard } from './validation-schema';

import TextInput from '../../../components/ui/input/TextInput';
import Button from '../../../components/ui/button/Button';

import BotDefaultAvatar from '../../../assets/images/bot-default-avatar.png';

import styles from './admin-bot-card.module.sass';

interface AdminBotCardProps {
  bot: Bot;
}

const AdminBotCard = ({ bot }: AdminBotCardProps) => {
  return (
    <main>
      <h2 className={styles.header}>Карточка бота</h2>
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <h3 className={styles.header}>Аватар</h3>
          <img src={BotDefaultAvatar} alt="Bot Avatar" />
        </div>
        <div className={styles.statuses}>
          <h3 className={styles.header}>Статусы</h3>
          <div>
            <h4 className={`${styles.header} ${styles.statusHeader}`}>
              Work status
            </h4>
            <p className={styles.status}>{bot.work_status}</p>
          </div>
          <div>
            <h4 className={`${styles.header} ${styles.statusHeader}`}>
              Block status
            </h4>
            <p className={styles.status}>{bot.block_status}</p>
          </div>
        </div>
        <Formik
          validationSchema={adminBotCard}
          onSubmit={(values) => {
            console.log(values);
          }}
          initialValues={{
            apiId: bot.api_id,
            apiHash: bot.api_hash,
            phoneNumber: '',
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className={styles.settings}>
              <h3 className={styles.header}>Настройки</h3>
              <TextInput
                className={styles.input}
                name="apiId"
                value={values.apiId}
                errorMessage={errors.apiId && touched.apiId ? errors.apiId : ''}
                placeholder="api id"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextInput
                className={styles.input}
                name="apiHash"
                value={values.apiHash}
                errorMessage={
                  errors.apiHash && touched.apiHash ? errors.apiHash : ''
                }
                placeholder="api hash"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextInput
                className={styles.input}
                name="phoneNumber"
                value={values.phoneNumber}
                errorMessage={
                  errors.phoneNumber && touched.phoneNumber
                    ? errors.phoneNumber
                    : ''
                }
                placeholder="Телефон"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Button className={styles.button} variant="accent" type="submit">
                Сохранить изменения
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default AdminBotCard;
