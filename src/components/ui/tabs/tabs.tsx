import { FC } from 'react';
import { Tab } from '../../../types/tab';
import styles from './tabs.module.sass';

interface TabsProps {
  tabs: Tab[];
  currentValue: string;
  setCurrentValue: (value: string) => void;
}

const Tabs: FC<TabsProps> = ({tabs, currentValue, setCurrentValue}) => {
  return (
    <ul className={styles.toolsCategories}>
      {tabs.map((tab) => (
        <li
          className={`${styles.toolsCategory} ${
            tab.value === currentValue ? styles.toolsCategory__active : ''
          }`}
          onClick={() => setCurrentValue(tab.value)}
        >
          {
            tab.icon
            ?
            <>
              <span className="material-icons">{tab.icon}</span>
              <span className='visually-hidden'>{tab.title}</span>
            </>
            :
            tab.title
          }
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
