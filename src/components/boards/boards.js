import React, { Component } from 'react'
import initialData from '../boards/initial-data'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Column from '../boards/column'

const Container = styled.div`
  display: flex;
`;

export default class Boards extends Component {
  state = initialData
 
  onDragEnd = result => {
    document.body.style.color = 'inherit';
    const {destination, source, draggableId, type} = result;
    if(!destination) {
      return
    }

    if(
      destination.dropableId === source.dropableId &&
      destination.index === source.index
    )
    {
      return
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      }
      this.setState(newState)
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]
    
    if(start === finish) {
      debugger
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      
      const newColumn ={
        ...start,
        taskIds: newTaskIds,

      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }
      this.setState(newState)
      return;
      } 
    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }; 

    const finishTaskIds = Array.from(finish.taskIds) 
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish ={
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      },
    }
    this.setState(newState)
  }

  render() {
    return( 
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column">
          {(provided) => (
            <Container
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
            {this.state.columnOrder.map((columnId, index) =>{
            const column = this.state.columns[columnId]
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

            return ( <Column 
                      key={column.id} 
                      column={column} 
                      tasks={tasks} 
                      index={index}
                    />)
            })}
             {provided.placeholder}
          </Container>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}