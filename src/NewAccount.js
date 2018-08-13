import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";


class NewAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            account:{
                account_id : "",
                first_name : "",
                last_name : "",
                email : "",
                phone_no : "",
                address : ""
            },
            message: "",
            success: false
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(e) {
        const field = e.target.name;
        let account = this.state.account;
        account[field] = e.target.value;
        this.setState({account});
    }
    handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:8080/cash-deposit/v1/accounts`,this.state.account)
        .then(response => {
            if (response.data.code && response.data.code === 200) {
                this.setState({
                    success : true
                })
            }else{
                this.setState({
                    message : response.data.message
                })
            }
        })
        
    }
    render() {
        if (this.state.success) {
            return <Redirect to={"/"+this.state.account.account_id + "/detail"} />
        }
        return (
            <div className="App">
                <p>
                    <Link to="/">Home</Link>
                </p> 
                <form onSubmit={this.handleSubmit} className="text-left">
                    <p>
                        <label>
                            Account ID:
                            <input type="text" name="account_id" 
                                value={this.state.account.account_id} 
                                onChange={this.handleInputChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            First Name:
                            <input type="text" name="first_name" 
                                value={this.state.account.first_name} 
                                onChange={this.handleInputChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Last Name:
                            <input type="text" name="last_name" 
                                value={this.state.account.last_name} 
                                onChange={this.handleInputChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Email:
                            <input type="email" name="email" 
                                value={this.state.account.email} 
                                onChange={this.handleInputChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Phone No:
                            <input type="text" name="phone_no" 
                                value={this.state.account.phone_no} 
                                onChange={this.handleInputChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Address:
                            <input type="text" name="address" 
                                value={this.state.account.address} 
                                onChange={this.handleInputChange} />
                        </label>
                    </p>
                    <p>
                    <input type="submit" value="Submit" />
                    </p>
                    
                </form>
            </div>
        );
    }
}

export default NewAccount;
