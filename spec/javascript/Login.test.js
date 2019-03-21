import React from 'react';
import  renderer from 'react-test-renderer'
import {BrowserRouter as Router} from 'react-router-dom'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from '../../src/components/login/login';
configure({ adapter: new Adapter() });
it('renders without crashing', () => {
    const Log = renderer.create(
        <Router><Login /></Router>).toJSON()
    expect(Log).toMatchSnapshot();
});
