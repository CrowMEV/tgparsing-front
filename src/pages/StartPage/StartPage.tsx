import styles from './start-page.module.sass';
import Promo from '../../components/Start/Promo/Promo';
import Info from '../../components/Start/Info/Info';
import Experience from '../../components/Start/Experience/Experience';

const StartPage = () => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <section className={styles.promo}>
          <Promo />
        </section>
        <section className={styles.info}>
          <Info />
        </section>
        <section className={styles.experience}>
          <Experience />
        </section>
      </main>
    </div>
  );
};
export default StartPage;
