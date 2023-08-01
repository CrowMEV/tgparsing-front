import { FC, useState } from 'react';
import { Bot } from '../../../types/bot';
import Table from '../../ui/table/Table';
import TableBody from '../../ui/table/tableBody/TableBody';
import TableCell from '../../ui/table/tableCell/TableCell';
import TableContainer from '../../ui/table/tableContainer/TableContainer';
import TableHead from '../../ui/table/tableHead/TableHead';
import TableRow from '../../ui/table/tableRow/TableRow';
import TableSearch from '../../ui/table/tableSearch/TableSearch';
import styles from './admin-bots.module.sass';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../router/routes';

interface AdminBotsProps {
  bots: Bot[];
}

const AdminBots: FC<AdminBotsProps> = ({ bots }) => {
  const navigate = useNavigate();

  const [filterIsActive, setFilterActive] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  return (
    <TableContainer style={{ height: '750px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" className={styles.headCell}>
              api id
            </TableCell>
            <TableCell variant="head" className={styles.headCell}>
              <TableSearch
                title="api hash"
                isActive={filterIsActive}
                showSearchHandler={setFilterActive}
                value={filterValue}
                onChange={(evt) => setFilterValue(evt.target.value)}
              />
            </TableCell>
            <TableCell variant="head" className={styles.headCell}>
              work status
            </TableCell>
            <TableCell variant="head" className={styles.headCell}>
              Телефон
            </TableCell>
            <TableCell variant="head" className={styles.headCell}>
              block status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bots.map((bot) => (
            <TableRow
              key={bot.id}
              className={styles.botRow}
              onClick={() => navigate(`${Routes.AdminBots}/${bot.id}`)}
            >
              <TableCell>{bot.api_id}</TableCell>
              <TableCell>{bot.api_hash}</TableCell>
              <TableCell>{bot.work_status}</TableCell>
              <TableCell> </TableCell>
              <TableCell>{bot.block_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminBots;