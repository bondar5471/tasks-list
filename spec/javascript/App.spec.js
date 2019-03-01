import React from 'react';
import Enzyme, { render, shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';

import App from '../../src/components/app/app';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({});
describe('App component', () => {
    it('shallow renders without crashing', () => {
        const {} = getDefaultProps();
        shallow(<App />);
    });

    it('render snapshot', () => {
        const {} = getDefaultProps();
        const wrapper = render(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});
