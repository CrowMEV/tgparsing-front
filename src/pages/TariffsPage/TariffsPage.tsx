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
import { api } from '../../services/api';

const TariffsPage = () => {
  const authStatus = useAppSelector(
    (state) => state.UserData.authorizationStatus,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const activeTariffs = useAppSelector((state) => state.Tariff.tariffs).filter(
    (tariff) => tariff.active,
  );

  useEffect(() => {
    dispatch(getTariffs());
  }, []);

  const [successMessageIsShown, setSuccessMessageIsShown] = useState(false);
  const [failMessageIsShown, setFailMessageIsShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const payTariffHandler = (tariffId: number) => {
    setIsSubmitting(true);
    api
      .post(`/tariff/purchase/${tariffId}`)
      .then(() => {
        setSuccessMessageIsShown(true);
      })
      .catch(() => setFailMessageIsShown(true))
      .finally(() => setIsSubmitting(false));
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
        {activeTariffs.map((tariff) => (
          <li key={tariff.name}>
            <TariffItem
              tariff={tariff}
              isSubmitting={isSubmitting}
              buttonHandler={
                authStatus === AuthorizationStatus.Auth
                  ? () => payTariffHandler(tariff.id)
                  : returnHandler
              }
            />
          </li>
        ))}
      </ul>
      <SuccessMessageModal
        className={styles.successMessage}
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
