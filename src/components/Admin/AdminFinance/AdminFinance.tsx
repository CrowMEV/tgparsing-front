import { useEffect, useState } from 'react';
import { Payment } from '../../../types/payment';
import Table from '../../ui/table/Table';
import TableCell from '../../ui/table/tableCell/TableCell';
import TableContainer from '../../ui/table/tableContainer/TableContainer';
import TableHead from '../../ui/table/tableHead/TableHead';
import TableRow from '../../ui/table/tableRow/TableRow';
import TableBody from '../../ui/table/tableBody/TableBody';
import styles from './admin-finance.module.sass';
import TextInput from '../../ui/input/TextInput';
import TableFilter from '../../ui/table/tableFilter/TableFilter';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../../services/api';
import Loader from '../../ui/loader/loader';
import TableTextInput from '../../ui/table/tableTextInput/TableTextInput';
import PaymentRow from './PaymentRow/PaymentRow';
import { formatMonetaryValue } from '../../../utils/formatFinancialValues';

const AdminFinance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [payerFieldIsActive, setPayerFieldActive] = useState(false);
  const [statusFieldIsActive, setStatusFieldActive] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get('/payment/' + `?${searchParams.toString()}`)
      .then(({ data }) => setPayments(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  const handleSearchParams = (key: string, value: string) => {
    setSearchParams((params) => {
      if (!value) params.delete(key);
      else params.set(key, value);
      return params;
    });
  };

  const totalAmount = payments.reduce((total, payment) => {
    if (payment.status) {
      return payment.action === 'debit'
        ? total + Number(payment.amount)
        : total - Number(payment.amount);
    }
    return total;
  }, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.periodWrapper}>
        <h3 className={styles.periodTitle}>Период</h3>
        <TextInput
          className={styles.periodInput}
          type="date"
          max={searchParams.get('period_end') || ''}
          value={searchParams.get('period_start') || ''}
          onChange={(e) => handleSearchParams('period_start', e.target.value)}
          hintMessage="Введите дату начала периода"
        />
        <TextInput
          className={styles.periodInput}
          type="date"
          min={searchParams.get('period_start') || ''}
          value={searchParams.get('period_end') || ''}
          onChange={(e) => handleSearchParams('period_end', e.target.value)}
          hintMessage="Введите дату окончания периода"
        />
      </div>
      <TableContainer style={{ height: '500px', paddingBottom: '60px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={styles.headCell} variant="head">
                <TableFilter
                  title="Плательщик"
                  isActive={payerFieldIsActive}
                  setActive={setPayerFieldActive}
                >
                  <TableTextInput
                    value={searchParams.get('user') || ''}
                    onChange={(e) => handleSearchParams('user', e.target.value)}
                  />
                </TableFilter>
              </TableCell>
              <TableCell className={styles.headCell} variant="head">
                Дата операции
              </TableCell>
              <TableCell className={styles.headCell} variant="head">
                Сумма, руб
              </TableCell>
              <TableCell className={styles.headCell} variant="head">
                Операция
              </TableCell>
              <TableCell className={styles.headCell} variant="head">
                <TableFilter
                  title="Статус"
                  isActive={statusFieldIsActive}
                  setActive={setStatusFieldActive}
                >
                  <select
                    name="status"
                    className={styles.select}
                    value={searchParams.get('status') || ''}
                    onChange={(e) =>
                      handleSearchParams('status', e.target.value)
                    }
                  >
                    <option value="">Все</option>
                    <option value="true">Успешно</option>
                    <option value="false">Не проведено</option>
                  </select>
                </TableFilter>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell style={{ border: 'none' }} colSpan={5}>
                  <div className={styles.loaderWrapper}>
                    <Loader />
                  </div>
                </TableCell>
              </TableRow>
            ) : payments.length === 0 ? (
              <TableRow>
                <TableCell style={{ border: 'none' }} colSpan={5}>
                  Платежи не найдены
                </TableCell>
              </TableRow>
            ) : (
              <>
                {payments.map((payment) => (
                  <PaymentRow payment={payment} key={payment.id} />
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!isLoading && payments.length > 0 && (
        <div className={styles.totalAmount}>
          <span>итого на конец периода:</span>
          <span>{formatMonetaryValue(totalAmount)}</span>
        </div>
      )}
    </div>
  );
};
export default AdminFinance;
