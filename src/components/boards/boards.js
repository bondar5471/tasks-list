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
    this.addList = this.addList.bind(this);
    this.addCard = this.addCard.bind(this);

  }
  
  componentDidMount() {
    const token = localStorage.getItem("token")

    let config = {
      headers: {'Authorization': "bearer " + token}
    };

    axios.get('http://localhost:3000/api/lists', config).then(response => {
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
    const token = localStorage.getItem("token")

    let config = {
      headers: {'Authorization': "bearer " + token}
    };
    const data = {name: params.title}

    axios.post('http://localhost:3000/api/lists', data, config )
    .then(response => {
      const list = [...this.state.lanes, response.data]
      this.setState({lanes: list })
    })
  }
  deleteLane(laneId){
    const token = localStorage.getItem("token")

    let config = {
      headers: {'Authorization': "bearer " + token}
    };

    axios.delete(`http://localhost:3000/api/lists/${laneId}`, config)
    .then(response => {

      const lanes = this.state.lanes.filter(
        lane => lane.id !== laneId
      )
      this.setState({lanes})
    })
    .catch(error => console.log(error))

  }
  addCard(card, laneId) {
    const token = localStorage.getItem("token")

    let config = {
      headers: {'Authorization': "bearer " + token}
    };
    const data = {
      card: {...card,list_id: laneId}
    }

    axios.post(`http://localhost:3000/api/cards`, data, config)
    .then(response => {
      const list = [...this.state.lanes.cards, response.data]
      this.setState({lanes: list })
    })
  }
  deleteCard(cardId){
    const token = localStorage.getItem("token")

    let config = {
      headers: {'Authorization': "bearer " + token}
    };

    axios.delete(`http://localhost:3000/api/cards/${cardId}`, config)
    .then(response => {
      const cards = this.state.lanes.cards.filter(
        card => card.id !== cardId
      )
      this.setState({lanes: cards})
    })
    .catch(error => console.log(error))
  }

  cardDragg(cardId, sourceLaneId, targetLaneId, position, cardDetails) {
    const data = {cardId, 
                   cardDetails,
                   list_id: targetLaneId, 
                   position: position+1} //fix lib error card last position
    axios.patch(`http://localhost:3000/api/cards/${cardId}/move`,data)
  }

  lineDragg(laneId, newPosition, payload) {
    let id = payload.id
    let position = newPosition +1 //fix lib error position 0
    const data = {position: position}
   axios.patch(`http://localhost:3000/api/lists/${id}/move`,data)
 }
 
  render() {
    const {lanes} = this.state

    return <Board data={{lanes}} 
                  draggable
                  editable
                  canAddLanes
                  onLaneAdd={this.addList}
                  onCardAdd={this.addCard}
                  onCardDelete={this.deleteCard}
                  removeLane={this.deleteLane}
                  handleDragEnd={this.cardDragg}
                  handleLaneDragEnd={this.lineDragg}
                  />          
  }
}

