import React, { Component } from 'react'
import axios from 'axios'

export default class CoursCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: ""
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/themes/r/theme/' + this.props.cours.theme)
            .then((res) => this.setState({ theme: res.data.nom }))
            .catch((error) => console.log(error))
    }

    displayActions() {
        if(window.location.pathname !== "/") {
            return(
                <div>
                    <a href={'/admin/cours/r/cours/' + this.props.cours._id}>Modifier</a>
                    <a href='/dashboard' onClick={() => this.props.deleteCours(this.props.cours._id)}>Supprimer</a>
                </div>
            )
        }
    }

    render() {
        return(
            <div className="card">
                <div className="card_annee">ÉSTIAM {this.props.cours.annee} (S{this.props.cours.semestre})</div>
                <h4>{this.props.cours.nom}</h4>
                <p>Thème {this.state.theme}, Crédits ECTS CCSN : {this.props.cours.credits_ccsn}, Crédits ECTS DAD : {this.props.cours.credits_dad}, Durée : {this.props.cours.duree} h
                </p>
                {this.displayActions()}
            </div>
        )
    }
}