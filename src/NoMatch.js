import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
        <div>
            <p>
                <Link to="/">Back Home</Link>
            </p> 
            <p>Not Found</p>
        </div>
    );
  }
}

export default Home;
