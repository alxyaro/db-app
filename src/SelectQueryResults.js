import React, { Component } from 'react';


class SelectQueryResults extends Component {
	constructor(props){
		super(props);

		this.headerRows = [];
		this.rows = [];
		if (this.props.result) {
			this.props.result.metaData.forEach(obj => {
				this.headerRows.push(<th>{obj.name}</th>);
			});
			this.props.result.rows.forEach(row => {
				var columns = [];
				const result = row.forEach(item => {
					columns.push(<td>{item}</td>);
				});
				this.rows.push(columns);
			});
		}

		this.state = {
			/*number : 0*/
		}
	}

	render() {
		return (
			<div className="tableContainer">
				<table className="table">
					<thead>
					<tr>
						{this.headerRows}
					</tr>
					</thead>
					<tbody>
					{this.rows}
					</tbody>
				</table>
			</div>
		);
	}
}

export default SelectQueryResults;