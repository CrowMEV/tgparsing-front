import { FC, useCallback, useState } from 'react';
import styles from './index.module.sass';
import ReplenishmentBlock from './ReplenishmentBlock/ReplenishmentBlock';
import ReferralBlock from './ReferralBlock/ReferralBlock';
import ModalWindow from '../ui/modal-window/ModalWindow';

const tabs = ['Пополнение баланса', 'Рассылайтесь бесплатно'];

type ReplenishmentModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const ReplenishmentModal: FC<ReplenishmentModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const closeModal = useCallback(() => {
    if (isOpen) {
      setActiveTab(tabs[0]);
      handleClose();
    }
  }, [isOpen]);

  return (
    <ModalWindow isActive={isOpen} setActive={closeModal}>
      <article className={styles.wrapper}>
        <h2 className="visually-hidden">Пополнение баланса</h2>
        <ul className={styles.tabs}>
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`${styles.tab} ${
                activeTab === tab ? styles.tab__active : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
        {(() => {
          switch (activeTab) {
            case tabs[0]:
              return <ReplenishmentBlock />;
            case tabs[1]:
              return <ReferralBlock />;
            default:
              return null;
          }
        })()}
      </article>
    </ModalWindow>
  );
};

export default ReplenishmentModal;
