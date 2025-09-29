import React, { useState, useRef, useEffect } from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/data';
import styles from './BurgerIngredients.module.css';

interface BurgerIngredientsProps {
  ingredients: Ingredient[];
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = useState<'bun' | 'sauce' | 'main'>('bun');
  
  const bunRef = useRef<HTMLDivElement>(null!);
  const sauceRef = useRef<HTMLDivElement>(null!);
  const mainRef = useRef<HTMLDivElement>(null!);
  
  // Ссылка на контейнер скролла
  const scrollContainerRef = useRef<HTMLDivElement>(null!);

  // Флаг чтобы не срабатывал handleScroll после клика по табу
  const isScrollingToTab = useRef(false);

   const bunIngredients = ingredients.filter(i => i.type === 'bun');
  const sauceIngredients = ingredients.filter(i => i.type === 'sauce');
  const mainIngredients = ingredients.filter(i => i.type === 'main');

  const renderSection = (type: 'bun' | 'sauce' | 'main', title: string, items: Ingredient[], ref: React.RefObject<HTMLDivElement>) => {
    if (items.length === 0) return null;

    return (
      <div ref={ref} key={type} className={styles.sectionBlock}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <div className={styles.grid}>
          {items.map((ingredient) => (
            <div key={ingredient._id} className={styles.ingredientCard}>
              {ingredient.type === 'bun' && (
                <div className={styles.counter}>
                  <Counter count={1} size="default" />
                </div>
              )}
              <div className={styles.imageWrapper}>
                <img
                  src={ingredient.image_mobile || ingredient.image}
                  alt={ingredient.name}
                  className={styles.image}
                />
              </div>
              <div className={styles.price}>
                <span>{ingredient.price}</span>
                <CurrencyIcon type="primary" />
              </div>
              <p className={styles.name}>{ingredient.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };


  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingToTab.current) return;

      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollPosition = container.scrollTop + container.clientHeight / 1;

      const bun = bunRef.current;
      const sauce = sauceRef.current;
      const main = mainRef.current;

      if (main && scrollPosition >= main.offsetTop) {
        setCurrentTab('main');
      } else if (sauce && scrollPosition >= sauce.offsetTop) {
        setCurrentTab('sauce');
      } else if (bun) {
        setCurrentTab('bun');
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleTabClick = (tab: 'bun' | 'sauce' | 'main') => {
    setCurrentTab(tab);
    
    isScrollingToTab.current = true;
    
    let targetElement: HTMLDivElement | null = null;
    
    switch (tab) {
      case 'bun':
        targetElement = bunRef.current;
        break;
      case 'sauce':
        targetElement = sauceRef.current;
        break;
      case 'main':
        targetElement = mainRef.current;
        break;
    }

    if (targetElement && scrollContainerRef.current) {
      const target = targetElement;
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // Скроллит к началу элемента
      });
    }

    setTimeout(() => {
      isScrollingToTab.current = false;
    }, 600);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Соберите бургер</h2>
      <div className={styles.tabs}>
        <Tab 
          value="bun" 
          active={currentTab === 'bun'} 
          onClick={() => handleTabClick('bun')}
        >
          Булки
        </Tab>
        <Tab 
          value="sauce" 
          active={currentTab === 'sauce'} 
          onClick={() => handleTabClick('sauce')}
        >
          Соусы
        </Tab>
        <Tab 
          value="main" 
          active={currentTab === 'main'} 
          onClick={() => handleTabClick('main')}
        >
          Начинки
        </Tab>
      </div>

      <div ref={scrollContainerRef} className={styles.scrollContainer}>
        {renderSection('bun', 'Булки', bunIngredients, bunRef)}
        {renderSection('sauce', 'Соусы', sauceIngredients, sauceRef)}
        {renderSection('main', 'Начинки', mainIngredients, mainRef)}
      </div>
    </section>
  );
};

export default BurgerIngredients;