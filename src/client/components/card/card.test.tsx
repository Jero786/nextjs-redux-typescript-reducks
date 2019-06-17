// Libs
import 'jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import sinon from 'sinon';

// Card
import Card from './card';

describe('Card', () => {

    afterEach(cleanup)

    it('should render properly the short description', () => {
        render(<Card shortDescription="a short description" />).getByText(/a short description/);
    });

    it('should render properly the title description', () => {
        render(<Card title="some title here" />).getByText(/some title here/);
    });

    it('should render properly the long description', () => {
        render(<Card longDescription="some long description" />).getByText(/some long description/);
    });

    it('should work click delete handler properly', () => {
        const spy = sinon.spy();
        const {getByTestId} = render(<Card onClickDelete={spy}/>);

        fireEvent.click(getByTestId('card-button-delete'));

        expect(spy.calledOnce).toBe(true);
    });

    it('should handler click save handler properly', () => {
        let resultOnClick;
        const {getByTestId} = render(
            <Card
            longDescription="some loooong description"
            shortDescription="some short description"
            onClickSave={(data) => {
                resultOnClick = data;
        }}/>);

        fireEvent.click(getByTestId('vtm-button-save'));
        fireEvent.click(getByTestId('vtm-button-save'));

        expect(JSON.stringify(resultOnClick)).toBe('{"short_description":"some short description","long_description":"some loooong description","authors":[]}')
    });
});
