import React, { Component } from 'react';
import logo from './logo.png';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			moreOptions: false,
			user: '',
			pass: '',
			hostname: 'localhost',
			sid: 'xe',
			loggingIn: false,
			error: null
		};
		this.attemptLogin = this.attemptLogin.bind(this);
		this.loginError = this.loginError.bind(this);
	}
	render() {
		return (
			<div className="col-6 login-form">
				<form onSubmit={e => e.preventDefault()}>
					<img className="mb-4" src={logo} alt=""
					     width="72" height="72"/>
					<h1 className="h3 mb-3 font-weight-normal">Login to Oracle</h1>
					{this.state.error != null &&
					<div className="alert alert-danger alert-dismissible fade show" role="alert">
						{this.state.error}
						<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.setState({error: null})}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					}
					<label htmlFor="input1">Username</label>
					<input type="text" id="input1" className="form-control" placeholder="Username" onChange={event=>this.setState({user:event.target.value})}/>
					<label htmlFor="input2">Password</label>
					<input type="password" id="input2" className="form-control" placeholder="Password" onChange={event=>this.setState({pass:event.target.value})}/>
					<button className="btn btn-small btn-dark btn-block" type="button" onClick={() => this.setState({moreOptions:!this.state.moreOptions})}>{this.state.moreOptions ? 'Less Options' : 'More Options'}</button>
					{this.state.moreOptions &&
					<div className="more-options">
						<label htmlFor="input3">Hostname</label>
						<input type="text" id="input3" className="form-control" placeholder="Hostname" value={this.state.hostname} onChange={event=>this.setState({hostname:event.target.value})}/>
						<label htmlFor="input4">SID</label>
						<input type="text" id="input4" className="form-control" placeholder="SID" value={this.state.sid} onChange={event=>this.setState({sid:event.target.value})}/>
					</div>
					}
					<button className="btn btn-lg btn-success btn-block" type="submit" onClick={this.attemptLogin} disabled={this.state.loggingIn}>Login</button>
				</form>
			</div>
		);
	}
	attemptLogin() {
		this.setState({loggingIn: true});
		this.props.attemptLogin({
			user: this.state.user,
			pass: this.state.pass,
			host: this.state.hostname,
			sid: this.state.sid
		});
	}
	loginError(e) {
		this.setState({loggingIn: false, error: "Failed to login: "+e.message});
	}
}

export default Login;