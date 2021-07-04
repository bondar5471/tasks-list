import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';

import DaysContainer from '../../src/components/days-container/days-container';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({});

describe('DaysContainer component', () => {
  it('shallow renders without crashing', () => {
    const {} = getDefaultProps();
    const wrapper = shallow(<DaysContainer />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveLength(1)
  });

  it('expect calendar DayContainer', () => {
    const {} = getDefaultProps();
    const wrapper = mount(<DaysContainer />);
    const calendar = wrapper.find('.react-calendar-heatmap');
    expect(calendar).toBeTruthy();
  })

  it('is render spinner loading', () => {

  })
});