import React from 'react';
import Enzyme, { render, shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';

import DaysContainer from '../../src/components/days-container/days-container';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({});

describe('DaysContainer component', () => {
    it('shallow renders without crashing', () => {
        const {} = getDefaultProps();
        const wrapper = shallow(<DaysContainer />);
        expect(wrapper).toMatchSnapshot();
    });
});