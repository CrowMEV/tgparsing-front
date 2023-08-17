import styles from './finance-page.module.sass';
import AdminFinance from '../../../components/Admin/AdminFinance/AdminFinance';

const FinanceAdminPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>История финансовых операций</h2>
        <button className={styles.csvLink}>Выгрузить в CSV</button>
      </div>
      <AdminFinance />
    </div>
  );
};
export default FinanceAdminPage;
