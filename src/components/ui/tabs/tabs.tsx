import { FC } from 'react';
import { Tab } from '../../CompletedTasks/tabs';
import styles from './tabs.module.sass';

interface TabsProps {
  tabs: Tab[];
  currentValue: string;
  setCurrentValue: (value: string) => void;
}

const Tabs: FC<TabsProps> = ({ tabs, currentValue, setCurrentValue }) => {
  return (
    <ul className={styles.toolsCategories}>
      {tabs.map((tab) => (
        <li
          className={`${styles.toolsCategory} ${
            tab.value === currentValue ? styles.toolsCategory__active : ''
          }`}
          key={tab.title}
          onClick={() => setCurrentValue(tab.value)}
        >
          {tab.icon ? (
            <>
              {tab.icon}
              <span className="visually-hidden">{tab.title}</span>
            </>
          ) : (
            <span>{tab.title}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
