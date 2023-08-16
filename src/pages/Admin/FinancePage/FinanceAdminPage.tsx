import { useEffect, useState } from 'react';
import styles from './finance-page.module.sass';
import Loader from '../../../components/ui/loader/loader';
import AdminFinance from '../../../components/Admin/AdminFinance/AdminFinance';
import { Payment } from '../../../types/payment';
import { api } from '../../../services/api';
import { useSearchParams } from 'react-router-dom';

const FinanceAdminPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/payment/`)
      .then(({ data }) => setPayments(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>История финансовых операций</h2>
        <button className={styles.csvLink}>Выгрузить в CSV</button>
      </div>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <AdminFinance
          payments={payments}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}
    </div>
  );
};
export default FinanceAdminPage;
