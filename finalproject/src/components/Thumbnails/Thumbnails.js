import React from 'react';
import { Link } from 'react-router-dom';
import classes from './thumbnails.module.css';
import StarRating from '../StarRating/StarRating';
import Price from '../Price/Price';

export default function Thumbnails({ cups = [] }) { // Added default value to prevent errors
  return (
    <ul className={classes.list}>
      {cups.map(cup => (
        <li key={cup.id}>
          <Link to={`/cup/${cup.id}`}>
            <img
              className={classes.image}
              src={`/cups/${cup.imageUrl}`} // Use backticks for template literals
              alt={cup.name}
            />
          
          <div className={classes.content}>
              <div className={classes.name}>{cup.name}</div>
              <span
                className={`${classes.favorite} ${
                  cup.favorite ? '' : classes.not
                }`}
              >
                ♥
              </span>
              <div className={classes.stars}>
                <StarRating stars={cup.stars} />
              </div>
          </div>
          <div className={classes.price}>
            <Price price={cup.price} />
          </div>
        </Link>
        </li>
      ))}
    </ul>
  );
}
