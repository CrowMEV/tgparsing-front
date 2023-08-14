import styles from './index.module.sass';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as NotificationIcon } from '../../../assets/images/icons/notification.svg';
import { ReactComponent as PowerIcon } from '../../../assets/images/icons/power-button.svg';
import { Routes } from '../../../router/routes';
import NavTabs from '../../ui/navTabs/navTabs';
import { MenuCategory, MenuItem } from '../menu-items';
import Logo from '../../ui/logo/Logo';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logout } from '../../../store/user-slice/apiActions';
import Toggle from '../../ui/toggle/toggle';
import { Modes, Roles } from '../../../consts/consts';
import { changeMode } from '../../../store/user-slice/userSlice';
import { logoutChannel } from '../../../services/logout-channel';

interface PropTypes {
  menuItems: MenuItem[];
  currentPage: MenuItem;
}

const Header = ({ menuItems, currentPage }: PropTypes) => {
  const currentLinkPosition =
    currentPage.menuCategory === MenuCategory.Profile
      ? currentPage.position
      : -1;

  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.UserData.user?.role.name);
  const mode = useAppSelector((state) => state.UserData.mode);
  const navigate = useNavigate();

  const toggleModeHandler = () => {
    if (mode === Modes.Admin) {
      dispatch(changeMode(Modes.User));
      navigate(Routes.Dashboard);
    } else if (mode === Modes.User) {
      dispatch(changeMode(Modes.Admin));
      navigate(Routes.AdminUsers);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__blocks}>
        <div className={styles.header__logoWrapper}>
          <Logo />
        </div>
        <div className={styles.header__currentPage}>
          {mode === Modes.Admin &&
          (role === Roles.Admin || role === Roles.SuperUser) ? (
            <span>
              Кабинет
              <br /> администратора
            </span>
          ) : (
            currentPage.text
          )}
        </div>
        <div className={styles.header__links}>
          {(role === Roles.Admin || role === Roles.SuperUser) && (
            <Toggle
              className={styles.adminToggle}
              checked={mode === Modes.Admin}
              toggleHandler={() => toggleModeHandler()}
              title="Админ"
            />
          )}
          <NavTabs currentElementIndex={currentLinkPosition}>
            {menuItems.map((item, index) => (
              <Link
                to={item.link}
                className={`${styles.header__link} ${
                  index === currentLinkPosition
                    ? styles.header__link_active
                    : ''
                }
                ${item.disabled ? styles.header__link_disabled : ''}`}
                key={item.text}
              >
                {item.icon && (
                  <div className={styles.header__icon}>{item.icon}</div>
                )}
                <span>{item.text}</span>
              </Link>
            ))}
          </NavTabs>
          <button
            className={`${styles.header__link} ${styles.header__link_disabled}`}
          >
            <div className={styles.header__icon}>
              <NotificationIcon />
            </div>
            Уведомления
          </button>
          <button
            className={`${styles.header__link} ${styles.header__link_logout}`}
            onClick={async () => {
              await dispatch(logout());
              logoutChannel.postMessage('logout');
              navigate(Routes.Home);
            }}
          >
            <div
              className={`${styles.header__icon} ${styles.header__icon_logout}`}
            >
              <PowerIcon />
            </div>
            <span>Выйти</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
