import TextInput from '../../../components/ui/input/TextInput';
import Button from '../../../components/ui/button/Button';

import BotDefaultAvatar from '../../../assets/images/bot-default-avatar.png';

import styles from './bot-page.module.sass';

const BotPage = () => {
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
            <p className={styles.status}>work</p>
          </div>
          <div>
            <h4 className={`${styles.header} ${styles.statusHeader}`}>
              Block status
            </h4>
            <p className={styles.status}>unblock</p>
          </div>
        </div>
        <div className={styles.settings}>
          <h3 className={styles.header}>Настройки</h3>
          <TextInput placeholder="api id" className={styles.input} />
          <TextInput placeholder="api hash" className={styles.input} />
          <TextInput placeholder="Телефон" className={styles.input} />
          <Button className={styles.button} variant="accent">
            Сохранить изменения
          </Button>
        </div>
      </div>
    </main>
  );
};

export default BotPage;
