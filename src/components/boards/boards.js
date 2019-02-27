import React from 'react'
import Board from 'react-trello'
import axios from 'axios'
import './boards.css'
export default class Boards extends React.Component {
  
  constructor (props){
    super(props)
    this.state = {
      lanes: []
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:3000/api/lists').then(response => {
    this.setState({
      lanes: response.data.map(this._transformData)
    })  
    console.log(this.state.lanes)
  })
  .catch(error => console.log(error))
  }

  _transformData = (list) => {
    return {
      id: list.id,
      title: list.name,
      cards: list.cards
    };
  };

  addList(params) {
    const data = {name: params.title}
    axios.post('http://localhost:3000/api/lists',data)
  }

  deleteLane(laneId){
    //TO DO
    axios.delete(`http://localhost:3000/api/lists/${laneId}`)
  }

  addCard(card, laneId) {
    const data = {
      card: {...card,list_id: laneId}
    }
    axios.post(`http://localhost:3000/api/cards`,data)
  }

  deleteCard(cardId){
    axios.delete(`http://localhost:3000/api/cards/${cardId}`)
    
  }

  cardDragg(cardId, targetLaneId, position) {
     const data = {cardId, 
                   list_id: targetLaneId, 
                   position}
    axios.patch(`http://localhost:3000/api/cards/${cardId}/move`,data)
  }

  lineDragg(listId ,newPosition, payload) {
    let id = payload.id
    
    const data = {position: newPosition + 1, id: id}   //plus 1 lib position begin 0         
   axios.patch(`http://localhost:3000/api/lists/${id}/move`,data)
 }
 
 
  render() {
    const {lanes} = this.state

    return <Board data={{lanes}} 
                  draggable
                  editable
                  canAddLanes
                  collapsibleLanes
                  onLaneAdd={this.addList}
                  onCardAdd={this.addCard}
                  onCardDelete={this.deleteCard}
                  removeLane={this.deleteLane}
                  handleDragEnd={this.cardDragg}
                  handleLaneDragEnd={this.lineDragg}
                  />          
  }
}

