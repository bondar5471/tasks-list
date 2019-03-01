import React from 'react';
import Enzyme, { mount, render, shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';


import TaskList from '../../src/components/task-list/task-list';
import App from "./App.spec";

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({});
describe('Task #1 - taskTaskList component', () => {
  it('shallow renders without crashing', () => {
    const {} = getDefaultProps();
    shallow(<TaskList />);
  });

  it('render snapshot', () => {
    const {} = getDefaultProps();
    const wrapper = render(<TaskList />);
    expect(wrapper).toMatchSnapshot();
  });

});
