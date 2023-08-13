import { useEffect, useState } from 'react';
import ModalWindow from '../ui/modal-window/ModalWindow';
import styles from './tariff-info.module.sass';
import Button from '../ui/button/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from '../../router/routes';
import Toggle from '../ui/toggle/toggle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { TariffResponse } from '../../types/tariff';
import { api } from '../../services/api';
import { PARSER_ENDINGS, getWordEnding } from '../../utils/getWordEnding';
import { editUser } from '../../store/user-slice/userSlice';

const TariffInfo = () => {
  const dispatch = useAppDispatch();
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.UserData.user);
  const userSubscribe = user?.subscribe;

  const [tariffDetailIsOpened, setTariffDetailIsOpened] = useState(false);
  const [currentTariff, setCurrentTariff] = useState<TariffResponse | null>(
    null,
  );
  const [error, setError] = useState('');

  useEffect(() => {
    if (userSubscribe) {
      api
        .get(`/tariff/${userSubscribe.tariff_id}`)
        .then(({ data }) => setCurrentTariff(data))
        .catch((err) => console.error(err));
    }
  }, [userSubscribe]);

  if (!userSubscribe || !currentTariff)
    return (
      <p className={styles.tariffsDirection}>
        Для начала работы{' '}
        {currentPath === Routes.Tariffs ? (
          'выберите тариф'
        ) : (
          <Link className={styles.tariffsDirection__link} to={Routes.Tariffs}>
            выберите тариф
          </Link>
        )}
      </p>
    );

  const autoRenewalHandler = () => {
    api
      .post('/user/subscribe/toggle')
      .then(({ data }) => {
        dispatch(editUser({ ...user, subscribe: data }));
        setError('');
      })
      .catch(() => setError('Произошла ошибка'));
  };

  return (
    <div>
      <p className={styles.info}>
        Вам доступно сегодня:{' '}
        <span className={styles.infoAccent}>
          {userSubscribe.tariff_options.parsers_per_day}
        </span>{' '}
        {getWordEnding(
          userSubscribe.tariff_options.parsers_per_day,
          PARSER_ENDINGS,
        )}
      </p>
      <button
        className={styles.infoButton}
        onClick={() => setTariffDetailIsOpened(true)}
      >
        Подробнее о текущем состоянии тарифа
      </button>
      <ModalWindow
        isActive={tariffDetailIsOpened}
        setActive={setTariffDetailIsOpened}
      >
        <div className={styles.tariffDetails}>
          <h3 className={styles.tariffTitle}>Текущее состояние тарифа</h3>
          <div className={styles.tariffCharacteristics}>
            <p className={styles.tariffField}>
              Название тарифа:
              <span className={styles.tariffValue}>{currentTariff.name}</span>
            </p>
            <p className={styles.tariffField}>
              Действует до:
              <span className={styles.tariffValue}>
                {new Date(userSubscribe.end_date).toLocaleDateString('ru-Ru')}
              </span>
            </p>
            <p className={styles.tariffField}>
              Предусмотрено в день:
              <span className={styles.tariffValue}>
                {currentTariff.options.parsers_per_day}
              </span>
            </p>
            <p className={styles.tariffField}>
              Использовано сегодня:
              <span className={styles.tariffValue}>
                {currentTariff.options.parsers_per_day -
                  userSubscribe.tariff_options.parsers_per_day}
              </span>
            </p>
            <p className={styles.tariffField}>
              Доступно сегодня:{' '}
              <span className={styles.tariffValue}>
                {userSubscribe.tariff_options.parsers_per_day}
              </span>
            </p>
          </div>
          <div className={styles.autoRenewal}>
            Автоматическое продление тарифа
            <Toggle
              checked={userSubscribe.auto_debit}
              toggleHandler={autoRenewalHandler}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <Button
            variant="accent"
            onClick={() => {
              currentPath === Routes.Tariffs
                ? setTariffDetailIsOpened(false)
                : navigate(Routes.Tariffs);
            }}
          >
            Выбрать и оплатить тариф
          </Button>
        </div>
      </ModalWindow>
    </div>
  );
};
export default TariffInfo;
