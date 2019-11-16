import React, { Component } from 'react';
//import logo from './logo.svg';
import './main.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Login from "./Login";
import MainInterface from "./MainInterface";
import PerfectScrollbar from 'react-perfect-scrollbar'
import SelectQueryResults from "./SelectQueryResults";

import db_queries from './db_queries.js';

const dbHelper = window.createDbHelper();

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			dbData: null
		};
		this.loginComponent = React.createRef();
		this.attemptLogin = this.attemptLogin.bind(this);
		this.executeSql = this.executeSql.bind(this);
	}

	render() {
		return (
			<PerfectScrollbar className="app-container">
				<div className="app">
					<div className="container">
						{!this.state.loggedIn &&
						<Login attemptLogin={this.attemptLogin} ref={this.loginComponent}/>
						}
						{this.state.loggedIn &&
						<MainInterface executeSql={this.executeSql}/>
						}
					</div>
				</div>
			</PerfectScrollbar>
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

	async executeSql(scriptId) {
		const data = this.state.dbData;
		if (!db_queries.hasOwnProperty(scriptId))
			throw new Error("Invalid script ID.");
		let queries = db_queries[scriptId].split(";").map(query => query.replace(/\r?\n/g, ' ').trim()).filter(item => item.length > 0 && !item.startsWith('--'));
		const results = [];
		const conn = await dbHelper.getConnection(data.user, data.pass, data.host, data.sid);
		for (let i = 0; i < queries.length; i++) {
			const query = queries[i];
			const innerResults = [];
			innerResults.push(<code className="query">&gt; {query}</code>);
			try {
				const result = await conn.execute(query);
				console.log(result);
				if (result.hasOwnProperty('rowsAffected')) {
					innerResults.push(<code className="queryResult success">Success: {query.startsWith("DROP") ? "dropped." : result.rowsAffected+" row(s) affected."}</code>);
				} else {
					innerResults.push(<SelectQueryResults result={result} />);
				}
			} catch (e) {
				innerResults.push(<code className="queryResult error">Error: {e.message}</code>);
			}
			results.push(<div className="sqlQuery">{innerResults}</div>);
		}
		conn.close();
		return results;
	}
}

export default App;