// Libs
import { shallow } from 'enzyme';
import * as React from 'react';

// Card
import Loading from './loading';

describe('Loading', () => {
    it('should render properly', () => {
        const wrapper = shallow(<Loading />);

        expect(wrapper.find('.vtm-loading').text()).toBe('Loading...');
    });
});
