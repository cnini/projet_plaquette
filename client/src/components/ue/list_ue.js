import React, { Component } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

const Ue = (props) => (
    <tr>
        <td>{props.ue.ue_code}</td>
        <td>{props.ue.ue_categorie}</td>
        <td>{props.ue.class_id}</td>
        <td>
            <ul>
                <li><a href={'/admin/ue/update/'+ props.ue._id}>Modifier</a></li>
                <li><a href="/admin/ue" onClick={() => props.deleteUe(props.ue._id)}>Supprimer</a></li>
            </ul>
        </td>
    </tr>
)

export default class UeList extends Component {
    constructor(props) {
        super(props)

        this.deleteUe = this.deleteUe.bind(this)

        this.state = { ues: [] }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/ue')
            .then( (response) => {
                this.setState({ues:response.data})
            })
            .catch( (error) => console.log(error) )
    }

    deleteUe(id) {
        axios
            .delete('http://localhost:8080/admin/ue/delete/' + id)
            .then( (response) => console.log(response.data) )

        this.setState({
            ues: this.state.ues.filter((ue) => ue._id !== id)
        })
    }

    ueList() {
        return this.state.ues.map( (ue) => {
            console.log(ue)
            return(
                <Ue
                    ue={ue}
                    deleteUe={this.deleteUe}
                    key={ue._id}
                />
            )
        })
    }

    render() {
        return (
            <div>
                <h3>Liste des UE</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Catégorie</th>
                            <th>Année</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{this.ueList()}</tbody>
                </table>
            </div>
        )
    }
}