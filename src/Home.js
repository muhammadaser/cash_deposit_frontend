import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Link } from "react-router-dom";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            dataAccount: [],
            message: ""
        };
        // this.handleInputChange = this.handleInputChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        axios.get(`http://localhost:8080/cash-deposit/v1/accounts`)
            .then(response => {
                if (response.data.code && response.data.code === 200) {
                    this.setState({
                        dataAccount : response.data.data
                    })
                }else{
                    this.setState({
                        message : response.data.message
                    })
                }
            })
            // .catch(function (error) {
            //     // handle error
            //     console.log(error);
            // })
    }
    // handleInputChange(event) {
    //     const target = event.target;

    //     this.setState({
    //         [target.name]: target.value
    //     });
    // }
    // handleSubmit(event) {
    //     alert('Your favorite flavor is: ' + this.state.search);
    //     event.preventDefault();
    // }
    render() {
        return (
            <div className="App">
                {/* <form onSubmit={this.handleSubmit}>
                    <label>
                        Account Number:<br />
                        <input type="text" name="search" 
                            value={this.state.search} 
                            onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Search" />
                </form> */}
                <p className="text-left"><Link to="/new-account">New Account</Link></p>
                <table>
                    <tbody>
                        <tr>
                            <th>Account Number</th>
                            <th>Full Name</th>
                            <th>Action</th>
                        </tr>
                        {
                            this.state.dataAccount.map(function(value,i){
                                return <tr key={i}>
                                    <td>{value.account_id}</td>
                                    <td>{value.first_name} {value.last_name}</td>
                                    <td>
                                        <Link to={"/"+value.account_id+"/detail"}>Detail</Link>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Home;
