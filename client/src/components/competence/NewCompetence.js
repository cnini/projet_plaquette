import React, { Component } from "react"
import axios from 'axios'

import ThemeOption from '../theme/ThemeOption'

export default class NewCompetence extends Component {
    constructor(props) {
        super(props)

        this.onChangeCoursAnnee = this.onChangeCoursAnnee.bind(this)
        this.onChangeLibelle = this.onChangeLibelle.bind(this)
        this.onChangeTheme = this.onChangeTheme.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
        
        this.state = {
            annee: "0",
            libelle: "",
            theme: "",
            nbAnnees: ["1","2","3","4","5"],
            getThemes: []
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/themes')
            .then((res) => this.setState({ getThemes: res.data }))
            .catch((err) => console.log(err))
    }

    onChangeCoursAnnee(nb) {
        this.setState({
            annee: nb
        })
    }

    onChangeLibelle(e) {
        this.setState({
            libelle: e.target.value
        })
    }

    onChangeTheme(id) {
        this.setState({
            theme: id
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const competence = {
            annee: this.state.annee,
            libelle: this.state.libelle,
            theme: this.state.theme
        }

        axios
            .post("http://localhost:8080/admin/competences/add", competence)
            .then( (res) => console.log(res.data) )
        
        this.setState({
            annee: "0",
            libelle: "",
            theme: ""
        })

        window.location.pathname = "/dashboard"
    }

    anneeRadio() {
        return this.state.nbAnnees.map((annee) => {
            return(
                <div key={annee}>
                    <input
                        type="radio"
                        name="annee"
                        value={annee}
                        checked={(this.state.annee) === annee ? true : false}
                        onChange={(e) => this.onChangeCoursAnnee(e.target.value)}
                    />
                    <label>E{annee}</label>
                </div>
            )
        })
    }

    render() {
        return(
            <div>
                {console.log(this.state)}
                <h3>Ajouter une compétence</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Année ESTIAM : </label>
                        {this.anneeRadio()}
                    </div>
                    <div>
                        <label>Libellé : </label>
                        <input
                            type="text"
                            name="libelle"
                            value={this.state.libelle}
                            onChange={this.onChangeLibelle}
                        />
                    </div>
                    <ThemeOption selectedValue={this.state.theme} onChangeTheme={this.onChangeTheme} />
                    <div>
                        <input
                            type="submit"
                            value="Ajouter"
                        />
                    </div>
                </form>
            </div>
        )
    }
}