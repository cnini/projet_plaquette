import React, { Component } from "react"
import axios from 'axios'

export default class NewTheme extends Component {
    constructor(props) {
        super(props)

        this.onChangeThemeNom = this.onChangeThemeNom.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            theme_nom: ""
        }
    }

    onChangeThemeNom(e) {
        this.setState({
            theme_nom: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        console.log(this.state)

        const newTheme = {
            theme_nom: this.state.theme_nom
        }

        axios
            .post("http://localhost:8080/admin/theme/add", newTheme)
            .then( (res) => console.log(res.data) )
        
        this.setState({
            theme_nom: "",
        })
    }

    render() {
        return(
            <div>
                <h3>Ajouter un nouveau thème</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Nom du thème: </label>
                        <input
                            type="text"
                            name="theme_nom"
                            value={this.state.theme_nom}
                            onChange={this.onChangeThemeNom}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Créer le thème"
                        />
                    </div>
                </form>
            </div>
        )
    }
}