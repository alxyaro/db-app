import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SelectQueryResults from "./SelectQueryResults";

const helper = window.createDbHelper();

helper.getConnection().then(async conn => {
	await helper.testQuery(conn);
	conn.close();
});

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			/*number : 0*/
		}
	}

	render() {
		return (
			<div className="App">
				<div className="container">
					<div className="row">
						<div className="col-3 actions">
							<h3>Actions</h3>
							<button className="btn btn-primary">Create Tables</button>
							<button className="btn btn-primary" disabled>Add Data</button>
							<button className="btn btn-primary" disabled>Run Sample Queries</button>
							<button className="btn btn-primary" disabled>Drop Tables</button>
							<br/><br/>
							<button className="btn btn-warning" disabled>Lookup Movies</button>
						</div>
						<div className="col-9">
							<h3>Main Content</h3>
							<p>Cras elementum dolor nec massa egestas, vitae fermentum ipsum sollicitudin. Nulla nisi est, porttitor vel velit eu, pellentesque luctus nibh. In blandit id magna id ornare. Praesent imperdiet diam sed est condimentum imperdiet. Nunc tincidunt ipsum felis, volutpat ornare nulla maximus sit amet. In hac habitasse platea dictumst. Sed in libero ipsum. Pellentesque rutrum in tortor id blandit. Etiam risus ipsum, pretium in magna nec, accumsan gravida dui. Vestibulum a dolor tempor, ullamcorper dolor ac, lacinia sapien. Pellentesque sit amet ultricies mauris. Praesent luctus dui nisi, quis viverra turpis auctor eu.</p>
							<code>
								SELECT * FROM ACCOUNT;
							</code>
							<span>Result:</span>
							<SelectQueryResults result={{metaData: [
							{ name: 'ACCOUNTID' },
							{ name: 'NAME' },
							{ name: 'EMAIL' },
							{ name: 'PASSWORD' }
								],
								rows: [
								[
								3,
								'Karen McDonald',
								'KMcDonald@gmail.com',
								'2697dafecf24c71a0e570b3969a033f059debaeb20eaf0beeb829ae0b44e3c51'
								]
								]}}/>
						</div>
					</div>
				</div>
				{/*<p className="App-intro">
					The current value of number is {this.state.number}
				</p>
				<button onClick={()=>this.setState({number : this.state.number + 1})}>+</button>*/}
			</div>
		);
	}
}

export default App;