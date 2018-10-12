import React from 'react';
import { shallow } from 'enzyme';

import { BasketPage, mapStateToProps } from './BasketPage';

describe('<BasketPage />', () => {

    const basket = [];
    const products = [];

    it('should start loading the basket when the basketpage gets created', () => {
        // Given
        const loadBasket = jest.fn();

        // When
        const props = { basket, products, loadBasket };
        const render = shallow(<BasketPage {...props} />);

        // Then
        expect(loadBasket).toHaveBeenCalled();
    });

    it('should display a loading message when loading the basket', () => {
        // Given
        const loadBasket = jest.fn();
        const isLoading = true;

        // When
        const props = { basket, products, isLoading, loadBasket };
        const render = shallow(<BasketPage {...props} />);

        // Then
        expect(render.find('div').text()).toContain('Loading your basket');
    });

    it('should return a product', () => {
        // Given
        const loadBasket = jest.fn();
        const isLoading = true;
        const productsList = [
            { id: 1, name: 'A' },
            { id: 2, name: 'B' }
        ];

        // When
        const props = { basket, products: productsList, isLoading, loadBasket };
        const component = shallow(<BasketPage {...props} />);

        // Then
        expect(component.instance().getProduct(1)).toBe(productsList[0]);
    });
});
