import React from 'react';
import { Button, CurrencyIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/data';
import styles from './BurgerConstructor.module.css';

interface BurgerConstructorProps {
  ingredients: Ingredient[];
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ ingredients }) => {
  const bunIngredients = ingredients.filter(i => i.type === 'bun');
  const mainIngredients = ingredients.filter(i => i.type === 'main');
  const sauceIngredients = ingredients.filter(i => i.type === 'sauce');

  const total = [
    ...bunIngredients,
    ...sauceIngredients,
    ...mainIngredients
  ].reduce((sum, item) => sum + (item?.price || 0), 0);

  return (
    <section className={styles.section}>
        <div className={styles.beforeConstructorList}></div>
      <div className={styles.constructorList}>
        {bunIngredients.map((item) => (
        <div key={item._id} className={styles.draggableItem}>
            <DragIcon type="primary" />
            <div className={styles.btnItem}>
                <img src={item.image_mobile || item.image} alt={item.name} className={styles.itemImage} />
                <span>{item.name}</span>
                <div className={styles.price}>
                <span>{item.price}</span>
                <CurrencyIcon type="primary" />
                </div>
                <DeleteIcon type="primary" />
            </div>
        </div>
        ))}

        {mainIngredients.map((item) => (
        <div key={item._id} className={styles.draggableItem}>
          <DragIcon type="primary" />
          <div className={styles.btnItem}>
            <img src={item.image_mobile || item.image} alt={item.name} className={styles.itemImage} />
            <span>{item.name}</span>
            <div className={styles.price}>
              <span>{item.price}</span>
              <CurrencyIcon type="primary" />
            </div>
              <DeleteIcon type="primary" />
          </div>
        </div>
        ))}

        {sauceIngredients.map((item) => (
        <div key={item._id} className={styles.draggableItem}>
          <DragIcon type="primary" />
          <div className={styles.btnItem}>
            <img src={item.image_mobile || item.image} alt={item.name} className={styles.itemImage} />
            <span>{item.name}</span>
            <div className={styles.price}>
              <span>{item.price}</span>
              <CurrencyIcon type="primary" />
            </div>
              <DeleteIcon type="primary" />
          </div>
        </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.totalPrice}>
          <span>{total}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;