import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  limparLixeira = crm => {
    let confirmClear = window.confirm('Esvaziar lixeira?')
    if (confirmClear) {
      fetch(`https://backgcb.herokuapp.com/medico/delete`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          crm
        })
      })
        .then(response => response.json())
        .then(item => {
          console.log(item)
          this.props.deleteItemFromState(crm)
          window.location.reload()
        })
        .catch(err => console.log(err))


    }

  }
  deleteItem = crm => {
    let confirmDelete = window.confirm('Mover medico para a lixeira?')
    if (confirmDelete) {
      fetch(`https://backgcb.herokuapp.com/medico/${crm}/soft`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          crm
        })
      })
        .then(response => response.json())
        .then(item => {
          console.log(item)
          this.props.deleteItemFromState(crm)
          window.location.reload()
        })
        .catch(err => console.log(err))
        


    }


  }

  render() {

    const items = this.props.items.map(item => {

      return (
        <tr>
          <td>{item.nome}</td>
          <td>{item.crm}</td>
          <td>{item.telefoneFixo}</td>
          <td>{item.telefoneCelular}</td>
          <td>{item.cep}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm buttonLabel="Editar" item={item} updateState={this.props.updateState} />
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.crm)}>Lixeira</Button>
            </div>
          </td>
        </tr>
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CRM</th>
            <th>Fixo</th>
            <th>Celular</th>
            <th>CEP</th>
            {/* <th>Especialidade</th>  falta arrumar certas coisas em meio ao front relacionado ao get do relacionamento*/}
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable