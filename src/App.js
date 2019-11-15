import React, { Component } from 'react';
//import logo from './logo.svg';
import './main.css';
import Login from "./Login";
import MainInterface from "./MainInterface";
import ScrollArea from 'react-scrollbar';

const dbHelper = window.createDbHelper();

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			loggedIn: false,
			dbData: null
		};
		this.loginComponent = React.createRef();
		this.attemptLogin = this.attemptLogin.bind(this);
	}

	render() {
		return (
			<ScrollArea className="app-container" smoothScrolling={true}>
				<div className="app">
					<div className="container">
						{!this.state.loggedIn &&
						<Login attemptLogin={this.attemptLogin} ref={this.loginComponent}/>
						}
						{this.state.loggedIn &&
						<MainInterface/>
						}
					</div>
				</div>
			</ScrollArea>
		);
	}

	attemptLogin(data) {
		dbHelper.getConnection(data.user, data.pass, data.host, data.sid).then(conn => {
			this.setState({loggedIn: true, dbData: data});
			conn.close();
		}).catch(e => {
			this.loginComponent.current.loginError(e);
		});
	}
}

export default App;