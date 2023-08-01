import { useEffect, useState } from 'react';
import AdminTariffs from '../../../components/Admin/AdminTariffs/AdminTariffs';
import NewTariffForm from '../../../components/Admin/AdminTariffs/NewTariffForm/NewTariffForm';
import Button from '../../../components/ui/button/Button';
import styles from './tariff-page.module.sass';
import { useAppDispatch } from '../../../hooks/redux';
import { getTariffs } from '../../../store/tariff-slice/apiActions';
import Loader from '../../../components/ui/loader/loader';

const TariffAdminPage = () => {
  const [formIsOpened, setFormIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(getTariffs())
      .unwrap()
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>Тарифы</h2>
        <Button
          className={styles.createButton}
          variant="accent"
          onClick={() => setFormIsOpened(true)}
        >
          Создать новый тариф
        </Button>
        <button className={styles.csvLink}>Выгрузить в CSV</button>
      </div>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <AdminTariffs />
          </div>
        </>
      )}
      <NewTariffForm isActive={formIsOpened} setIsActive={setFormIsOpened} />
    </div>
  );
};
export default TariffAdminPage;
