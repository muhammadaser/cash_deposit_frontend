import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Link , Redirect} from "react-router-dom";


class NewDeposit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount : "",
            message: "",
            deposit_id : "",
            success : false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleInputChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:8080/cash-deposit/v1/deposits`,{
            account_id : this.props.match.params.accountID,
            deposit_id : this.state.deposit_id,
            deposit_amount : parseInt(this.state.amount,10),
        })
        .then(response => {
            if (response.data.code && response.data.code === 200) {
                this.setState({
                    success : true
                })
            }
        })
        .catch(error => {
            if (error.response) {
                this.setState({
                    message : error.response.data.message
                })
            }
        })
        
        
    }
    render() {
        let accountId = this.props.match.params.accountID
        if (this.state.success) {
            return <Redirect to={"/"+accountId + "/deposit-history"} />
        }
        return (
            <div className="App">
                <p>
                    <Link to="/">Home</Link>
                </p>
                { this.state.message } 
                <form onSubmit={this.handleSubmit} className="text-left">
                    <p>
                        <label>
                            Account ID: <b>{accountId}</b>
                        </label>
                    </p>
                    <p>
                        <label>
                            Deposit ID :
                            <input type="text" name="deposit_id" 
                                value={this.state.deposit_id} 
                                onChange={this.handleInputChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Deposit Amount :
                            <input type="number" name="amount" 
                                value={this.state.amount} 
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

export default NewDeposit;
