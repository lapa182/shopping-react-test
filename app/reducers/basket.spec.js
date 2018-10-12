import * as actions from '../actions/basket';
import basketReducer from './basket';

describe('basketReducer', () => {

    it('should return an empty initial state', () => {
        expect(basketReducer(undefined, {})).toEqual({ items: {} });
    });


    it('should store basket id and cartItems when basket is loaded', () => {
        const action = {
            type: actions.BASKET_LOADED,
            cartId: 123,
            cartItems: {}
        };

        expect(basketReducer(undefined, action)).toEqual({
            id: 123,
            items: {},
        });
    });

    it('should store update basket id and cartItems when called', () => {
        const action = {
            type: actions.UPDATE_BASKET,
            cartId: 123,
            cartItems: {
                itemId: 1,
                quantity: 1
            }
        };

        expect(basketReducer(undefined, action)).toEqual({
            items: {
                itemId: 1, 
                quantity: 1
            }
        });
    });

});
