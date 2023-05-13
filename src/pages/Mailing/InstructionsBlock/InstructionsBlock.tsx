import { FC } from 'react';
import styles from './instructions.module.sass';
import { Mailing } from '../../../types/mailing-form';
import Toggle from '../../../components/ui/toggle/toggle';

interface InstructionsBlockTypes {
  steps: string[];
  currentStep: number;
  formData: Mailing;
  setFormData: (data: Mailing) => void;
}

const InstructionsBlock: FC<InstructionsBlockTypes> = ({
  steps,
  currentStep,
  formData,
  setFormData,
}) => {
  return (
    <section className={styles.instructions}>
      <h2 className={styles.title}>Создать новую рассылку</h2>
      <div className={styles.steps}>
        <span className={styles.currentStep}>
          {currentStep + 1} шаг из {steps.length}
        </span>
        <div className={styles.stepPoints}>
          {steps.map((step, index) => (
            <span
              className={`${styles.stepPoint} ${
                currentStep === index ? styles.stepPoint__active : ''
              }`}
              key={step}
            />
          ))}
        </div>
      </div>

      <p className={styles.stepDescription}>{steps[currentStep]}</p>

      <div className={styles.checkboxPro}>
        <Toggle
          title="Рассылки PRO"
          supTitle="Быстрее, проще, эффективнее"
          isChecked={formData.isPro}
          toggleHandler={(value: boolean) =>
            setFormData({ ...formData, isPro: value })
          }
        />
      </div>

      <p className={styles.descriptionPro}>
        Рассылки PRO - это режим ускоренного создания рассылки в 3 шага: введите
        название и укажите канал отправки, заполните контент блоки, создайте
        рассылку
      </p>
    </section>
  );
};

export default InstructionsBlock;
