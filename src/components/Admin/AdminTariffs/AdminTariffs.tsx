import { useState } from 'react';
import Button from '../../ui/button/Button';
import Table from '../../ui/table/Table';
import TableBody from '../../ui/table/tableBody/TableBody';
import TableCell from '../../ui/table/tableCell/TableCell';
import TableContainer from '../../ui/table/tableContainer/TableContainer';
import TableHead from '../../ui/table/tableHead/TableHead';
import TableRow from '../../ui/table/tableRow/TableRow';
import Toggle from '../../ui/toggle/toggle';
import UpdateTariffForm from './UpdateTariffForm/UpdateTariffForm';
import styles from './admin-tariffs.module.sass';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ParsersTitles } from '../../../consts/tariffs';
import { TariffResponse } from '../../../types/tariff';
import { updateTariff } from '../../../store/tariff-slice/apiActions';
import { Roles } from '../../../consts/consts';

const AdminTariffs = () => {
  const dispatch = useAppDispatch();
  const [formIsOpened, setFormIsOpened] = useState(false);
  const tariffs = useAppSelector((state) => state.Tariff.tariffs);
  const role = useAppSelector((state) => state.UserData.user)?.role.name;

  const [currentTariff, setCurrentTariff] = useState<TariffResponse | null>(
    null,
  );

  const openFormHandler = (tariff: TariffResponse) => {
    setCurrentTariff(tariff);
    setFormIsOpened(true);
  };

  const tariffStatusHandler = (tariff: TariffResponse) => {
    dispatch(updateTariff(tariff))
      .unwrap()
      .catch((err) => console.error(err));
  };

  return (
    <TableContainer style={{ height: '550px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.headCell} variant="head">
              Название
            </TableCell>
            <TableCell className={styles.headCell} variant="head">
              Описание
            </TableCell>
            <TableCell className={styles.headCell} variant="head">
              Стоимость
            </TableCell>
            <TableCell className={styles.headCell} variant="head">
              Статус
            </TableCell>
            {role === Roles.SuperUser && (
              <TableCell className={styles.headCell} variant="head">
                <span className="visually-hidden">Управление</span>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tariffs.map((tariff) => (
            <TableRow key={tariff.name}>
              <TableCell>
                <span className={styles.tariffTitle}>{tariff.name}</span>
              </TableCell>
              <TableCell className={styles.descriptionCell}>
                <div className={styles.tariffDescription}>
                  <p>
                    Одновременный парсинг -{' '}
                    {tariff.options.simultaneous_parsing}
                    <br />
                    Парсингов в день - {tariff.options.parsers_per_day}
                  </p>
                  <div>
                    <p>Способы парсинга:</p>
                    <ul className={styles.tariffMethods}>
                      {tariff.options.members && (
                        <li>{ParsersTitles.members[1]}</li>
                      )}
                      {tariff.options.activity && (
                        <li>{ParsersTitles.activemembers[1]}</li>
                      )}
                      {tariff.options.geo && (
                        <li>{ParsersTitles.geomembers[1]}</li>
                      )}
                    </ul>
                  </div>
                </div>
              </TableCell>
              <TableCell>{tariff.price} руб.</TableCell>
              <TableCell>
                {role === Roles.SuperUser ? (
                  <Toggle
                    className={styles.toggle}
                    checked={tariff.active}
                    toggleHandler={() =>
                      tariffStatusHandler({ ...tariff, active: !tariff.active })
                    }
                  />
                ) : (
                  <span className={`${tariff.active ? '' : styles.inactive}`}>
                    {tariff.active ? 'активный' : 'неактивный'}
                  </span>
                )}
              </TableCell>
              {role === Roles.SuperUser && (
                <TableCell>
                  <Button
                    className={styles.updateButton}
                    onClick={() => openFormHandler(tariff)}
                    variant="small"
                  >
                    Изменить тариф
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UpdateTariffForm
        tariff={currentTariff}
        isActive={formIsOpened}
        setIsActive={setFormIsOpened}
      />
    </TableContainer>
  );
};

export default AdminTariffs;
