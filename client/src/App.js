import React from 'react'

import { Routes,Route } from 'react-router-dom'

import ListUe from './components/list_ue'
import NewUe from './components/new_ue'

const App = () => {
    return(
        <div>
            <Routes>
                <Route path="/admin/ue/add" element={<NewUe />} />
                <Route exact path="/admin/ue/" element={<ListUe />} />
            </Routes>
        </div>
    )
}

export default App