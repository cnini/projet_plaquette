import React, { Component } from 'react'

export default class ThemeCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nom: ""
        }
    }

    displayActions() {
        if(window.location.pathname !== "/") {
            return(
                <div>
                    <a href={'/admin/themes/r/theme/' + this.props.theme._id}>Modifier</a>
                    <a href='/dashboard' onClick={() => this.props.deleteTheme(this.props.theme._id)}>Supprimer</a>
                </div>
            )
        }
    }

    render() {
        return(
            <div className="theme">
                <h4>{this.props.theme.nom}</h4>
                {this.displayActions()}
            </div>
        )
    }
}