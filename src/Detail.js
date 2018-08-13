import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import numeral from 'numeral';


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance : 0,
            account : {
                account_id : "",
                first_name : "",
                last_name : "",
                email : "",
                phone_no : "",
                address : ""
            },
            message: ""
        }
    }
    componentDidMount(){
        let accountID = this.props.match.params.accountID
        axios.get(`http://localhost:8080/cash-deposit/v1/accounts/`+accountID)
        .then(response => {
            if (response.data.code && response.data.code === 200) {
                this.setState({
                    account : response.data.data
                })
            }else{
                this.setState({
                    message : response.data.message
                })
            }
        })
        axios.get(`http://localhost:8080/cash-deposit/v1/deposits/account/`+accountID+`/balance`)
        .then(response => {
            if (response.data.code && response.data.code === 200) {
                this.setState({
                    balance : response.data.data.balance
                })
            }else{
                this.setState({
                    message : response.data.message
                })
            }
        })
    }
    render() {
        return (
            <div className="App">
                <p>
                    <Link to="/">Home</Link> 
                </p> 
                <p className="text-left">
                    <Link to={"/"+this.state.account.account_id+"/cash-deposit"}>Cash Deposit</Link> | <Link to={"/"+this.state.account.account_id+"/deposit-history"}>Deposit History</Link> 
                </p> 
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}>Detail Account :</td>
                            <td>Balance</td>
                        </tr>
                        <tr>
                            <th>Account ID: </th>
                            <td>{this.state.account.account_id}</td>
                            <td rowSpan={5}>IDR {numeral(this.state.balance).format('0,0')}</td>
                        </tr>
                        <tr>
                            <th>Full Name: </th>
                            <td>{this.state.account.first_name} {this.state.account.last_name}</td>
                        </tr>
                        <tr>
                            <th>Email: </th>
                            <td>{this.state.account.email}</td>
                        </tr>
                        <tr>
                            <th>Phone Number: </th>
                            <td>{this.state.account.phone_no}</td>
                        </tr>
                        <tr>
                            <th>Address: </th>
                            <td>{this.state.account.address}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Detail;
