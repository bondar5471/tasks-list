import React, {Component} from 'react'
import styled from 'styled-components'
import Task from '../boards/task'
import {Droppable, Draggable} from 'react-beautiful-dnd'
const Container = styled.div`
  margin: 10px;
  border: 1px solid black;
  width: 220px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-align: center;
`;
const TaskList = styled.div`
  background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'white') };
  flex-grow: 1;
  transition: background-color 0.2s ease
  min-height: 200px;
`;

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    if(nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }
  render() {
   return this.props.tasks.map((task, index) =>( 
    <Task key={task.id} task={task} index={index} />))
  }
}

export default class Column extends Component {
  render() {
    return(
      <Draggable 
        draggableId={this.props.column.id}
        index={this.props.index}>
        {(provided) => (
          <Container 
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>
            {this.props.column.title}
          </Title>
          <Droppable droppableId={this.props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
              <InnerList tasks={this.props.tasks} />
              {provided.placeholder}
            </TaskList>
            )}
          </Droppable>
        </Container>
        )}
      </Draggable>
    )
    
  }
}
