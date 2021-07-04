import React from 'react';
import  renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'

import SigmUp from '../../src/components/sign-up/sign-up';

it('renders without crashing', () => {
    const Sign = renderer.create(
        <Router><SigmUp /></Router>).toJSON()
    expect(Sign).toMatchSnapshot();

});
