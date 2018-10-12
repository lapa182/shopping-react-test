import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from './basket';


const config = { 'cartApi': '/cart' };
const middlewares = [thunk.withExtraArgument(config)];
const mockStore = configureMockStore(middlewares);

describe('basket actions', () => {

    describe('loadBasket', () => {

        afterEach(() => {
            fetchMock.reset()
            fetchMock.restore()
        });

        it('creates a basket when BASKET_LOADED is dispatched', async () => {
            // Given
            fetchMock.postOnce('/cart', { body: { cartId: '', items: []}});

            // When
            const store = mockStore({});
            await store.dispatch(actions.loadBasket());

            // Then
            expect(store.getActions()).toEqual([
                { type: actions.BASKET_LOADING },
                { type: actions.BASKET_LOADED, cartId: '', items: [] },
            ]);
        });

        it('updates the basket when add to basket is called', async () => {
            // Given
            fetchMock.postOnce('/cart/755/item/1', { body: {"quantity": 1}});
            
            // When
            const store = mockStore({
                basket: {
                    items: {},
                    id: 755
                }
            });
            await store.dispatch(actions.addToBasket(1));

            // Then
            expect(store.getActions()).toEqual([
                {type: actions.BASKET_LOADING}, 
                {type: actions.UPDATE_BASKET, quantity: 1}
            ]);
        });

        it('updates the basket when add to basket is called', async () => {
            // Given
            fetchMock.postOnce('/cart/755/item/1/increment', { body: {"quantity": 2}});
            
            // When
            const store = mockStore({
                basket: {
                    items: {
                        1: {
                            itemId: 1,
                            quantity: 1
                        }
                    },
                    id: 755
                }
            });
            await store.dispatch(actions.addToBasket(1));

            // Then
            expect(store.getActions()).toEqual([
                {type: actions.BASKET_LOADING}, 
                {type: actions.UPDATE_BASKET, quantity: 2}
            ]);
        });

    });

});
