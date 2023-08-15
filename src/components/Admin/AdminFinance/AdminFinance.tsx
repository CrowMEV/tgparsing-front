import { FC, useState } from 'react';
import { Payment } from '../../../types/payment';
import Table from '../../ui/table/Table';
import TableCell from '../../ui/table/tableCell/TableCell';
import TableContainer from '../../ui/table/tableContainer/TableContainer';
import TableHead from '../../ui/table/tableHead/TableHead';
import TableRow from '../../ui/table/tableRow/TableRow';
import TableSearch from '../../ui/table/tableSearch/TableSearch';
import TableBody from '../../ui/table/tableBody/TableBody';
import { getPaymentOperationName } from '../../../utils/getTaskFieldName';
import styles from './admin-finance.module.sass';
import TextInput from '../../ui/input/TextInput';
import { formatMonetaryValue } from '../../../utils/formatFinancialValues';

interface AdminFinance {
  payments: Payment[];
}

const AdminFinance: FC<AdminFinance> = ({ payments }) => {
  const [payerFieldIsActive, setPayerFieldActive] = useState(false);
  const [payerFieldValue, setPayerFieldValue] = useState('');
  const [statusFieldIsActive, setStatusFieldIsActive] = useState(false);
  const [statusFieldValue, setStatusFieldValue] = useState('');

  return (
    <div className={styles.wrapper}>
      <div className={styles.periodWrapper}>
        <h3 className={styles.periodTitle}>Период</h3>
        <TextInput
          className={styles.periodInput}
          type="date"
          hintMessage="Введите дату начала периода"
        />
        <TextInput
          className={styles.periodInput}
          type="date"
          hintMessage="Введите дату окончания периода"
        />
      </div>
      <TableContainer style={{ height: '700px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="head">
                <TableSearch
                  title="Плательщик"
                  isActive={payerFieldIsActive}
                  showSearchHandler={setPayerFieldActive}
                  value={payerFieldValue}
                  onChange={(evt) => setPayerFieldValue(evt.target.value)}
                />
              </TableCell>
              <TableCell variant="head">Дата операции</TableCell>
              <TableCell variant="head">Сумма, руб</TableCell>
              <TableCell variant="head">Операция</TableCell>
              <TableCell variant="head">
                <TableSearch
                  title="Статус"
                  isActive={statusFieldIsActive}
                  showSearchHandler={setStatusFieldIsActive}
                  value={statusFieldValue}
                  onChange={(evt) => setStatusFieldValue(evt.target.value)}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.user.email}</TableCell>
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
