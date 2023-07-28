import { FC, useReducer } from 'react';
import TableCell from '../../ui/table/tableCell/TableCell';
import TableContainer from '../../ui/table/tableContainer/TableContainer';
import TableHead from '../../ui/table/tableHead/TableHead';
import TableRow from '../../ui/table/tableRow/TableRow';
import TableSearch from '../../ui/table/tableSearch/TableSearch';
import Table from '../../ui/table/Table';
import TableBody from '../../ui/table/tableBody/TableBody';
import styles from './admin-users.module.sass';
import Toggle from '../../ui/toggle/toggle';
import { User } from '../../../types/user';
import { initialUsersFilter } from './filters';
import { updateFilterReducer } from './reducers';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../router/routes';

interface AdminUsersProps {
  users: User[];
}

const AdminUsers: FC<AdminUsersProps> = ({ users }) => {
  const [filters, dispatch] = useReducer(
    updateFilterReducer,
    initialUsersFilter,
  );

  const navigate = useNavigate();

  return (
    <TableContainer style={{ height: '700px' }}>
      <Table>
        <TableHead>
          <TableRow>
            {filters.map((filter) => (
              <TableCell
                variant="head"
                key={filter.name}
                className={styles.userHeadCell}
              >
                <TableSearch
                  title={filter.title}
                  isActive={filter.isActive}
                  showSearchHandler={() =>
                    dispatch({
                      filter: { ...filter, isActive: !filter.isActive },
                    })
                  }
                  value={filter.value}
                  onChange={(evt) =>
                    dispatch({
                      filter: { ...filter, value: evt.target.value },
                    })
                  }
                />
              </TableCell>
            ))}
            <TableCell variant="head">Блок</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className={styles.usersRow}
              onClick={() => navigate(`${Routes.AdminUsers}/${user.id}`)}
            >
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString('ru-RU')}
              </TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell
                onClick={(evt) => {
                  evt.stopPropagation();
                }}
              >
                <Toggle />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AdminUsers;
