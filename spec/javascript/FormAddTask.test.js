import React from 'react';
import  renderer from 'react-test-renderer'
import Enzyme, { mount, shallow, render } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import FormAddTask from '../../src/components/form-add-task/form-add-task';
import  utils from './utils'
const getDefaultProps = () => ({});
describe('Task #1 Task form component', () => {
    it('shallow renders without crashing', () => {
        const {} = getDefaultProps();
        shallow(<FormAddTask />);
    });
});
it('renders without crashing', () => {
    const FormTask = renderer.create(<FormAddTask />).toJSON()
    expect(FormTask).toMatchSnapshot();
});

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
it('check datepicker displayed', () => {
  const DateInputComponent = mount(<FormAddTask />).find(
      '#date'
  );
  expect(DateInputComponent.hasClass('form-control date')).toEqual(
      true
  );
});

it('check task field displayed', () => {
  const TaskInputComponent = mount(<FormAddTask />).find(
      '#task'
  );
  expect(TaskInputComponent.hasClass('form-control task')).toEqual(
      true
  );
});

it('check task duration selector field displayed', () => {
  const TaskDurInputComponent = mount(<FormAddTask />).find(
      '#sel1'
  );
  expect(TaskDurInputComponent.hasClass('form-control')).toEqual(
      true
  );
});

it('render date input correctly with null value', () => {
  const props = {
          value: null
      },
      DateInputComponent = mount(<FormAddTask { ...props } />).find(
          '#date'
      );
  expect(DateInputComponent.prop('value')).toEqual(undefined);
});

describe('Task #2 - add task', () => {

    it('is possible to add task', () => {
        const component = mount(<FormAddTask/>);
        const fieldTask = component.find('#task');
        fieldTask.value = 'Task';
        const dateTask = component.find('#date');
        dateTask.value = '2019-03-08';
        const durationTask = component.find('#sel1');
        durationTask.value = 'day';
        const addTaskButton = component.find('#addTask');
        addTaskButton.simulate('click');
        expect(utils.authorize()).toBe('token');
        expect(addTaskButton).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });

    it('check validation form', ()=>{
      const component = mount(<FormAddTask/>)
      const form = component.find('form')
      expect(form.instance().noValidate).toBe(false)
    })
})