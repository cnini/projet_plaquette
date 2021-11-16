import React from 'react'

import { Routes,Route } from 'react-router-dom'

// UEs
import ListUe from './components/ue/list_ue'
import NewUe from './components/ue/new_ue'

// Thèmes / Blocs
import ListTheme from './components/theme/list_theme'
import NewTheme from './components/theme/new_theme'

// Cours
import ListCours from './components/cours/list_cours'
import NewCours from './components/cours/new_cours'

const App = () => {
    return(
        <div>
            <Routes>
                {/* UEs */}
                <Route exact path="/admin/ue/" element={<ListUe />} />
                <Route path="/admin/ue/add" element={<NewUe />} />

                {/* Thèmes / Blocs */}
                <Route exact path="/admin/theme/" element={<ListTheme />} />
                <Route path="/admin/theme/add" element={<NewTheme />} />

                {/* Cours */}
                <Route exact path="/admin/cours/" element={<ListCours />} />
                <Route path="/admin/cours/add" element={<NewCours />} />
            </Routes>
        </div>
    )
}

export default App