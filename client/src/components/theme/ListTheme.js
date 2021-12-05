import React, { Component } from 'react'
import axios from 'axios'

import ThemeCard from './ThemeCard'
import NewTheme from './NewTheme'


export default class ListTheme extends Component {
    constructor(props) {
        super(props)
        
        this.deleteTheme = this.deleteTheme.bind(this)

        this.state = { themes: [] }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/themes')
            .then( (response) => {
                this.setState({ themes: response.data })
            })
            .catch( (error) => console.log(error) )
    }

    deleteTheme(id) {
        axios
            .delete('http://localhost:8080/admin/themes/d/theme/' + id)
            .then( (response) => console.log(response.data) )

        this.setState({
            themes: this.state.themes.filter((theme) => theme._id !== id)
        })
    }

    themeCards() {
        return this.state.themes.map( (theme) => {
            return(
                <ThemeCard
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
                <h1>Thèmes</h1>
                <div className="dashboard_section">
                    <div>
                        <NewTheme/>
                    </div>
                    <div>
                        <h3>Liste des thèmes</h3>
                        <div className="dashboard_themes">{this.themeCards()}</div>
                    </div>
                </div>
            </div>
        )
    }

}