import React from 'react';
import  renderer from 'react-test-renderer'
import {BrowserRouter as Router} from 'react-router-dom'

import Login from '../../src/components/login/login';

it('renders without crashing', () => {
    const Log = renderer.create(
        <Router><Login /></Router>).toJSON()
    expect(Log).toMatchSnapshot();

});
