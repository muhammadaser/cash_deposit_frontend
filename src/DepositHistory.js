import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import numeral from 'numeral';


class DepositHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history:[],
            message: ""
        }
    }
    componentDidMount(){
        let accountID = this.props.match.params.accountID
        axios.get(`http://localhost:8080/cash-deposit/v1/deposits/account/`+accountID)
        .then(response => {
            if (response.data.code && response.data.code === 200) {
                this.setState({
                    history : response.data.data
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
                <p>
                    Account ID : <b>{this.props.match.params.accountID}</b>
                </p>
                <table>
                    <tbody>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                        {
                            this.state.history.map(function(value,i){
                                return <tr key={i}>
                                    <td>{value.deposit_id}</td>
                                    <td>IDR {numeral(value.deposit_amount).format('0,0')}</td>
                                    <td>{value.deposit_date}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DepositHistory;
