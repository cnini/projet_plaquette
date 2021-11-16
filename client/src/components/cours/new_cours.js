import React, { Component } from "react"
import axios from 'axios'

export default class NewCours extends Component {
    constructor(props) {
        super(props)

        this.onChangeCoursCode = this.onChangeCoursCode.bind(this)
        this.onChangeCoursOldCode = this.onChangeCoursOldCode.bind(this)
        this.onChangeCoursNom = this.onChangeCoursNom.bind(this)
        this.onChangeCoursCredits = this.onChangeCoursCredits.bind(this)
        this.onChangeCoursSemestre = this.onChangeCoursSemestre.bind(this)
        this.onChangeCoursDuree = this.onChangeCoursDuree.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            cours_code: "",
            cours_old_code: "",
            cours_nom: "",
            cours_credits: 0,
            cours_semestre: 0,
            cours_duree: 0
        }
    }

    onChangeCoursCode(e) {
        this.setState({
            cours_code: e.target.value
        })
    }

    onChangeCoursOldCode(e) {
        this.setState({
            cours_old_code: e.target.value
        })
    }

    onChangeCoursNom(e) {
        this.setState({
            cours_nom: e.target.value
        })
    }

    onChangeCoursCredits(e) {
        this.setState({
            cours_credits: e.target.value
        })
    }

    onChangeCoursSemestre(e) {
        this.setState({
            cours_semestre: e.target.value
        })
    }

    onChangeCoursDuree(e) {
        this.setState({
            cours_duree: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        console.log(this.state)

        const newCours = {
            cours_code: this.state.cours_code,
            cours_old_code: this.state.cours_old_code,
            cours_nom: this.state.cours_nom,
            cours_credits: this.state.cours_credits,
            cours_semestre: this.state.cours_semestre,
            cours_duree: this.state.cours_duree
        }

        axios
            .post("http://localhost:8080/admin/cours/add", newCours)
            .then( (res) => console.log(res.data) )
        
        this.setState({
            cours_code: "",
            cours_old_code: "",
            cours_nom: "",
            cours_credits: 0,
            cours_semestre: 0,
            cours_duree: 0
        })
    }

    render() {
        return(
            <div>
                <h3>Ajouter un nouveau cours</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Code ECTS : </label>
                        <input
                            type="text"
                            name="cours_code"
                            value={this.state.cours_code}
                            onChange={this.onChangeCoursCode}
                        />
                    </div>
                    <div>
                        <label>Ancien code : </label>
                        <input
                            type="text"
                            name="cours_old_code"
                            value={this.state.cours_old_code}
                            onChange={this.onChangeCoursOldCode}
                        />
                    </div>
                    <div>
                        <label>Nom du cours : </label>
                        <input
                            type="text"
                            name="cours_nom"
                            value={this.state.cours_nom}
                            onChange={this.onChangeCoursNom}
                        />
                    </div>
                    <div>
                        <label>Crédits ECTS : </label>
                        <input
                            type="number"
                            name="cours_credits"
                            value={this.state.cours_credits}
                            onChange={this.onChangeCoursCredits}
                        />
                    </div>
                    <div>
                        <label>Semestre : </label>
                        <input
                            type="number"
                            name="cours_semestre"
                            value={this.state.cours_semestre}
                            onChange={this.onChangeCoursSemestre}
                        />
                    </div>
                    <div>
                        <label>Durée (h) : </label>
                        <input
                            type="number"
                            name="cours_duree"
                            value={this.state.cours_duree}
                            onChange={this.onChangeCoursDuree}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Créer le cours"
                        />
                    </div>
                </form>
            </div>
        )
    }
}