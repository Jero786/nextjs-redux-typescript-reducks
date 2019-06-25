// Libs
import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

// Card
import Loading from './loading';

describe('Loading', () => {
    afterEach(cleanup);

    it('should render the component properly', () => {
        render(<Loading />).getByText(/Loading.../);
    });
});
