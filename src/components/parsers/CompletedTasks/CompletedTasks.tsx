import { FC, useState } from 'react';
import styles from './completed-tasks.module.sass';
import { tools } from '../../../mocks/tools';
import Tabs from '../../ui/tabs/tabs';
import { ToolTabs } from './tabs';
import TaskItem from '../../ui/toolItem/taskItem';
import { filterParsingTools } from '../../../utils/filterParsingTools';
import { ReactComponent as SearchIcon } from '../../../assets/images/icons/search.svg';

const CompletedTasks: FC = () => {
  const [currentCategory, setCurrentCategory] = useState(ToolTabs[0].value);

  const filteredTools = filterParsingTools(tools, currentCategory);

  return (
    <section className={styles.tasks}>
      <h2 className={styles.title}>История задач</h2>
      <div className={styles.tasksWrapper}>
        <div className={styles.toolsTabs}>
          <Tabs
            tabs={ToolTabs}
            currentValue={currentCategory}
            setCurrentValue={(value: string) => setCurrentCategory(value)}
          />
          <div className={styles.helpingBlock}>
            <button className={styles.button}>
              <SearchIcon />
              <span className="visually-hidden">Поиск</span>
            </button>
          </div>
        </div>
        <div className={styles.toolsItems}>
          <ul className={styles.toolsList}>
            {filteredTools.map((tool) => (
              <li key={tool.id}>
                <TaskItem tool={tool} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CompletedTasks;
