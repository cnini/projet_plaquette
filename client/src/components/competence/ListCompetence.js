import React, { Component } from 'react'
import axios from 'axios'

import CompetenceCard from './CompetenceCard'
import NewCompetence from './NewCompetence'

export default class ListCompetence extends Component {
    constructor(props) {
        super(props)

        this.deleteCompetence = this.deleteCompetence.bind(this)

        this.state = {
            competences: [],
            getThemes: []
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/competences')
            .then( (response) => {
                this.setState({ competences: response.data })
            })
            .catch( (error) => console.log(error) )

        axios
            .get('http://localhost:8080/admin/themes')
            .then((res) => this.setState({ getThemes: res.data }))
            .catch((error) => console.log(error))
    }

    deleteCompetence(id) {
        axios
            .delete('http://localhost:8080/admin/competences/d/competence/' + id)
            .then( (response) => console.log(response.data) )

        this.setState({
            cours: this.state.competences.filter((competence) => competence._id !== id)
        })
    }

    competenceCards() {
        return this.state.competences.map( (competence) => {
            return(
                <CompetenceCard
                    competence={competence}
                    deleteCompetence={this.deleteCompetence}
                    key={competence._id}
                />
            )
        })
    }

    render() {
        return(
            <div>
                <h1>Compétences</h1>
                <div className="dashboard_section">
                    <div>
                        <NewCompetence/>
                    </div>
                    <div>
                        <h3>Liste des compétences</h3>
                        <div className="dashboard_cards">{this.competenceCards()}</div>
                    </div>
                </div>
            </div>
        )
    }

}