import { useState } from 'react';
import TableCell from '../ui/table/tableCell/TableCell';
import TableContainer from '../ui/table/tableContainer/TableContainer';
import TableHead from '../ui/table/tableHead/TableHead';
import TableRow from '../ui/table/tableRow/TableRow';
import TableSearch from '../ui/table/tableSearch/TableSearch';
import Table from '../ui/table/Table';
import { useAppSelector } from '../../hooks/redux';
import TableBody from '../ui/table/tableBody/TableBody';
import styles from './admin-users.module.sass';
import Toggle from '../ui/toggle/toggle';

const AdminUsers = () => {
  const users = useAppSelector((state) => state.UserData.users);
  const [emailSearchIsActive, setEmailSearchIsActive] = useState(false);
  const [surnameSearchIsActive, setSurnameSearchIsActive] = useState(false);
  const [nameSearchIsActive, setNameSearchIsActive] = useState(false);
  const [registrationDateSearchIsActive, setRegistrationDateSearchIsActive] =
    useState(false);
  const [phoneSearchIsActive, setPhoneSearchIsActive] = useState(false);
  const [emailSearchValue, setEmailSearchValue] = useState('');

  return (
    <TableContainer style={{ height: '700px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">
              <div className={styles.cellInnerWrapper}>
                <TableSearch
                  title="Email"
                  isActive={emailSearchIsActive}
                  showSearchHandler={setEmailSearchIsActive}
                  value={emailSearchValue}
                  searchHandler={setEmailSearchValue}
                />
              </div>
            </TableCell>
            <TableCell variant="head">
              <div className={styles.cellInnerWrapper}>
                <TableSearch
                  title="Фамилия"
                  isActive={surnameSearchIsActive}
                  showSearchHandler={setSurnameSearchIsActive}
                  value={emailSearchValue}
                  searchHandler={setEmailSearchValue}
                />
              </div>
            </TableCell>
            <TableCell variant="head">
              <div className={styles.cellInnerWrapper}>
                <TableSearch
                  title="Имя"
                  isActive={nameSearchIsActive}
                  showSearchHandler={setNameSearchIsActive}
                  value={emailSearchValue}
                  searchHandler={setEmailSearchValue}
                />
              </div>
            </TableCell>
            <TableCell variant="head">
              <div className={styles.cellInnerWrapper}>
                <TableSearch
                  title="Дата регистрации"
                  isActive={registrationDateSearchIsActive}
                  showSearchHandler={setRegistrationDateSearchIsActive}
                  value={emailSearchValue}
                  searchHandler={setEmailSearchValue}
                />
              </div>
            </TableCell>
            <TableCell variant="head">
              <div className={styles.cellInnerWrapper}>
                <TableSearch
                  title="Телефон"
                  isActive={phoneSearchIsActive}
                  showSearchHandler={setPhoneSearchIsActive}
                  value={emailSearchValue}
                  searchHandler={setEmailSearchValue}
                />
              </div>
            </TableCell>
            <TableCell variant="head">Блок</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString('ru-RU')}
              </TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>
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
