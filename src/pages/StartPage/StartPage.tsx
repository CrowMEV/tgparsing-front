import styles from './start-page.module.sass';
import { ReactComponent as LogoIcon } from '../../assets/images/logo.svg';
import Promo from '../../components/Start/Promo/Promo';
import Info from '../../components/Start/Info/Info';
import Experience from '../../components/Start/Experience/Experience';
import AuthNav from '../../components/Start/AuthNav/AuthNav';
import Footer from '../../components/Start/Footer/Footer';

const StartPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.gradientWrapper}>
        <div className={styles.innerWrapper}>
          <nav className={styles.nav}>
            <LogoIcon width="198" height="121" />
            <AuthNav />
          </nav>
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
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};
export default StartPage;
