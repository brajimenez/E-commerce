import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import '../styles/stylesPurchases.css'


const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases);


    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

// no funciona
    const getTotal = purchases => {
        let total = 0
        purchases.forEach(product => {
            total = Number(product.price)
            console.log(total)
        })
        return total
    }


    return (
        <section>
            <div className="title">
                <h4>Home</h4>
                <div className="circle"></div>
                <h4>purchases</h4>
            </div>
            <section className='purchases__title'>
            <h2>My purchases</h2>
            </section>
            <article className="container__purchases">
                {purchases.map((purchasesItem, index) => (
                    
                        <div className="purchases__user-product">
                            <section className="purchases__date"> 
                                <h5>Purchases Nº {index + 1}</h5> 
                                <h5 key={purchasesItem.id}>{purchasesItem.createdAt.slice(0, 10)}</h5>
                            </section>
                            {purchasesItem.cart.products.map(product => (
                                <section key={product.id} className="purchases__info">
                                    <h5 >{product.title}</h5>
                                    <p>{product.productsInCart.quantity}</p>
                                    <div className="purchases__price">
                                        <h5>{product.productsInCart.quantity*product.price}</h5>
                                    </div>
                                </section>
                            ))}
                        </div>
                   ))}

                   <div>${getTotal} </div>

            </article>
        </section>
    );
};

export default Purchases;