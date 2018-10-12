export const BASKET_LOADING = 'BASKET_LOADING';
export const BASKET_LOADED = 'BASKET_LOADED';
export const UPDATE_BASKET = 'UPDATE_BASKET';

export function loadBasket() {
    return async (dispatch, _, config) => {
        dispatch({ type: BASKET_LOADING });

        const response = await fetch(config.cartApi, { method: 'POST', body: JSON.stringify({}) });
        const basket = await response.json();

        dispatch({
            type: BASKET_LOADED,
            ...basket,
        })
    };
}

export function addToBasket(basketItem) {

    return async (dispatch, _, config) => {
        const currentState = _();
        let response;
        let productName;

        dispatch({ type: BASKET_LOADING });

        const isItemInBasket = Object.keys(currentState.basket.items).find((index) => currentState.basket.items[index].itemId === basketItem);

        if(isItemInBasket) {
            response = await fetch(`${config.cartApi}/${currentState.basket.id}/item/${basketItem}/increment`, { method: 'POST', body: JSON.stringify({})});
        
        } else {
            response = await fetch(`${config.cartApi}/${currentState.basket.id}/item/${basketItem}`, { method: 'POST', body: JSON.stringify({"quantity": 1}) });
        }
        
        const basket = await response.json();

        dispatch({
            type: UPDATE_BASKET,
            ...basket,
        })
    };
}

export function decrementItemInBasket(basketItem) {

    return async (dispatch, _, config) => {
        const currentState = _();

        dispatch({ type: BASKET_LOADING });

        const response = await fetch(`${config.cartApi}/${currentState.basket.id}/item/${basketItem}/decrement`, { method: 'POST', body: JSON.stringify({})});
        const basket = await response.json();

        dispatch({
            type: UPDATE_BASKET,
            ...basket,
        })
    };
}

export function removeItemFromBasket(basketItem) {

    return async (dispatch, _, config) => {
        const currentState = _();
        let basket = _().basket;

        dispatch({ type: BASKET_LOADING });

        const response = await fetch(`${config.cartApi}/${currentState.basket.id}/item/${basketItem}`, { method: 'DELETE', body: JSON.stringify({})});
        const statusCode = await response.status;

        if (statusCode === 204) {
            Object.keys(basket.items).forEach((index) => {
                if(basket.items[index].itemId === basketItem) {
                    return delete basket.items[index];
                }
            });
        }

        dispatch({
            type: UPDATE_BASKET,
            id: basket.id,
            cartItems: basket.items
        })
    };
}