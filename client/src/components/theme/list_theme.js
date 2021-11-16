import React, { Component } from 'react'
import axios from 'axios'

const Theme = (props) => (
    <tr>
        <td>{props.theme.theme_nom}</td>
    </tr>
)

export default class ThemeList extends Component {
    constructor(props) {
        super(props)

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

    themeList() {
        return this.state.themes.map( (theme) => {
            return(
                <Theme
                    theme={theme}
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
                        </tr>
                    </thead>
                    <tbody>{this.themeList()}</tbody>
                </table>
            </div>
        )
    }

}