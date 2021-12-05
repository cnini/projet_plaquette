import React, { Component } from 'react'
import axios from 'axios'

export default class ThemeOption extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            getThemes: []
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/themes')
            .then((res) => this.setState({ getThemes: res.data }))
            .catch((err) => console.log(err))
    }

    themeOptions() {
        return this.state.getThemes.map((theme) => {
            return(
                <option value={theme._id} key={theme._id}>{theme.nom}</option>
            )
        })
    }

    render() {
        return(
            <select
                value={this.props.selectedValue}
                onChange={(e) => this.props.onChangeTheme(e.target.value)}
            >
                <option value="0"></option>
                {this.themeOptions()}
            </select>
        )
    }
}