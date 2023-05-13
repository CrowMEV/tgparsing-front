import { FC, useRef, ChangeEvent, SyntheticEvent } from 'react';
import styles from './mailingForm.module.sass';
import { Mailing } from '../../../types/mailing-form';
import Checkbox from '../../../components/ui/checkbox/Checkbox';
import Radio from '../../../components/ui/radio/Radio';

interface MailingFormTypes {
  formData: Mailing;
  setFormData: (formValue: Mailing) => void;
}

const MailingForm: FC<MailingFormTypes> = ({ formData, setFormData }) => {
  const imageRef = useRef(null);

  const fileHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setFormData({ ...formData, image: evt.target.files[0] });
    }
  };

  const testMessageHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();
    console.log('test message');
  };

  return (
    <>
      <div className={styles.formGroup}>
        <h3 className={styles.label}>Выбор названия и канала отправки</h3>
        <input
          id="mailing-name"
          className={styles.textInput}
          type="text"
          placeholder="Название рассылки"
          value={formData.name}
          onChange={(evt) =>
            setFormData({ ...formData, name: evt.target.value })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <h3 className={styles.label}>Канал отправки</h3>

        <div className={styles.radioWrapper}>
          <Radio
            title="WhatsApp"
            name="mailing-channel"
            value="whatsapp"
            currentValue={formData.channel}
            radioHandler={(value: string) =>
              setFormData({ ...formData, channel: value })
            }
          />

          <Radio
            title="Telegram"
            name="mailing-channel"
            value="telegram"
            currentValue={formData.channel}
            radioHandler={(value: string) =>
              setFormData({ ...formData, channel: value })
            }
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <h3 className={styles.label}>Изображение</h3>
        <span className={styles.subText}>
          + 60 копеек к стоимости WhatsApp сообщения
        </span>

        {formData.image && (
          <img
            className={styles.image}
            src={URL.createObjectURL(formData.image)}
          />
        )}

        <input
          id="image-button"
          className={styles.inputImage}
          ref={imageRef}
          type="file"
          onChange={fileHandler}
          accept=".jpg, .jpeg, .png"
        />
        <label
          className={`${styles.button} ${styles.imageButton}`}
          htmlFor="image-button"
        >
          <span
            className={`material-icons-outlined ${styles.imageButton__icon}`}
          >
            downloading
          </span>
          <span>Загрузить изображение</span>
        </label>

        <span className={styles.subText}>
          Минимальный размер картинки не должен превышать 1 мб
        </span>
      </div>

      <div className={styles.formGroup}>
        <h3 className={styles.label}>Текст сообщения</h3>
        <span className={styles.subText}>
          Максимальное количество символов: 950
        </span>
        <span className={styles.subText}>
          Символов: {formData.message.length}
        </span>

        <textarea
          className={`${styles.textInput} ${styles.textInput__mailing}`}
          placeholder="Текст рассылки"
          value={formData.message}
          maxLength={950}
          onChange={(evt) =>
            setFormData({ ...formData, message: evt.target.value })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Ссылка</label>
        <input
          className={`${styles.textInput} ${styles.textInput__link}`}
          type="text"
          placeholder="Ссылка"
          value={formData.link}
          onChange={(evt) =>
            setFormData({ ...formData, link: evt.target.value })
          }
        />
        <span className={styles.subText}>
          При использовании ссылки к тексту сообщения добавляется следующий блок
        </span>
        <textarea
          className={`${styles.textInput} ${styles.textInput__linkDescription}`}
          placeholder="Если ссылка не активна, отправьте любой текст в ответ и перезайдите в чат"
          value={formData.linkMessage}
          maxLength={950}
          onChange={(evt) =>
            setFormData({ ...formData, linkMessage: evt.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <div className={styles.checkBoxWrapper}>
          <Checkbox
            title="Доотправка по SMS"
            isChecked={formData.sendingSms}
            checkboxHandler={(value: boolean) =>
              setFormData({ ...formData, sendingSms: value })
            }
          />
          <span className={styles.subText}>Описание услуги...</span>
        </div>

        <div className={styles.checkBoxWrapper}>
          <Checkbox
            title="Отправить тестовое сообщение"
            isChecked={formData.sendingTestMessage}
            checkboxHandler={(value: boolean) =>
              setFormData({ ...formData, sendingTestMessage: value })
            }
          />
          <span className={styles.subText}>Описание услуги...</span>
        </div>
      </div>

      {formData.sendingTestMessage && (
        <button
          className={`${styles.button} ${styles.button__testMessage}`}
          onClick={testMessageHandler}
        >
          <span className={`material-icons-outlined`}>arrow_right_alt</span>
          Отправить тестовое сообщение
        </button>
      )}

      <Checkbox
        title="Сохранить рассылку как шаблон"
        isChecked={formData.saveTemplate}
        checkboxHandler={(value: boolean) =>
          setFormData({ ...formData, saveTemplate: value })
        }
      />
    </>
  );
};

export default MailingForm;
