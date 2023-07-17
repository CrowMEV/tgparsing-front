import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { patchUser } from '../../store/user-slice/apiActions';
import { TIMEZONES } from '../../consts/consts';

import MainData from '../../components/Profile/MainData/MainData';
import PassData from '../../components/Profile/PassData/PassData';
import TextInput from '../../components/ui/input/TextInput';
import Dropdown from '../../components/ui/dropdown/Dropdown';

import styles from './profilePage.module.sass';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.UserData.user);

  if (!user) return null;

  return (
    <main className={styles.profileWrapper}>
      <div className={styles.wrapper}>
        <MainData user={user} />
        <div className={styles.columnWrapper}>
          <h3 className={styles.header}>Пароль</h3>
          <PassData />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.columnWrapper}>
          <h3 className={styles.header}>Часовой пояс</h3>
          <Dropdown
            options={TIMEZONES.map((timezone) => timezone.text)}
            selectedOption={
              TIMEZONES.find((timezone) => timezone.value === user.timezone)
                ?.text || TIMEZONES[3].text
            }
            onChange={async (option) => {
              const timezone = TIMEZONES.find(
                (timezone) => timezone.text === option,
              )?.value;
              if (!timezone) return;
              const formData = new FormData();
              formData.append('timezone', String(timezone));
              await dispatch(patchUser(formData));
            }}
          />
        </div>
        <div className={styles.columnWrapper}>
          <h3 className={styles.header}>Тариф</h3>
          <TextInput
            className={styles.pricing}
            temporaryDisabled
            placeholder="Тариф"
          />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
