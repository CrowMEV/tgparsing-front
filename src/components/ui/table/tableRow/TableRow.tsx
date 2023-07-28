import { FC, ReactNode } from 'react';

interface TableRow extends React.TableHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

const TableRow: FC<TableRow> = ({ children, className, onClick }) => {
  return (
    <tr className={className ? className : ''} onClick={onClick}>
      {children}
    </tr>
  );
};
export default TableRow;
