import React, { Component } from "react"
import axios from 'axios'

export default class NewTheme extends Component {
    constructor(props) {
        super(props)

        this.onChangeThemeNom = this.onChangeThemeNom.bind(this)

        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            nom: ""
        }
    }

    // Méthode pour le this.state
    onChangeThemeNom(e) {
        this.setState({
            nom: e.target.value
        })
    }

    // Méthode d'ajout à la validation du formulaire
    onSubmit(e) {
        e.preventDefault()

        const newTheme = {
            nom: this.state.nom,
            ues: this.state.ues
        }

        axios
            .post("http://localhost:8080/admin/themes/add", newTheme)
            .then( (res) => console.log(res.data) )
        
        this.setState({
            nom: "",
            ues: []
        })

        window.location.pathname = "/dashboard"
    }

    // Rendu HTML
    render() {
        return(
            <div>
                <h3>Ajouter un nouveau thème</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Nom du thème: </label>
                        <input
                            type="text"
                            name="nom"
                            value={this.state.nom}
                            onChange={this.onChangeThemeNom}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Créer"
                        />
                    </div>
                </form>
            </div>
        )
    }
}