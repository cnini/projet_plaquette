import React, { Component } from 'react'
import axios from 'axios'

export default class UpdateUe extends Component {
    constructor(props) {
        super(props)

        this.onChangeUeCode = this.onChangeUeCode.bind(this)
        this.onChangeUeCategorie = this.onChangeUeCategorie.bind(this)
        this.onChangeClass = this.onChangeClass.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            ue_code: "",
            ue_categorie: "",
            class_id: "",
            ues: []
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8080/admin/ue/'+ this.props.match.params.id)
            .then( (response) => {
                this.setState({
                    ue_code: response.data.ue_code,
                    ue_categorie: response.data.ue_categorie,
                    class_id: response.data.class_id
                })
            })
            .catch( (error) => console.log(error) )
    }

    onChangeUeCode(e) {
        this.setState({
            ue_code: e.target.value
        })
    }

    onChangeUeCategorie(e) {
        this.setState({
            ue_categorie: e.target.value
        })
    }

    onChangeClass(e) {
        this.setState({
            class_id: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const updatedUe = {
            ue_code: this.state.ue_code,
            ue_categorie: this.state.ue_categorie,
            class_id: this.state.class_id
        }

        axios
            .post('http://localhost:8080/admin/ue/update/'+ this.props.match.params.id, updatedUe)
            .then( (res) => console.log(res.data) )
    }

    render() {
        return(
            <div>
                <h3>Modifier l'UE {this.state.ue_code}</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <div>
                            <input
                                type="radio"
                                name="class_id"
                                value="e1"
                                checked={this.state.class_id === "e1"}
                                onChange={this.onChangeClass}
                            />
                            <label>E1</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="class_id"
                                value="e2"
                                checked={this.state.class_id === "e2"}
                                onChange={this.onChangeClass}
                            />
                            <label>E2</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="class_id"
                                value="e3"
                                checked={this.state.class_id === "e3"}
                                onChange={this.onChangeClass}
                            />
                            <label>E3</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="class_id"
                                value="e4"
                                checked={this.state.class_id === "e4"}
                                onChange={this.onChangeClass}
                            />
                            <label>E4</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="class_id"
                                value="e5"
                                checked={this.state.class_id === "e5"}
                                onChange={this.onChangeClass}
                            />
                            <label>E5</label>
                        </div>
                    </div>
                    <div>
                        <label>Code : </label>
                        <input
                            type="text"
                            name="ue_code"
                            value={this.state.ue_code}
                            onChange={this.onChangeUeCode}
                        />
                    </div>
                    <div>
                        <div>
                            <input
                                type="radio"
                                name="ue_categorie"
                                value="Core courses"
                                checked={this.state.ue_categorie === "Core courses"}
                                onChange={this.onChangeUeCategorie}
                            />
                            <label>Tronc commun</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="ue_categorie"
                                value="DAD"
                                checked={this.state.ue_categorie === "DAD"}
                                onChange={this.onChangeUeCategorie}
                            />
                            <label>DAD</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="ue_categorie"
                                value="CCSN"
                                checked={this.state.ue_categorie === "CCSN"}
                                onChange={this.onChangeUeCategorie}
                            />
                            <label>CCSN</label>
                        </div>
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Modifier l'UE"
                        />
                    </div>
                </form>
            </div>
        )
    }
}