import React, { useState } from 'react';

import BotDefaultAvatar from '../../../assets/images/bot-default-avatar.png';

import styles from './bot-card.module.sass';
import TextInput from '../../../components/ui/input/TextInput';
import Button from '../../../components/ui/button/Button';
import CreateBotWindow from '../CreateBotWindow/CreateBotWindow';
import SuccessMessage from '../../../components/SuccessMessage/SuccessMessage';

const BotCard = () => {
  const [isActive, setIsActive] = useState(true);

  // return (
  //   <SuccessMessage
  //     isActive={isActive}
  //     setActive={setIsActive}
  //     text="Бот создан"
  //   />
  // );
  // return <CreateBotWindow />;
  return (
    <main>
      <h2 className={styles.header}>Карточка бота</h2>
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <h3 className={styles.header}>Аватар</h3>
          <img src={BotDefaultAvatar} alt="Bot Avatar" />
        </div>
        <div className={styles.statuses}>
          <div>
            <h4 className={styles.header}>Work status</h4>
            <p className={styles.status}>work</p>
          </div>
          <div>
            <h4 className={styles.header}>Block status</h4>
            <p className={styles.status}>unblock</p>
          </div>
        </div>
        <div className={styles.settings}>
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

export default BotCard;
