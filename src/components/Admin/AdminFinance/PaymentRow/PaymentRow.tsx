import { FC } from 'react';
import { Payment } from '../../../../types/payment';
import TableRow from '../../../ui/table/tableRow/TableRow';
import TableCell from '../../../ui/table/tableCell/TableCell';
import styles from '../admin-finance.module.sass';
import { formatMonetaryValue } from '../../../../utils/formatFinancialValues';
import { getPaymentOperationName } from '../../../../utils/getTaskFieldName';

interface PaymentRowProps {
  payment: Payment;
}

const PaymentRow: FC<PaymentRowProps> = ({ payment }) => {
  return (
    <TableRow key={payment.id}>
      <TableCell>{payment.email}</TableCell>
      <TableCell>
        {new Date(payment.date).toLocaleDateString('ru-Ru')}
      </TableCell>
      <TableCell className={payment.status ? '' : styles.paymentFail}>
        {`${payment.action === 'credit' ? '-' : ''}${formatMonetaryValue(
          Number(payment.amount),
        )}`}
      </TableCell>
      <TableCell className={payment.status ? '' : styles.paymentFail}>
        {getPaymentOperationName(payment.action)}
      </TableCell>
      <TableCell className={payment.status ? '' : styles.paymentFail}>
        {payment.status ? 'успешно' : 'не проведено'}
      </TableCell>
    </TableRow>
  );
};
export default PaymentRow;
