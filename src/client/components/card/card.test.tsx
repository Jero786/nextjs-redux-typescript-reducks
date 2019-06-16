// Libs
import 'jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';

// Card
import Card from './card';

describe('Card', () => {
    it('should render properly the short description', () => {
        render(<Card shortDescription="a short description" />).getByText(/a short description/);
    });

    it('should render properly the title description', () => {
        render(<Card title="some title here" />).getByText(/some title here/);
    });

    it('should render properly the long description', function() {
        render(<Card longDescription="some long description" />).getByText(/some long description/);
    });
});
