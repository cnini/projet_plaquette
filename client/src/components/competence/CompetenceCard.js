import React, { Component } from 'react'
import axios from 'axios'

export default class CompetenceCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: ""
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/themes/r/theme/' + this.props.competence.theme)
            .then((res) => this.setState({ theme: res.data.nom }))
            .catch((error) => console.log(error))
    }

    displayActions() {
        if(window.location.pathname !== "/") {
            return(
                <div>
                    <a href={'/admin/competences/r/competence/' + this.props.competence._id}>Modifier</a>
                    <a href='/dashboard' onClick={() => this.props.deleteCompetence(this.props.competence._id)}>Supprimer</a>
                </div>
            )
        }
    }

    render() {
        return(
            <div className="card">
                <div className="card_annee">ÉSTIAM {this.props.competence.annee}</div>
                <h4>{this.props.competence.libelle}</h4>
                <p>Thème {this.state.theme}
                </p>
                {this.displayActions()}
            </div>
        )
    }
}