import { useState } from 'react';

import Tabs from '../../ui/tabs/tabs';
import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';

import { ReactComponent as Download } from '../../../assets/images/icons/download.svg';
import { ReactComponent as Double } from '../../../assets/images/icons/double.svg';
import { ReactComponent as AddIcon } from '../../../assets/images/icons/circle.svg';

import styles from './audience-selection-window.module.sass';

const FileUploadTab = () => {
  return (
    <div className={styles.fileUpload}>
      <TextInput className={styles.input} type="file" accept=".xls, .xlsx" />
      <Button className={styles.button} variant="additional">
        Применить
      </Button>
    </div>
  );
};

const FromTasksTab = () => {
  return (
    <div className={styles.fromTasks}>
      <TextInput
        className={styles.input}
        placeholder="Введите название задачи"
        placeholderStyle={{ backgroundColor: '#2B3243' }}
      />
      <div className={styles.header}>
        <h3>Выберите задачи из списка с помощью </h3>
        <AddIcon />
      </div>
      <ul className={styles.tasksList}></ul>
      <Button className={styles.button} variant="additional">
        Применить
      </Button>
    </div>
  );
};

const AudienceSelectionWindow = () => {
  const TABS = [
    { icon: <Download />, title: 'file', value: 'file' },
    { icon: <Double />, title: 'task', value: 'task' },
  ];

  const [currentTab, setCurrentTab] = useState(TABS[0].value);

  return (
    <div className={styles.tasksWrapper}>
      <div className={styles.tabsWrapper}>
        <Tabs
          tabs={TABS}
          currentValue={currentTab}
          setCurrentValue={(value: string) => setCurrentTab(value)}
        />
      </div>
      {(() => {
        switch (currentTab) {
          case TABS[0].value:
            return <FileUploadTab />;
          case TABS[1].value:
            return <FromTasksTab />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default AudienceSelectionWindow;
