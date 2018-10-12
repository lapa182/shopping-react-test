import React from 'react';

const BasketList = ({ basket, removeFromBasket, decrementItemInBasket }) => (
    <div className="mr-4">
        <h2>Basket</h2>
        <ul className="list-group">
            {basket && Object.keys(basket).length ? (
                basket.map(item => {
                    return (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={item.itemId}>
                            <span className="list-group-item-name">{item.name}</span>
                            <span className="badge badge-primary badge-pill">{item.quantity}</span>
                            <div className="btn-group">
                                <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => decrementItemInBasket(item.itemId)}>Reduce</button>
                                <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => removeFromBasket(item.itemId)}>Remove</button>
                            </div>
                        </li>
                    )
                })
            ) : (
                <li className="list-group-item d-flex justify-content-between align-items-center">Empty Basket list</li>
            )}
        </ul>
    </div>
);

export default BasketList;
