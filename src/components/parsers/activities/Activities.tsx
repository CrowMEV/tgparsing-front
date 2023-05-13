import React, { useState } from 'react';

import { ParserNames } from '../../../consts/consts';

import sharedStyles from '../index.module.sass';

const Activities = () => {
  const [formInfo, setFormInfo] = useState({
    groups: '',
    groupsAmount: {
      from: '',
      to: '',
    },
    date: {
      from: '',
      to: '',
    },
    name: '',
    parserName: ParserNames.Activities,
  });

  return (
    <section>
      <div className="center">
        <h3>Активность</h3>
      </div>
      <form className={sharedStyles.form} method="post" action="">
        <div>
          <h4>Группы</h4>
          <textarea
            className={sharedStyles.input}
            placeholder="Введите группы в отдельной строке, без @"
            value={formInfo.groups}
            onChange={(e) => {
              setFormInfo({ ...formInfo, groups: e.target.value });
            }}
          />
        </div>
        <div>
          <h4>Пребывают в группах</h4>
          <div className={sharedStyles.inputGroup}>
            <input
              className={sharedStyles.input}
              type="text"
              placeholder="От"
              value={formInfo.groupsAmount.from}
              onChange={(e) => {
                setFormInfo({
                  ...formInfo,
                  groupsAmount: {
                    ...formInfo.groupsAmount,
                    from: e.target.value,
                  },
                });
              }}
            />
            <input
              className={sharedStyles.input}
              type="text"
              placeholder="До (включительно)"
              value={formInfo.groupsAmount.to}
              onChange={(e) => {
                setFormInfo({
                  ...formInfo,
                  groupsAmount: {
                    ...formInfo.groupsAmount,
                    to: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>
        <div>
          <h4>Период за который учитывать активность</h4>
          <div className={sharedStyles.inputGroup}>
            <input
              className={sharedStyles.input}
              type="date"
              value={formInfo.date.from}
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  date: {
                    ...formInfo.date,
                    from: e.target.value,
                  },
                })
              }
            />
            <input
              className={sharedStyles.input}
              type="date"
              value={formInfo.date.to}
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  date: {
                    ...formInfo.date,
                    to: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div>
          <h3>Название задачи</h3>
          <input
            className={sharedStyles.input}
            type="text"
            placeholder="Название задачи"
            value={formInfo.name}
            onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
          />
        </div>
        <button type="submit" className={sharedStyles.button}>
          Создать задачу
        </button>
      </form>
    </section>
  );
};

export default Activities;
