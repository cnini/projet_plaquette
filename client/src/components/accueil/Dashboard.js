import React, { Component } from 'react'

import ListCours from '../cours/ListCours'
import ListTheme from '../theme/ListTheme'

export default class Dashboard extends Component {
    render() {
        return(
            <div>
                <ListCours/>
                <ListTheme/>
            </div>
        )
    }
    
}