import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ProductList, BasketList } from '../components';

import * as basketActions from '../actions/basket';


export class BasketPage extends Component {
    
    constructor(props) {
        super(props);
        props.loadBasket();
        this.addToBasket = this.addToBasket.bind(this);
        this.removeFromBasketStore = this.removeFromBasketStore.bind(this);
        this.decrementItemInBasket = this.decrementItemInBasket.bind(this);
        this.computedBasket = this.computedBasket.bind(this);
    }
    
    removeFromBasketStore(item) {
        this.props.removeItemFromBasket(item);
    }

    addToBasket(item) {
        this.props.addToBasket(item);
    }

    decrementItemInBasket(itemId) {
        this.props.decrementItemInBasket(itemId);
    }

    getProduct(currentId) {
        
        return this.props.products.find((item) => {
            if(item.id === currentId) {
                return item;
            }
        });
    }

    computedBasket(basketList) {

        if (Object.keys(basketList).length && Object.keys(basketList.items).length > 0) {
            return Object.keys(basketList.items).map((key) => {
                if(this.getProduct(basketList.items[key].itemId).id === basketList.items[key].itemId) {
                    return {
                        ...basketList.items[key],
                        name: this.getProduct(basketList.items[key].itemId).name
                    }
                }
            });
        }

    }

    render() {
        const { isLoading, products, basket } = this.props;

        if (isLoading) {
            return <div> Loading your basket </div>;
        }

        return (
            <div className="container">
                <header className="mt-5 mb-5">
                    <h1>Shopping Basket</h1>
                </header>
                <main className="row">
                    <section className="col">
                        <ProductList products={products} addToBasket={this.addToBasket}/>
                    </section>
                    <section className="col">
                        <BasketList 
                            basket={this.computedBasket(basket)} 
                            removeFromBasket={this.removeFromBasketStore}
                            decrementItemInBasket={this.decrementItemInBasket} />
                    </section>
                </main>
            </div>
        )
    }

}

export function mapStateToProps({ basket, products }) {
    return {
        isLoading: !basket.id,
        products,
        basket,
    }
}

export default connect(mapStateToProps, basketActions)(BasketPage);
