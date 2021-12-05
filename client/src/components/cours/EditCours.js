import React, { Component } from 'react'
import axios from 'axios'

import ThemeOption from '../theme/ThemeOption'

export default class EditCours extends Component {
    constructor(props) {
        super(props)

        this.onChangeCoursAnnee = this.onChangeCoursAnnee.bind(this)
        this.onChangeCoursSemestre = this.onChangeCoursSemestre.bind(this)
        this.onChangeCoursNom = this.onChangeCoursNom.bind(this)
        this.onChangeTheme = this.onChangeTheme.bind(this)
        this.onChangeCoursCredits = this.onChangeCoursCredits.bind(this)
        this.onChangeCoursDuree = this.onChangeCoursDuree.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
        
        this.state = {
            id: (window.location.pathname).split('/')[5],
            annee: "0",
            semestre: 0,
            nom: "",
            credits: 0,
            duree: 0,
            theme: "",
            nbAnnees: ["1","2","3","4","5"],
            getThemes: []
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/cours/r/cours/'+ this.state.id)
            .then( (res) => this.setState({
                annee: res.data.annee,
                semestre: res.data.semestre,
                nom: res.data.nom,
                credits: res.data.credits,
                duree: res.data.duree,
                theme: res.data.theme
            }) )
            .catch( (error) => console.log(error) )
    }

    onChangeCoursAnnee(nb) {
        this.setState({
            annee: nb
        })
    }

    onChangeCoursNom(e) {
        this.setState({
            nom: e.target.value
        })
    }

    onChangeCoursCredits(e) {
        this.setState({
            credits: e.target.value
        })
    }

    onChangeCoursSemestre(e) {
        this.setState({
            semestre: e.target.value
        })
    }

    onChangeCoursDuree(e) {
        this.setState({
            duree: e.target.value
        })
    }

    onChangeTheme(id) {
        this.setState({
            theme: id
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const cours = {
            annee: this.state.annee,
            semestre: this.state.semestre,
            nom: this.state.nom,
            credits: this.state.credits,
            duree: this.state.duree,
            theme: this.state.theme
        }

        axios
            .put("http://localhost:8080/admin/cours/u/cours/" + this.state.id, cours)
            .then( (res) => console.log(res.data) )
        
        this.setState({
            annee: "0",
            semestre: 0,
            nom: "",
            credits: 0,
            duree: 0,
            theme: ""
        })

        window.location.pathname = "/admin"
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
                <h3>Modifier ce cours</h3>
                <form onSubmit={this.onSubmit}>
                <div>
                        <label>Année ESTIAM : </label>
                        {this.anneeRadio()}
                    </div>
                    <div>
                        <label>Semestre : </label>
                        <input
                            type="number"
                            name="semestre"
                            min="1"
                            max="2"
                            value={this.state.semestre}
                            onChange={this.onChangeCoursSemestre}
                        />
                    </div>
                    <div>
                        <label>Nom du cours : </label>
                        <input
                            type="text"
                            name="nom"
                            value={this.state.nom}
                            onChange={this.onChangeCoursNom}
                        />
                    </div>
                    <div>
                        <label>Crédits ECTS : </label>
                        <input
                            type="number"
                            name="credits"
                            min="0"
                            value={this.state.credits}
                            onChange={this.onChangeCoursCredits}
                        />
                    </div>
                    <div>
                        <label>Durée (h) : </label>
                        <input
                            type="number"
                            name="duree"
                            min="0"
                            value={this.state.duree}
                            onChange={this.onChangeCoursDuree}
                        />
                    </div>
                    <ThemeOption selectedValue={this.state.theme} themes={this.props.getThemes} onChangeTheme={this.onChangeTheme} />
                    <div>
                        <input
                            type="submit"
                            value="Modifier"
                        />
                    </div>
                </form>
            </div>
        )
    }

}