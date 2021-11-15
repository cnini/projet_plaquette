import React, { Component } from 'react'
import axios from 'axios'

const Ue = (props) => {
    <tr>
        <td>{props.ue.ue_code}</td>
        <td>{props.ue.ue_categorie}</td>
        <td>{props.ue.class_id}</td>
    </tr>
}

export default class UeList extends Component {
    constructor(props) {
        super(props)

        this.state = { ues: [] }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/ue/')
            .then( (response) => {
                this.setState({ ues: response.data })
            })
            .catch( (error) => console.log(error) )
    }

    ueList() {
        return this.state.ues.map( (ue) => {
            return(
                <Ue
                    ue={ue}
                    key={ue._id}
                />
            )
        })
    }

    render() {
        return(
            <div>
                <h3>Liste des UE</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Catégorie</th>
                            <th>Année ÉSTIAM</th>
                        </tr>
                    </thead>
                    <tbody>{this.ueList()}</tbody>
                </table>
            </div>
        )
    }
}