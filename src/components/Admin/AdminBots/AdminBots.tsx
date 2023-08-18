import { FC, useState } from 'react';
import { Bot } from '../../../types/bot';
import Table from '../../ui/table/Table';
import TableBody from '../../ui/table/tableBody/TableBody';
import TableCell from '../../ui/table/tableCell/TableCell';
import TableContainer from '../../ui/table/tableContainer/TableContainer';
import TableHead from '../../ui/table/tableHead/TableHead';
import TableRow from '../../ui/table/tableRow/TableRow';
import styles from './admin-bots.module.sass';
import IconButton from '../../ui/iconButton/IconButton';
import { ReactComponent as BasketIcon } from '../../../assets/images/icons/trash.svg';
import { api } from '../../../services/api';
import TableFilter from '../../ui/table/tableFilter/TableFilter';
import TableTextInput from '../../ui/table/tableTextInput/TableTextInput';

interface AdminBotsProps {
  bots: Bot[];
}

const AdminBots: FC<AdminBotsProps> = ({ bots }) => {
  const [filterIsActive, setFilterActive] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const deleteBotHandler = (botId: number) => {
    api
      .delete(`telegram/tgaccount/${botId}`)
      .catch((error) => console.error(error));
  };

  return (
    <TableContainer style={{ height: '500px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" className={styles.headCell}>
              api id
            </TableCell>
            <TableCell variant="head" className={styles.headCell}>
              <TableFilter
                title="api hash"
                isActive={filterIsActive}
                setActive={setFilterActive}
              >
                <TableTextInput
                  value={filterValue}
                  onChange={(evt) => setFilterValue(evt.target.value)}
                />
              </TableFilter>
            </TableCell>
            <TableCell variant="head" className={styles.headCell}>
              Телефон
            </TableCell>
            <TableCell variant="head" className={styles.headCell}>
              work status
            </TableCell>
            <TableCell variant="head" className={styles.headCell}>
              block status
            </TableCell>
            <TableCell variant="head">
              <span className="visually-hidden">Удаление</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bots.map((bot) => (
            <TableRow key={bot.id}>
              <TableCell>{bot.api_id}</TableCell>
              <TableCell>{bot.api_hash}</TableCell>
              <TableCell>{bot.phone_number}</TableCell>
              <TableCell>{bot.work_status}</TableCell>
              <TableCell>{bot.block_status}</TableCell>
              <TableCell>
                <IconButton onClick={() => deleteBotHandler(bot.id)}>
                  <BasketIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminBots;
