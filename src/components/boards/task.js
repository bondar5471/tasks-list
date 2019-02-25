import React, { Component } from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'
const Container = styled.div`
  display: flex;
  margin: 10px;
  border: 1px solid black;
  border-radius: 2px;
  padding: 3px;
  background-color: ${props => (props.isDragging ? 'silver' : 'white') };
`;

const Handle = styled.div`
  width: 20px;
  height:20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;
export default class Task extends Component {
  render() {
    return (
      <Draggable 
        draggableId={this.props.task.id} 
        index={this.props.index}>
        {(provided, snapshot)=>(
          <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          >
          {this.props.task.content}
        </Container>
        )}
      </Draggable>
    )
  }
}
