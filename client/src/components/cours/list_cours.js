import React, { Component } from 'react'
import axios from 'axios'

const Cours = (props) => (
    <tr>
        <td>{props.cours.cours_code}</td>
        <td>{props.cours.cours_old_code}</td>
        <td>{props.cours.cours_nom}</td>
        <td>{props.cours.cours_credits}</td>
        <td>{props.cours.cours_semestre}</td>
        <td>{props.cours.cours_duree}</td>
        <td>
            <ul>
                <li><a href='/admin/cours' onClick={() => props.deleteCours(props.cours._id)}>Supprimer</a></li>
            </ul>
        </td>
    </tr>
)

export default class CoursList extends Component {
    constructor(props) {
        super(props)

        this.deleteCours = this.deleteCours.bind(this)

        this.state = { cours: [] }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/cours')
            .then( (response) => {
                this.setState({ cours: response.data })
            })
            .catch( (error) => console.log(error) )
    }

    deleteCours(id) {
        axios
            .delete('http://localhost:8080/admin/cours/delete/' + id)
            .then( (response) => console.log(response.data) )

        this.setState({
            cours: this.state.cours.filter((cours) => cours._id !== id)
        })
    }

    coursList() {
        return this.state.cours.map( (cours) => {
            return(
                <Cours
                    cours={cours}
                    deleteCours={this.deleteCours}
                    key={cours._id}
                />
            )
        })
    }

    render() {
        return(
            <div>
                <h3>Liste des cours</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Code ECTS</th>
                            <th>Ancien code</th>
                            <th>Nom du cours</th>
                            <th>Crédits ECTS</th>
                            <th>Semestre</th>
                            <th>Durée (h)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{this.coursList()}</tbody>
                </table>
            </div>
        )
    }

}