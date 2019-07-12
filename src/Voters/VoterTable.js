import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import PhoneNumber from '../Utils/PhoneNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class VoterTable extends Component {

	render() {
	   	const rows = this.props.rows;
		const voters = [].concat(rows)
    	//.sort((a, b) => (a.last_name[0]+a.first_name[0]+(a.midl_name[0]) || '') > (b.last_name[0]+b.first_name[0]+(b.midl_name[0] || '')))
    	.map((v,k) =>{

    		let map;
    		if(v.res_street_address && v.res_city_desc) {
				let query = v.res_street_address+" "+v.res_city_desc+" "+ v.zip_code;
				let mapurl = "https://www.google.com/maps/search/?api=1&query=" + query;
				map = (<a href={mapurl} target='new_window' title="Opens map in another window"><FontAwesomeIcon icon='map-marked-alt' /></a>);
			}
    		let phone = v.hasOwnProperty('full_phone_number') ? <PhoneNumber>{v.full_phone_number}</PhoneNumber> : '';
	   		return (
	   			<tr id={'voter_'+v.ncid} key={v.ncid}>
	   				<td><Link to={'/voter/'+v.ncid}>{v.ncid}</Link></td>
	   				<td title={v.voter_status_reason_desc || v.voter_status_desc}>{v.voter_status_desc}</td>
	            	<td>{v.last_name}</td><td>{v.first_name}</td><td>{v.middle_name}</td>
	            	<td>{v.gender_code}</td>
	            	<td>{v.race_code}</td>
	            	<td>{v.birth_age}</td>
	            	<td>{v.res_street_address}<br />{v.res_city_desc} {v.zip_code} {map}</td>
	            	<td>{v.county_desc}</td>
	            	<td>{phone}</td>
	            	<td>{v.party_cd}</td>
	            	<td>{v.registr_dt}</td>
	            	<td>{v.birth_state}</td>
	            	<td>{v.birth_year}</td>
	            </tr>
	   		);
	   	});
	   	
	   	if(this.props.rows && this.props.rows.length > 0){
		   	return (
	   			<Table className='table-bordered table-sm table-condensed m-0'>
					<thead className="bg-light">
						<tr>
							<th>NCID</th><th>Status</th><th>Last</th><th>First</th><th>Middle</th><th>Gender</th><th>Race</th><th>Age</th>
							<th>Address</th><th>County</th><th>Phone</th>
							<th>Party</th><th>Reg Date</th><th>BP</th><th>YOB</th>
						</tr>
					</thead>
					<tbody className="small">
						{voters}
					</tbody>
				</Table>
		   	);
		}
		return (<h3>No matching records</h3>);

	}

}

export default VoterTable;