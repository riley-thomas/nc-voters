import React, { Component } from 'react';

class PhoneNumber extends Component {

	render(){
		if(this.props.children) {
			if(this.props.children.trim().match(/^[0-9]{10}$/)) {
				let area = this.props.children.slice(0,3);
				let exchange = this.props.children.slice(3,6);
				let subsciber = this.props.children.slice(6);
				return (<span>({area}) {exchange}-{subsciber}</span>);
			}
		}
		return this.props.children || null;
	}
}

export default PhoneNumber;