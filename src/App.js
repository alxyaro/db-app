import React, { Component } from 'react';
//import logo from './logo.svg';
import './main.css';
import Login from "./Login";
import MainInterface from "./MainInterface";

const dbHelper = window.createDbHelper();

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			loggedIn: false
		}
	}

	render() {
		return (
			<div className="App">
				<div className="container">
					{!this.state.loggedIn &&
					<Login attemptLogin={this.attemptLogin}/>
					}
					{this.state.loggedIn &&
					<MainInterface/>
					}
				</div>
				{/*<p className="App-intro">
					The current value of number is {this.state.number}
				</p>
				<button onClick={()=>this.setState({number : this.state.number + 1})}>+</button>*/}
			</div>
		);
	}

	attemptLogin(data) {
		console.log(data);
	}
}

export default App;