import React, { Component } from 'react';

import ScrollArea from 'react-scrollbar';

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
				const columns = [];
				row.forEach(item => {
					columns.push(<td>{item != null ? item.toString() : <i>NULL</i>}</td>);
				});
				this.rows.push(<tr>{columns}</tr>);
			});
		}
	}
	render() {
		return (
			<div className="tableContainer">
				<ScrollArea
					speed={0.8}
					className="area"
					contentClassName="content"
					horizontal={true}
				>
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
				</ScrollArea>
			</div>
		);
	}
}

export default SelectQueryResults;