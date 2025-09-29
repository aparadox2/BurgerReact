import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

const AppHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
            <button className={styles.navButton}>
                <BurgerIcon type={'secondary'} />
                <span>Конструктор</span>
            </button>

            <button className={styles.navButton}>
                <ListIcon type={'secondary'} />
                <span>Лента заказов</span>
            </button>
        </div>

        <div className={styles.logo}>
            <Logo />
            <span className={styles.logoText}/>
        </div>

        <div className={styles.right}>
            <button className={styles.navButton}>
            <ProfileIcon type={'secondary'} />
                <span>Личный кабинет</span>
            </button>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;