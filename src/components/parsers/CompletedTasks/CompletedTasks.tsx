import { FC, useState } from 'react';

import { ParserTask } from '../../../types/parserTask';

import Tabs from '../../ui/tabs/tabs';
import { ToolTabs } from './tabs';
import TaskItem from '../../ui/toolItem/taskItem';

import { ReactComponent as SearchIcon } from '../../../assets/images/icons/search.svg';

import styles from './completed-tasks.module.sass';

interface CompletedTasksProps {
  tasks: ParserTask[] | null;
  isLoading: boolean;
}

const CompletedTasks: FC<CompletedTasksProps> = ({ tasks, isLoading }) => {
  const [currentCategory, setCurrentCategory] = useState(ToolTabs[0].value);

  if (isLoading) return <div>Loading...</div>;

  if (tasks === null) return <div>Не удалось получить данные</div>;

  // const filteredTools = filterParsingTools(tools, currentCategory);

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
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskItem task={task} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CompletedTasks;
