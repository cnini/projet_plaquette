import React, { Component } from 'react'
import axios from 'axios'

import CoursCard from './CoursCard'
import NewCours from './NewCours'

export default class CoursList extends Component {
    constructor(props) {
        super(props)

        this.deleteCours = this.deleteCours.bind(this)

        this.state = {
            cours: [],
            getThemes: []
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/cours')
            .then( (response) => {
                this.setState({ cours: response.data })
            })
            .catch( (error) => console.log(error) )

        axios
            .get('http://localhost:8080/admin/themes')
            .then((res) => this.setState({ getThemes: res.data }))
            .catch((error) => console.log(error))
    }

    deleteCours(id) {
        axios
            .delete('http://localhost:8080/admin/cours/d/cours/' + id)
            .then( (response) => console.log(response.data) )

        this.setState({
            cours: this.state.cours.filter((cours) => cours._id !== id)
        })
    }

    coursCards() {
        return this.state.cours.map( (cours) => {
            return(
                <CoursCard
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
                <h1>Cours</h1>
                <div className="dashboard_section">
                    <div>
                        <NewCours/>
                    </div>
                    <div>
                        <h3>Liste des cours</h3>
                        <div className="dashboard_cards">{this.coursCards()}</div>
                    </div>
                </div>
            </div>
        )
    }

}