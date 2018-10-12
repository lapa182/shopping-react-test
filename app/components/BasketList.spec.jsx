import React from 'react';
import { shallow } from 'enzyme';

import BasketList from './BasketList';

describe('<BasketList />', () => {

    it('should render the basket list', () => {
        // Given
        const basketList = [
            {itemId: 1, name: "A", quantity: 1},
            {itemId: 2, name: "B", quantity: 1}
        ];

        const removeFromBasket = jest.fn();
        const decrementItemInBasket = jest.fn();

        // When
        const render = shallow(
            <BasketList 
                basket={basketList} 
                removeFromBasket={removeFromBasket}
                decrementItemInBasket={decrementItemInBasket} />
            );
        
        const listItems = render.find('li');
        
        // Then
        expect(listItems).toHaveLength(2);
        expect(listItems.first().find('.list-group-item-name').text()).toContain('A');
        expect(listItems.first().find('.badge-primary').text()).toContain('1');
        expect(listItems.at(1).find('.list-group-item-name').text()).toContain('B');
        expect(listItems.at(1).find('.badge-primary').text()).toContain('1');
    });

    it('should not render the basket list', () => {
        // Given
        const basketList = [];

        const removeFromBasket = jest.fn();
        const decrementItemInBasket = jest.fn();

        // When
        const render = shallow(
            <BasketList 
                basket={basketList} 
                removeFromBasket={removeFromBasket}
                decrementItemInBasket={decrementItemInBasket} />
            );
        
        const listItems = render.find('li');
        
        // Then
        expect(listItems).toHaveLength(1);
        expect(listItems.text()).toContain('Empty Basket list');
    });

    it('should trigger removeFromBasket with the right productId', () => {
        // Given
        const basketList = [
            {itemId: 1, name: "A", quantity: 1},
            {itemId: 2, name: "B", quantity: 1}
        ];

        const removeFromBasket = jest.fn();
        const decrementItemInBasket = jest.fn();

        // When
        const render = shallow(
            <BasketList 
                basket={basketList} 
                removeFromBasket={removeFromBasket}
                decrementItemInBasket={decrementItemInBasket} />
        );
        
        render.find('.btn-outline-danger').first().simulate('click');

        // Then
        expect(removeFromBasket).toHaveBeenCalledWith(basketList[0].itemId);
    });

    it('should trigger decrementItemInBasket with the right productId', () => {
        // Given
        const basketList = [
            {itemId: 1, name: "A", quantity: 1},
            {itemId: 2, name: "B", quantity: 1}
        ];

        const removeFromBasket = jest.fn();
        const decrementItemInBasket = jest.fn();

        // When
        const render = shallow(
            <BasketList 
                basket={basketList} 
                removeFromBasket={removeFromBasket}
                decrementItemInBasket={decrementItemInBasket} />
        );
        
        render.find('.btn-outline-primary').first().simulate('click');

        // Then
        expect(decrementItemInBasket).toHaveBeenCalledWith(basketList[0].itemId);
    });

});
