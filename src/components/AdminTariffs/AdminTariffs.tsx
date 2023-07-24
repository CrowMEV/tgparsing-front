import { useState } from 'react';
import Button from '../ui/button/Button';
import Table from '../ui/table/Table';
import TableBody from '../ui/table/tableBody/TableBody';
import TableCell from '../ui/table/tableCell/TableCell';
import TableContainer from '../ui/table/tableContainer/TableContainer';
import TableHead from '../ui/table/tableHead/TableHead';
import TableRow from '../ui/table/tableRow/TableRow';
import Toggle from '../ui/toggle/toggle';
import UpdateTariffForm from './UpdateTariffForm/UpdateTariffForm';
import styles from './admin-tariffs.module.sass';
import { useAppSelector } from '../../hooks/redux';
import { ParsersTitles } from '../../consts/tariffs';
import { TariffResponse } from '../../types/tariff';

const AdminTariffs = () => {
  const [formIsOpened, setFormIsOpened] = useState(false);
  const tariffs = useAppSelector((state) => state.Tariff.tariffs);
  const [currentTariff, setCurrentTariff] = useState<TariffResponse | null>(
    null,
  );

  const openFormHandler = (tariff: TariffResponse) => {
    setCurrentTariff(tariff);
    setFormIsOpened(true);
  };

  return (
    <TableContainer style={{ height: '550px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Название</TableCell>
            <TableCell variant="head">Описание</TableCell>
            <TableCell variant="head">Стоимость</TableCell>
            <TableCell variant="head">Статус</TableCell>
            <TableCell variant="head">
              <span className="visually-hidden">Управление</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tariffs.map((tariff) => (
            <TableRow key={tariff.name}>
              <TableCell>
                <span className={styles.tariffTitle}>{tariff.name}</span>
              </TableCell>
              <TableCell>
                <div className={styles.tariffDescription}>
                  <p>
                    Одновременный парсинг - {tariff.options.simultaneousParsing}
                    <br />
                    Парсингов в день - {tariff.options.parsersPerDay}
                  </p>
                  <div>
                    <p>Способы парсинга:</p>
                    <ul className={styles.tariffMethods}>
                      {tariff.options.methods.map((method) => (
                        <li key={method}>{ParsersTitles[method][1]}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TableCell>
              <TableCell>{tariff.price} руб.</TableCell>
              <TableCell>
                <Toggle
                  className={styles.toggle}
                  toggleHandler={() => console.log('hello')}
                />
              </TableCell>
              <TableCell>
                <Button
                  className={styles.updateButton}
                  onClick={() => openFormHandler(tariff)}
                  variant="small"
                >
                  Изменить тариф
                </Button>
              </TableCell>
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
