import React, { useEffect, useState } from 'react';
import classes from './cupPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/cupService';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import Price from '../../components/Price/Price';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../components/NotFound/NotFound';

export default function CupPage() {
  const [cup, setCup] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () =>{
    addToCart(cup);
    navigate('/cart');
    

  }

  useEffect(() => {
    getById(id).then(setCup);
  }, [id]);

  return (
    <>
      {!cup ? (
        <NotFound message="Cup Not Found!" linkText="Back To Homepage"/> 
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`/cups/${cup.imageUrl}`} // Correctly use backticks for template literal
            alt={cup.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{cup.name}</span>
              <span className={`${classes.favorite} ${cup.favorite ? '' : classes.not}`}>
                ♥
              </span>
            </div>
            <div className={classes.rating}>
                <StarRating stars={cup.stars} size={25} />
            </div>
            <div className={classes.tags}>
                {cup.tags && <Tags tags={cup.tags.map(tag => ({name:tag}))} 
                forCupPage={true} 
                />
                }
            </div>
            <div className={classes.price}>
                <Price price={cup.price}/>
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}
