import {
    BASKET_LOADED,
    UPDATE_BASKET
    
} from '../actions/basket';

function basketReducer(state={ items: {} }, action) {

    switch(action.type) {
        case BASKET_LOADED:
            return {
                ...state, 
                id: action.cartId,
                items: action.cartItems,
            }
        case UPDATE_BASKET:
            return {
                ...state, 
                items: action.cartItems
            }
        default:
            return state;
    }

}

export default basketReducer;
