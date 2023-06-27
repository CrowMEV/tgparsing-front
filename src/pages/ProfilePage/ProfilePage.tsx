import MainData from '../../components/Profile/MainData/MainData';
import PassData from '../../components/Profile/PassData/PassData';

import avatar from '../../assets/images/default-avatar.png';
import { ReactComponent as ArrowIcon } from '../../assets/images/icons/arrow.svg';

import styles from './profilePage.module.sass';
import Dropdown from '../../components/ui/dropdown/Dropdown';
import { useState } from 'react';
import TextInput from '../../components/ui/input/TextInput';
import Button from '../../components/ui/button/Button';

const TIME_ZONES = [
  '(GMT +1) Стокгольм, Амстердам, Рим, Берлин',
  '(GMT +2) Киев',
  '(GMT +3) Москва, Санкт-Петербург',
];

const ProfilePage = () => {
  const [selectedZone, setSelectedZone] = useState(TIME_ZONES[2]);

  return (
    <main className={styles.profileWrapper}>
      <div className={styles.wrapper}>
        <div className={`${styles.columnWrapper}`}>
          <h3 className={styles.header}>Аватар</h3>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <img className={styles.avatarImg} src={avatar} alt="Аватар" />
              <input
                className={styles.avatarInput}
                type="file"
                name="avatar"
                id="avatar"
                accept="image/png, image/jpeg"
              />
              <label className={styles.avatarlabel} htmlFor="avatar">
                Изменить фото
              </label>
            </div>
          </div>
        </div>
        <div className={styles.columnWrapper}>
          <h3 className={styles.header}>Основные данные</h3>
          <MainData />
        </div>
        <div className={`${styles.password} ${styles.columnWrapper}`}>
          <h3 className={styles.header}>Пароль</h3>
          <PassData />
        </div>
      </div>
      <div className={styles.additionalData}>
        <div className={styles.columnWrapper}>
          <h3 className={styles.header}>Часовой пояс</h3>
          <Dropdown
            options={TIME_ZONES}
            selectedOption={selectedZone}
            onChange={(opt) => setSelectedZone(opt)}
          />
        </div>
        <div className={styles.columnWrapper}>
          <h3 className={styles.header}>Тариф</h3>
          <TextInput
            className={styles.pricing}
            temporaryDisabled
            placeholder="Тариф"
          />
          <Button disabled variant="additional">
            Выбрать тариф
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
