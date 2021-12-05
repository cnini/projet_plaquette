import React, { Component } from 'react'

import { Routes,Route } from 'react-router-dom'

import Home from './components/accueil/Home'
import Dashboard from './components/accueil/Dashboard'
import EditCours from './components/cours/EditCours'
import EditTheme from './components/theme/EditTheme'
import './App.css'

export default class App extends Component {
    render() {
        return(
            <div>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/admin/cours/r/cours/:id" element={<EditCours/>} />
                    <Route path="/admin/themes/r/theme/:id" element={<EditTheme/>} />
                </Routes>
            </div>
        )
    }
    
}