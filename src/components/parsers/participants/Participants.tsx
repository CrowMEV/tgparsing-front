import React, { useState } from 'react';

import { ParserNames } from '../../../consts/consts';

import sharedStyles from '../index.module.sass';

const Participants = () => {
  const [formInfo, setFormInfo] = useState({
    groups: '',
    groupsAmount: {
      from: '',
      to: '',
    },
    name: '',
    parserType: ParserNames.Participants,
  });

  return (
    <section>
      <div className="center">
        <h3>Участники</h3>
      </div>
      <form className={sharedStyles.form} method="post" action="">
        <div>
          <h4>Группы</h4>
          <textarea
            className={sharedStyles.input}
            placeholder="Введите группы в отдельной строке, без @"
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
          <h3>Название задачи</h3>
          <input
            className={sharedStyles.input}
            type="text"
            placeholder="Название задачи"
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

export default Participants;
