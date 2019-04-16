import React, { Component } from 'react';

class Party extends Component {


	render(){
		let party = this.props.party ? this.props.party.toLowerCase() : '';
		switch(party) {
			case 'una':
				party = 'unaffilated';
				break;
			case 'rep':
				party = 'Republican';
				break;
			case 'dem':
				party = 'Democrat';
				break;
			case 'lib':
				party = 'Libertarian';
				break;
			case 'gre':
				party = 'Green';
				break;
			case 'cst':
				party = 'Constitutionist';
				break;
			default: 
			 //
		}
	   	
	   	return (
	   		<span>{party}</span>
	   	);

	}

}

export default Party;