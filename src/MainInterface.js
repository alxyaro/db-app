import React, {Component} from 'react';

class MainInterface extends Component {
	constructor(props){
		super(props);
		this.state = {
			runningQueries: false,
			output: null,
			error: null
		};
		this.runQueries = this.runQueries.bind(this);
	}
	render() {
		return (
			<div className="row">
				<div className="col-3 actions">
					<h3>Actions</h3>
					<button className="btn btn-primary" onClick={() => this.runQueries('createTables')}>Create Tables</button>
					<button className="btn btn-primary" onClick={() => this.runQueries('populateTables')}>Populate Tables</button>
					<button className="btn btn-primary" onClick={() => this.runQueries('sampleQueries')}>Sample Queries</button>
					<button className="btn btn-primary" onClick={() => this.runQueries('dropTables')}>Drop Tables</button>
					<br/><br/>
					<button className="btn btn-warning" disabled>Lookup Movies</button>
				</div>
				<div className="col-9">
					<h3>Output</h3>
					{this.state.error != null && <div className="alert alert-danger alert-dismissible fade show" role="alert">
						{this.state.error}
						<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.setState({error: null})}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>}
					{this.state.runningQueries ? <i>Executing queries...</i> : this.state.output == null ? <p>Click one of the action buttons on the sidebar to perform queries.</p> : this.state.output}
				</div>
			</div>
		);
	}
	async runQueries(id) {
		if (this.state.runningQueries)
			return;
		this.setState({runningQueries: true});
		try {
			const output = await this.props.executeSql(id);
			this.setState({runningQueries: false, output: output, error: null});
		} catch (e) {
			this.setState({runningQueries: false, output: null, error: "An error occurred: "+e.message});
		}
	}
}

export default MainInterface;