import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import Title from '../../components/Title/Title';
import { useCart } from '../../hooks/useCart';
import classes from './cartPage.module.css';
import NotFound from '../../components/NotFound/NotFound'; // Assuming this is the path to NotFound component

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  return (
    <>
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

      {cart.items.length === 0 ? (
        <NotFound message="Cart Page Is Empty!" />
      ) : (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map((item) => (
              <li key={item.cup.id}>
                <div>
                  <img src={`/cups/${item.cup.imageUrl}`} alt={item.cup.name} />
                </div>
                <div>
                  <Link to={`/cup/${item.cup.id}`}>{item.cup.name}</Link>
                </div>
                <div>
                  <select
                    value={item.quantity}
                    onChange={(e) => changeQuantity(item, Number(e.target.value))}
                  >
                    {[...Array(10).keys()].map((n) => (
                      <option key={n + 1} value={n + 1}>
                        {n + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Price price={item.price} />
                </div>
                <div>
                  <button
                    className={classes.remove_button}
                    onClick={() => removeFromCart(item.cup.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={classes.checkout}>
            <div>
              <div className={classes.cups_count}>{cart.totalCount}</div>
              <div className={classes.total_price}>
                <Price price={cart.totalPrice} />
              </div>
            </div>

            <Link to="/checkout">Proceed To Checkout</Link>
          </div>
        </div>
      )}
    </>
  );
}
