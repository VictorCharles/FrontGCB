import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'

class App extends Component {
  state = {
    items: []
  }
  
  
  getItems() {
    fetch('https://backgcb.herokuapp.com/medico')
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }
  
  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.crm === item.crm)
    const newArray = [
      
      ...this.state.items.slice(0, itemIndex),
      
      item,
      
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (crm) => {
    const updatedItems = this.state.items.filter(item => item.crm !== crm)
    this.setState({ items: updatedItems })
  }

  componentDidMount() {
    this.getItems()
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <img src= "https://media.glassdoor.com/sql/3403115/grupo-gcb-squarelogo-1610039914115.png" width = "100" height ="100" alt = "Logo da GCB"  ></img>          
            <h1 style={{ margin: "20px 0" }}>FRONT GCB</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Adicionar item" addItemToState={this.addItemToState} />
            {/* <ModalForm buttonLabel="Limpar Lixeira" addItemToState={this.limparLixeira} /> */}
          {/*   <ModalForm buttonLabel="Lixeira" addItemToState={this.getLixeira()} /> */}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App