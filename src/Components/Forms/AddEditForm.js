import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends Component {
    state = {
        nome: '',
        crm: '',
        telefoneFixo: '',
        telefoneCelular: '',
        cep: '',
       especialidade1: '',
       especialidade2: '',
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => {
        e.preventDefault()
        fetch('https://backgcb.herokuapp.com/medico', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                telefoneFixo: this.state.telefoneFixo,
                telefoneCelular: this.state.telefoneCelular,
                crm: this.state.crm,
                cep: this.state.cep,
            })
        })
            .then(response1 => {
                if (response1.ok) {
                    fetch(`https://backgcb.herokuapp.com/medico/espe`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            especialidade: this.state.especialidade1,
                            med_crm: this.state.crm,
                        })
                    })
                        .then(response2 => {
                            if (response2.ok) {
                                fetch(`https://backgcb.herokuapp.com/medico/espe`, {
                                    method: 'post',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        especialidade: this.state.especialidade2,
                                        med_crm: this.state.crm,
                                    })
                                })
                                    .then(response3 => {
                                        if (response3.ok) {
                                            window.location.reload()
                                        } else {
                                            alert("Erro")
                                        }
                                    })
                            } else {
                                alert("Erro")
                            }
                        })
                } else {
                    alert("Erro")
                }
            })


            .catch(err => console.log(err))

    }

    submitFormEdit = e => {
        e.preventDefault()
        fetch(`https://backgcb.herokuapp.com/medico/${this.state.crm}/update`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                telefoneFixo: this.state.telefoneFixo,
                telefoneCelular: this.state.telefoneCelular,
                cep: this.state.cep,
               
                crm: this.state.crm
            })
        })
        .then(response1 => {
            if (response1.ok) {
                fetch(`https://backgcb.herokuapp.com/medico/espe`, {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        
                        med_crm: this.state.crm,
                    })
                })
                    .then(response2 => {
                        if (response2.ok) {
                            fetch(`https://backgcb.herokuapp.com/medico/espe`, {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    especialidade: this.state.especialidade1,
                                    med_crm: this.state.crm,
                                })
                            })
                                .then(response3 => {
                                    if (response3.ok) {
                                        fetch(`https://backgcb.herokuapp.com/medico/espe`, {
                                            method: 'post',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                especialidade: this.state.especialidade2,
                                                med_crm: this.state.crm,
                                            })
                                        })
                                            .then(response4 => {
                                                if (response4.ok) {
                                                    window.location.reload()
                                                } else {
                                                    alert("Erro")
                                                }
                                            })
                                    } else {
                                        alert("Erro")
                                    }
                                })
                        } else {
                            alert("Erro")
                        }
                    })
            } else {
                alert("Erro")
            }
        })


    }

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const { nome, crm, telefone, cidade, estado, especialidade } = this.props.item
            this.setState({ nome, crm, telefone, cidade, estado, especialidade })
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" name="nome" id="nome" onChange={this.onChange} value={this.state.nome === null ? '' : this.state.nome} />
                </FormGroup>
                <FormGroup>
                    <Label for="crm">CRM</Label>
                    <Input type="text" name="crm" id="crm" onChange={this.onChange} value={this.state.crm === null ? '' : this.state.crm} placeholder="ex. 12345678" />
                </FormGroup>
                <FormGroup>
                    <Label for="telefoneFixo">Telefone Fixo</Label>
                    <Input type="text" name="telefoneFixo" id="telefoneFixo" onChange={this.onChange} value={this.state.telefoneFixo === null ? '' : this.state.telefoneFixo} placeholder="ex. 1140028922" />
                </FormGroup>
                <FormGroup>
                    <Label for="telefoneCelular">telefone Celular</Label>
                    <Input type="text" name="telefoneCelular" id="telefoneCelular" onChange={this.onChange} value={this.state.telefoneCelular === null ? '' : this.state.telefoneCelular} placeholder="ex. 11940028922" />
                </FormGroup>
                <FormGroup>
                    <Label for="cep">CEP</Label>
                    <Input type="text" name="cep" id="cep" onChange={this.onChange} value={this.state.cep === null ? '' : this.state.cep} />
                </FormGroup>

                <FormGroup>
                    <Label for="especialiades">Especialidade</Label>
                    <br></br>
                    <select id="especialidade1" name="especialidade1" onChange={this.onChange}>
                        <option value=""> SEM ESPECIALIDADE</option>
                        <option value="ALERGOLOGIA"> ALERGOLOGIA </option>
                        <option value="ANGIOLOGIA"> ANGIOLOGIA </option>
                        <option value="BUCO MAXILO"> BUCO MAXILO </option>
                        <option value="CARDIOLOGIA CLINICA"> CARDIOLOGIA CLINICA </option>
                        <option value="CARDIOLOGIA INFANTIL"> CARDIOLOGIA INFANTIL </option>
                        <option value="CIRURGIA CABEÇA E PESCOÇO"> CIRURGIA CABEÇA E PESCOÇO </option>
                        <option value="CIRURGIA CARDIACA"> CIRURGIA CARDIACA </option>
                        <option value="CIRURGIA DE TORAX"> CIRURGIA DE TORAX </option>
                    </select>
                    <select id="especialidade2" name="especialidade2" onChange={this.onChange}>
                        <option value=""> SEM 2° ESPECIALIDADE</option>
                        <option value="ALERGOLOGIA"> ALERGOLOGIA </option>
                        <option value="ANGIOLOGIA"> ANGIOLOGIA </option>
                        <option value="BUCO MAXILO"> BUCO MAXILO </option>
                        <option value="CARDIOLOGIA CLINICA"> CARDIOLOGIA CLINICA </option>
                        <option value="CARDIOLOGIA INFANTIL"> CARDIOLOGIA INFANTIL </option>
                        <option value="CIRURGIA CABEÇA E PESCOÇO"> CIRURGIA CABEÇA E PESCOÇO </option>
                        <option value="CIRURGIA CARDIACA"> CIRURGIA CARDIACA </option>
                        <option value="CIRURGIA DE TORAX"> CIRURGIA DE TORAX </option>
                    </select>
                </FormGroup>

                <Button>Enviar</Button>
            </Form>
        );
    }
}

export default AddEditForm
