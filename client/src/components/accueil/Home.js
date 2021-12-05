import React, { Component } from 'react'
import axios from 'axios'

import CoursCard from '../cours/CoursCard'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.onChangeCoursAnnee = this.onChangeCoursAnnee.bind(this)
        this.onChangeTheme = this.onChangeTheme.bind(this)
        
        this.state = {
            annee: "",
            theme: "",
            cours: [],
            getCours: [],
            getTheme: [],
            nbAnnees: ["1","2","3","4","5"],
            spes: ["Data & Application Design", "Cloud, Systems, Networks & Cyber security"]
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/cours')
            .then((res) => this.setState({ getCours: res.data }))
            .catch((error) => console.log(error) )

        axios
            .get('http://localhost:8080/admin/themes')
            .then((res) => this.setState({ getTheme: res.data }))
            .catch((error) => console.log(error) )

    }

    onChangeCoursAnnee(nb) {
        this.setState({
            annee: nb,
            theme: "",
            cours: this.state.getCours.filter((c) => c.annee === nb)
        })
    }

    onChangeTheme(id) {
        this.setState({
            theme: id,
            cours: this.state.getCours.filter((c) => c.theme === id && c.annee === this.state.annee)
        })
    }

    anneeRadio() {
        return this.state.nbAnnees.map((annee) => {
            return(
                <div key={annee}>
                    <input
                        type="radio"
                        name="annee"
                        value={annee}
                        checked={this.state.annee === annee ? true : false}
                        onChange={(e) => this.onChangeCoursAnnee(e.target.value)}
                    />
                    <label>E{annee}</label>
                </div>
            )
        })
    }

    themeRadio() {
        return this.state.getTheme.map((theme) => {
            return(
                <div key={theme._id}>
                    <input
                        type="radio"
                        name="theme"
                        value={theme._id}
                        checked={this.state.theme === theme._id ? true : false}
                        onChange={(e) => this.onChangeTheme(e.target.value)}
                    />
                    <label>{theme.nom}</label>
                </div>
            )
        })
    }

    coursCards() {
        return this.state.cours.map((cours) => {
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
                <div className="home_section">
                    <div>
                        <h2>Année</h2>
                        <div>{this.anneeRadio()}</div>
                    </div>
                    <div>
                        <h2>Thème</h2>
                        <div>{this.themeRadio()}</div>
                    </div>
                    </div>
                <div>
                    <h2>Liste des cours</h2>
                    <div className="home_cards">{this.coursCards()}</div>
                </div>
            </div>
        )
    }
}