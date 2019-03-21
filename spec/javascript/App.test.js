import React from 'react';
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../../src/components/app/app';

configure({ adapter: new Adapter() });

describe('App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it('shallow renders without crashing', () => {
      expect(wrapper).toMatchSnapshot();
  });
});
