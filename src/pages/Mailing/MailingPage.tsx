import { SyntheticEvent, useState } from 'react';
import InstructionsBlock from './InstructionsBlock/InstructionsBlock';
import MailingForm from './MailingForm/MailingForm';
import styles from './index.module.sass';
import { Mailing } from '../../types/mailing-form';

const MAILING_BLANK: Mailing = {
  name: '',
  channel: '',
  image: null,
  message: '',
  link: '',
  linkMessage: '',
  isPro: false,
  sendingSms: false,
  sendingTestMessage: false,
  saveTemplate: false,
};

const MailingPage = () => {
  const steps = [
    'Выберите канал отправки, затем введите название рассылки. Это название будет видно только Вам в разделе Отчеты',
    'шаг 2',
    'шаг 3',
    'шаг 4',
    'шаг 5',
    'шаг 6',
  ];

  const [formData, setFormData] = useState(MAILING_BLANK);

  const [currentStep, setCurrentStep] = useState(0);

  const prevButtonHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setCurrentStep(currentStep === 0 ? 0 : currentStep - 1);
  };

  const submitFormHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (currentStep === steps.length - 1) {
      console.log(formData);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <form className={styles.mailing} onSubmit={submitFormHandler}>
      <InstructionsBlock
        steps={steps}
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
      />

      <section>
        <MailingForm formData={formData} setFormData={setFormData} />
        <div className={styles.stepsControls}>
          <button
            className={`${styles.button} ${styles.backButton}`}
            onClick={prevButtonHandler}
            disabled={currentStep === 0}
          >
            <span className="material-icons-outlined">arrow_back_ios</span>
            Назад
          </button>

          <button className={styles.button} type="submit">
            <span className="material-icons-outlined">arrow_forward_ios</span>
            {currentStep === steps.length - 1 ? 'Отправить' : 'Продолжить'}
          </button>
        </div>
      </section>
    </form>
  );
};

export default MailingPage;
