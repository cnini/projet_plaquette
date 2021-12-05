import React, { Component } from 'react'

import ListCompetence from '../competence/ListCompetence'
import ListCours from '../cours/ListCours'
import ListTheme from '../theme/ListTheme'

export default class Dashboard extends Component {
    render() {
        return(
            <div>
                <ListCompetence/>
                <ListCours/>
                <ListTheme/>
            </div>
        )
    }
    
}