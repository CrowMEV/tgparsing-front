import { FC, useEffect, useState } from 'react';
import { Payment } from '../../../types/payment';
import Table from '../../ui/table/Table';
import TableCell from '../../ui/table/tableCell/TableCell';
import TableContainer from '../../ui/table/tableContainer/TableContainer';
import TableHead from '../../ui/table/tableHead/TableHead';
import TableRow from '../../ui/table/tableRow/TableRow';
import TableBody from '../../ui/table/tableBody/TableBody';
import { getPaymentOperationName } from '../../../utils/getTaskFieldName';
import styles from './admin-finance.module.sass';
import TextInput from '../../ui/input/TextInput';
import { formatMonetaryValue } from '../../../utils/formatFinancialValues';
import TableFilter from '../../ui/table/tableFilter/TableFilter';
import { SetURLSearchParams } from 'react-router-dom';
import { User } from '../../../types/user';
import { api } from '../../../services/api';

interface AdminFinance {
  payments: Payment[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const AdminFinance: FC<AdminFinance> = ({
  payments,
  searchParams,
  setSearchParams,
}) => {
  const [payerFieldIsActive, setPayerFieldActive] = useState(false);
  const [statusFieldIsActive, setStatusFieldActive] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get('/user/').then(({ data }) => setUsers(data));
  }, []);

  const handleSearchParams = (key: string, value: string) => {
    setSearchParams((params) => {
      if (!value) params.delete(key);
      else params.set(key, value);
      params;
      return params;
    });
  };

  const totalAmount = payments.reduce(
    (result, payment) => result + payment.amount,
    0,
  );

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
      <TableContainer style={{ height: '700px' }}>
        <Table style={{ minHeight: '670px' }}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.headCell} variant="head">
                <TableFilter
                  title="Плательщик"
                  isActive={payerFieldIsActive}
                  setActive={setPayerFieldActive}
                >
                  <select
                    name="email"
                    className={styles.select}
                    value={searchParams.get('email') || ''}
                    onChange={(e) =>
                      handleSearchParams('email', e.target.value)
                    }
                  >
                    <option value="">Все</option>
                    {users.map((user) => (
                      <option value={user.email} key={user.id}>
                        {user.email}
                      </option>
                    ))}
                  </select>
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
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.email}</TableCell>
                <TableCell>
                  {new Date(payment.date).toLocaleDateString('ru-Ru')}
                </TableCell>
                <TableCell className={payment.status ? '' : styles.paymentFail}>
                  {`${
                    payment.action === 'credit' ? '-' : ''
                  }${formatMonetaryValue(payment.amount)}`}
                </TableCell>
                <TableCell className={payment.status ? '' : styles.paymentFail}>
                  {getPaymentOperationName(payment.action)}
                </TableCell>
                <TableCell className={payment.status ? '' : styles.paymentFail}>
                  {payment.status ? 'успешно' : 'не проведено'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default AdminFinance;
