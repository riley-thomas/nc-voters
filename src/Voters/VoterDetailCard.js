import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import PhoneNumber from '../Utils/PhoneNumber';
import GenderOptions from './gender_options.json';
import RaceOptions from './race_options.json';
import States from './us_states';
import Party from '../Utils/Party';
import MapDiv from '../Utils/MapDiv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

class VoterDetailCard extends Component {

	render(){
		if(this.props.voter) {
			let voter = this.props.voter;
			let gender = GenderOptions.find(e => e.value === (voter.hasOwnProperty('gender_code') ? voter.gender_code : ''));
			let race = RaceOptions.find(e => e.value === (voter.hasOwnProperty('race_code') ? voter.race_code : ''));
			let birth_state = States.find(e => e.value === (voter.hasOwnProperty('birth_state') ? voter.birth_state : ''));
			let age = voter.hasOwnProperty('birth_age') ? voter.birth_age.toString()+ ' yo' : '';
			let race_string = (typeof race !== 'undefined' && race.value !== '' && race.value !== 'U') ? race.display_value : '';
			let hispanic_string = voter.hasOwnProperty('ethnic_code') ? (voter.ethnic_code === 'HL' ? ' Hispanic' : '') : '';
			let gender_string = (typeof gender !== 'undefined' && gender.value !== '' && gender.value !== 'U') ? gender.display_value : '';
			let birth_year = voter.hasOwnProperty('birth_year') ? 'born ' + voter.birth_year.toString() : '';
			let birth_state_string = (typeof birth_state !== 'undefined' && birth_state.value !== '') ? ('in ' + birth_state.display_value) : '';
			let address = voter.hasOwnProperty('res_street_address') ? voter.res_street_address.toLowerCase() : '';
			let city = voter.hasOwnProperty('res_city_desc') ? voter.res_city_desc.toLowerCase() : '';	
			let state = voter.hasOwnProperty('state_cd') ? voter.state_cd : '';
			let zip = voter.hasOwnProperty('zip_code') ? voter.zip_code : '';
			let full_address = address+' '+city+' '+state+' '+zip;
			let county = voter.hasOwnProperty('county_desc') ? voter.county_desc.toLowerCase() + ' County' : '';
			let pct = voter.hasOwnProperty('precinct_desc') ? 'Precinct: ' + voter.precinct_desc.toLowerCase() : '';
			let phone = voter.hasOwnProperty('full_phone_number') ? <PhoneNumber>{voter.full_phone_number}</PhoneNumber> : '';
			let party = voter.hasOwnProperty('party_cd') ? <Party party={voter.party_cd} /> : '';
			let reg_dt = voter.hasOwnProperty('registr_dt') ? <Moment parse="MM/DD/YYYY" format="M/D/Y">{voter.registr_dt}</Moment> : '';
			let status = voter.hasOwnProperty('voter_status_desc') ? voter.voter_status_desc.toLowerCase().toString() + ' status' : '';
			let status_reason = voter.hasOwnProperty('voter_status_reason_desc') ? <span className='small'>({voter.voter_status_reason_desc.toLowerCase()})</span> : '';	
			let driver = voter.hasOwnProperty('drivers_lic') ? (voter.drivers_lic === 'Y' ? 'Has a driver\'s license' : 'No driver\'s license') : '';
			return (
				<div>
					<Card>
						<CardHeader><FontAwesomeIcon icon={['far', 'address-card']} /> {voter.first_name} {voter.middle_name} {voter.last_name}</CardHeader>
						<CardBody>
							<Row>
								<Col>
									<Row><Col>{age} {race_string}{hispanic_string} {gender_string} {birth_year} {birth_state_string}</Col></Row>
									<Row><Col className='text-capitalize'>{full_address}</Col></Row>
				   					<Row><Col className='text-capitalize'>{county}</Col></Row>
				   					<Row><Col>{phone}</Col></Row>
				   					<Row><Col className='text-capitalize'>{pct}</Col></Row>
				   					<Row><Col>Registered {party} on {reg_dt}, {status} {status_reason}</Col></Row>
				   					<Row><Col>{driver}</Col></Row>
				   				</Col><Col><MapDiv address={full_address} /></Col>
				   			</Row>
		   				</CardBody>
		   			</Card>
				</div>
			);
		}
		return (<h3>No voter details</h3>);

	}
}

export default VoterDetailCard;