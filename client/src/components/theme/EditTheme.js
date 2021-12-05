import React, { Component } from 'react'
import axios from 'axios'

export default class EditTheme extends Component {
    constructor(props) {
        super(props)

        this.onChangeThemeNom = this.onChangeThemeNom.bind(this)

        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            nom: "",
            id: (window.location.pathname).split('/')[5]
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/themes/r/theme/'+ this.state.id)
            .then( (res) => this.setState({ nom: res.data.nom, ues: res.data.ues }) )
            .catch( (error) => console.log(error) )
    }

    onChangeThemeNom(e) {
        this.setState({
            nom: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const updatedTheme = {
            nom: this.state.nom,
            ues: this.state.ues
        }

        axios
            .put('http://localhost:8080/admin/themes/u/theme/'+ this.state.id, updatedTheme)
            .then( (res) => {
                console.log(res.data)
                console.log('Thème à jour !')
            })
            .catch( (error) => console.log(error) )

        window.location.pathname = "/dashboard"
    }

    render() {
        return(
            <div>
                <h3>Modifier ce thème</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Nom du thème : </label>
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
                            value="Modifier"
                        />
                    </div>
                </form>
            </div>
        )
    }

}