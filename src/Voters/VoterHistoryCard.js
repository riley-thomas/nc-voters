import React, { Component } from 'react';
import { Table, Card, CardHeader, Badge } from 'reactstrap';
import * as moment from 'moment';
import 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class VoterHistoryCard extends Component {


	render(){
		if(this.props.voterhistory) {
			const rows = this.props.voterhistory;
			if(rows.length === 0) {
				return (<div>No Voting History Available</div>);
			}

			const history = [].concat(rows)
	    	.sort((a, b) => moment(a.election_lbl[0],"MM-DD-YYYY").isBefore(moment(b.election_lbl[0],"MM-DD-YYYY")) ? 1 : -1)
	    	.map((v,k) =>{
	    		let election = v.hasOwnProperty('election_desc') ? v.election_desc[0].toLowerCase() : '';
	    		let county = v.hasOwnProperty('county_desc') ? v.county_desc[0].toLowerCase() : '';
	    		let pct = v.hasOwnProperty('pct_description') ? v.pct_description[0].toLowerCase() : '';
	    		let party = v.hasOwnProperty('voted_party_desc') ? v.voted_party_desc[0].toLowerCase() : '';
	    		let method = v.hasOwnProperty('voting_method') ? v.voting_method[0].toLowerCase() : '';
		   		return (
		   			<tr id={'vote_'+k} key={k}>
		   				<td className='text-capitalize'>{election}</td>
		   				<td className='text-capitalize'>{county}</td>
		   				<td className='text-capitalize'>{pct}</td>
		   				<td className='text-capitalize'>{party}</td>
		   				<td className='text-capitalize'>{method}</td>
		            </tr>
		   		);
		   	});
		   	let plural = rows.length > 1 ? 's' : '';
		   	return (
		   		<Card>
		   			<CardHeader><FontAwesomeIcon icon="history" /> Voting History <Badge pill className="float-right">{rows.length} Election{plural}</Badge></CardHeader>   			
		   			<Table className='table-bordered table-sm table-condensed m-0'>
						<thead className="bg-light">
							<tr>
								<th>Election</th>
								<th>County</th>
								<th>Precinct</th>
								<th>Party</th>
								<th>Method</th>
							</tr>
						</thead>
						<tbody className="small">
							{history}
						</tbody>
					</Table>
				</Card>
		   	);
		}
		return (<div>No Voting History Available</div>);

	}

}

export default VoterHistoryCard;