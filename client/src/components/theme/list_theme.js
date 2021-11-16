import React, { Component } from 'react'
import axios from 'axios'

const Theme = (props) => (
    <tr>
        <td>{props.theme.theme_nom}</td>
        <td>
            <ul>
                <li><a href='/admin/theme' onClick={() => props.deleteTheme(props.theme._id)}>Supprimer</a></li>
            </ul>
        </td>
    </tr>
)

export default class ThemeList extends Component {
    constructor(props) {
        super(props)
        
        this.deleteTheme = this.deleteTheme.bind(this)

        this.state = { themes: [] }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/theme')
            .then( (response) => {
                this.setState({ themes: response.data })
            })
            .catch( (error) => console.log(error) )
    }

    deleteTheme(id) {
        axios
            .delete('http://localhost:8080/admin/theme/delete/' + id)
            .then( (response) => console.log(response.data) )

        this.setState({
            themes: this.state.themes.filter((theme) => theme._id !== id)
        })
    }

    themeList() {
        return this.state.themes.map( (theme) => {
            return(
                <Theme
                    theme={theme}
                    deleteTheme={this.deleteTheme}
                    key={theme._id}
                />
            )
        })
    }

    render() {
        return(
            <div>
                <h3>Liste des thèmes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nom du thème</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{this.themeList()}</tbody>
                </table>
            </div>
        )
    }

}