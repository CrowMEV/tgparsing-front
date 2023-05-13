import { FC, useState } from 'react';
import styles from './toolsList.module.sass';
import { tools } from '../../../mocks/tools';
import Tabs from '../tabs/tabs';
import { ToolTabs } from '../../../consts/consts';
import ToolItem from '../toolItem/toolItem';
import { filterParsingTools } from '../../../utils/filterParsingTools';

const ToolsList: FC = () => {
  const [currentCategory, setCurrentCategory] = useState(ToolTabs[0].value);

  const filteredTools = filterParsingTools(tools, currentCategory);

  return (
    <section className={styles.tools}>
      <div className={styles.toolsTabs}>
        <Tabs
          tabs={ToolTabs}
          currentValue={currentCategory}
          setCurrentValue={(value: string) => setCurrentCategory(value)}
        />
        <div className={styles.helpingBlock}>
          <button className={styles.button}>
            <span className="material-icons">search</span>
            <span className="visually-hidden">Поиск</span>
          </button>
          <button className={styles.button}>
            <span className="material-icons-round">more_vert</span>
            <span className="visually-hidden">Другое</span>
          </button>
        </div>
      </div>
      <div className={styles.toolsItems}>
        <ul className={styles.toolsList}>
          {filteredTools.map((tool) => (
            <li key={tool.id}>
              <ToolItem tool={tool} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ToolsList;
