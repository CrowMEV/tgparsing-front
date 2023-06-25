import { Link } from 'react-router-dom';
import { ReactComponent as LogoSvg } from '../../../assets/images/logo.svg';
import styles from './logo.module.sass';

const Logo = () => {
  return (
    <Link className={styles.logo} to="/">
      <LogoSvg />
    </Link>
  );
};
export default Logo;
