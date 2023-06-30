import styles from './experience.module.sass';

const Experience = () => {
  return (
    <div className={styles.experience}>
      <div
        className={`${styles.experienceHeader} ${styles.experienceHeader__marketing}`}
      >
        Опыт
        <br /> в контекстной рекламе
      </div>
      <div
        className={`${styles.experienceHeader} ${styles.experienceHeader__social}`}
      >
        Опыт
        <br /> продвижения в соцсетях
      </div>
      <div
        className={`${styles.experienceHeader} ${styles.experienceHeader__articles}`}
      >
        Научные статьи
        <br /> о продвижении в соцсетях
      </div>
      <div className={`${styles.value} ${styles.value__marketing}`}>
        <span className={styles.accentText}>20</span>лет
      </div>
      <div className={`${styles.value} ${styles.value__social}`}>
        <span className={styles.accentText}>10</span>лет
      </div>
      <div className={`${styles.value} ${styles.value__articles}`}>
        более<span className={styles.accentText}>30</span>
      </div>
    </div>
  );
};
export default Experience;
