import React, { Component } from 'react';
import { Table } from 'reactstrap';

class HTrow extends Component {

	render() {
		let hStyle = this.props.hStyle || {};
		let dStyle = this.props.dStyle || {};
		return (<tr><th style={hStyle}>{this.props.h}</th><td style={dStyle}>{this.props.d}</td></tr>);
	}

}

export default HTrow;
