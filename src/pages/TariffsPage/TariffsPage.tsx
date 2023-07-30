import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getTariffs } from '../../store/tariff-slice/apiActions';
import { AuthorizationStatus } from '../../consts/consts';
import { Routes } from '../../router/routes';

import TariffInfo from '../../components/TariffInfo/TariffInfo';
import TariffItem from '../../components/Tariffs/TariffItem/TariffItem';
import TariffFailMessage from '../../components/Tariffs/TariffFailMessage/TariffFailMessage';
import SuccessMessageModal from '../../components/ui/SuccessMessageModal/SuccessMessageModal';

import { ReactComponent as ArrowIcon } from '../../assets/images/icons/arrow.svg';

import styles from './tariff-page.module.sass';

const TariffsPage = () => {
  const authStatus = useAppSelector(
    (state) => state.UserData.authorizationStatus,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tariffs = useAppSelector((state) => state.Tariff.tariffs);

  useEffect(() => {
    dispatch(getTariffs());
  }, []);

  const [successMessageIsShown, setSuccessMessageIsShown] = useState(false);
  const [failMessageIsShown, setFailMessageIsShown] = useState(false);

  const payTariffHandler = () => {
    console.log('payment of the tariff');
  };

  const returnHandler = () => {
    navigate(Routes.Login);
  };

  return (
    <div className={styles.wrapper}>
      {authStatus === AuthorizationStatus.Auth ? (
        <div className={styles.tariffInfo}>
          <TariffInfo />
        </div>
      ) : (
        <Link className={styles.returnLink} to="/">
          <ArrowIcon />
          Назад
        </Link>
      )}
      <ul className={styles.tariffList}>
        {tariffs.map((tariff) => (
          <li key={tariff.name}>
            <TariffItem
              tariff={tariff}
              buttonHandler={
                authStatus === AuthorizationStatus.Auth
                  ? () => payTariffHandler()
                  : returnHandler
              }
            />
          </li>
        ))}
      </ul>
      <SuccessMessageModal
        isActive={successMessageIsShown}
        setActive={setSuccessMessageIsShown}
        message="Оплата тарифа произведена успешно"
      />
      <TariffFailMessage
        isActive={failMessageIsShown}
        setActive={setFailMessageIsShown}
      />
    </div>
  );
};

export default TariffsPage;
