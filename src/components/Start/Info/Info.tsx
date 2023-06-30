import styles from './info.module.sass';
import { ReactComponent as MarkIcon } from '../../../assets/images/icons/check-mark-icon.svg';

const ADVANTAGES = [
  'создатели уникальной методики продвижения в соцсетях',
  'авторы курса по SMM для МГУ имени М.В. Ломоносова',
  'организаторы конференции «Polit SMM» ',
  'обладатели ряда отраслевых премий и наград ',
];

const Info = () => {
  return (
    <div className={styles.info}>
      <div className={styles.infoText}>
        <p>
          Сервис создан опытными специалистами
          <br />
          по продвижению в интернете и социальных сетях.
        </p>
        <p>
          Мы строим удобную для интернет-маркетологов экосистему,
          <br />
          которая объединит в себе все необходимые инструменты для роста
          <br />
          вашей аудитории и эффективного продвижения в социальных сетях.
        </p>
      </div>
      <div className={styles.advantages}>
        <h3 className={styles.advantagesHeader}>
          Мы — <span className={styles.highlighting}>SMM агентство</span> «Elect
          Assist»
        </h3>
        <ul className={styles.advantagesList}>
          {ADVANTAGES.map((advantage) => (
            <li className={styles.advantagesItem} key={advantage}>
              <MarkIcon />
              {advantage}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Info;
