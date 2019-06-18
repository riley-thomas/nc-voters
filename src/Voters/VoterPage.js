import React, { Component } from 'react';
import { Container, Card, CardBody, Badge, Row, Col, Alert } from 'reactstrap';
import SolrFetcher from '../Utils/SolrFetcher';
import VoterTable from './VoterTable';
import Paginator from '../Utils/Paginator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'universal-cookie';
import * as moment from 'moment';
import Menu from '../Utils/Menu';
import BlueDiv from '../Utils/BlueDiv';
import CountyOptions from './county_options.json';
import RaceOptions from './race_options.json';
import GenderOptions from './gender_options.json';
import PartyOptions from './party_options.json';
import BirthStateOptions from './us_states.json';


class VoterPage extends Component {

	constructor(props) {
		super(props);
		this.arg_names = [
			'first_name','last_name','middle_name','birth_year','birth_state','birth_age','birth_age_min','birth_age_max','gender_code','race_code','hispanic','county_id','res_street_address',
			'res_city_desc','zip_code','status_cd','active_only','party_cd'
		];
		this.cookies = new Cookies();
		let cookiename = 'filters_open';
		let open = this.cookies.get(cookiename) === 'open' ? 'open' : 'closed';
		let filtercookie = this.cookies.get('filters_values') || {};
		this.state = {
			page: this.props.route.match.params.page,
			rows: 50,
			working: true,
			fetching: false,
			data : null,
			cookiename : cookiename,
			expanded: open,
			args : [],
			error : null
		};
		this.arg_names.forEach(val => this.state.args[val] = filtercookie[val] || '');
	}

	componentWillReceiveProps(nextProps){
		if(this.props.page !== nextProps.page) this.setState({page: nextProps.page}, ()=> this.getVoters());
	}

	componentWillMount() {
		this.getVoters();
	}

	updateVoterCookie() {
		this.cookies.set('filters_values', this.state.args,{ path : '/', expires : moment().add(365, 'days').toDate() });
	}

	getVoters() {
		this.setState({fetching : true});
		SolrFetcher({ page: this.state.page, fields : this.state.args }).then( (response) => {
			if(response.status === 200)	this.setState({data : response.data.response});
        }).catch((e)=> { 
        	this.cookies.set('filters_values', null ,{ path : '/', expires : moment().add(-1, 'days').toDate() });
        	this.setState({error : 'Error'}, ()=> {	console.error(e)});
        }).then(()=> {
        	this.stopWorking();
        });
	}

	renderRows() {
		if(this.state.fetching){
			return <div className="text-center m-2"><FontAwesomeIcon icon="spinner" size="4x" spin pulse /></div>
		}
		return <VoterTable rows={this.state.data.docs} />;
	}

	renderPaginator() {
		if(this.state.fetching) return;
		if(this.state.data.numFound > this.state.rows){
			let pagecount = Math.ceil(this.state.data.numFound / this.state.rows);
			let currentpage = this.state.page;
			if(pagecount && pagecount > 1) {
				return <Paginator base="" pagecount={pagecount} currentpage={currentpage} />
			}
		}
		return;
	}

	stopWorking() {
		this.setState({working:false, fetching: false});
	}

	expand() {
		let open = this.state.expanded === 'open' ? 'closed' : 'open';
		this.setState({expanded : open}, () => {
			this.cookies.set(this.state.cookiename, open, { path : '/', expires : moment().add(365, 'days').toDate() })
		})
	}

	updateFilterState(e) {
		let n = Object.assign({}, this.state.args);
		if(e.target.type === 'checkbox'){
			n[e.target.name] = e.target.checked ? true : false;
			this.setState({ args : n });
		} else if (e.target.type === 'number'){
			if(e.target.value.match(/^[0-9]{1,4}$/) || e.target.value === '') {
				n[e.target.name] = (e.target.value || '');
				this.setState({ args : n });
			}
		} else {
			n[e.target.name] = (e.target.value.replace(/[^A-z0-9 *]/gi,'') || '');
			this.setState({ args : n });
		}
	}

	renderTextBox(field) {
		return (
			<div className="input-group input-group-sm">
				<div className="input-group-prepend input-group-prepend-sm"><div className="input-group-text">{field.title}</div></div>
				<input id={field.name} name={field.name} type="text" value={this.state.args[field.name] || ''} onChange={this.updateFilterState.bind(this)} className="form-control form-control-sm" placeholder="" autoComplete="off" />
			</div>
		);
	}

	renderNumberBox(field) {
		return (
			<div className="input-group input-group-sm">
				<div className="input-group-prepend input-group-prepend-sm"><div className="input-group-text">{field.title}</div></div>
				<input id={field.name} name={field.name} type="number" min={field.min} max={field.max} value={this.state.args[field.name] || ''} onChange={this.updateFilterState.bind(this)} className="form-control form-control-sm" placeholder="" autoComplete="off" />
			</div>
		);
	}

	renderSelectBox(field) {
		let options = field.options.map((v,k) =>{
	   		return ( <option key={k} value={v.value}>{v.display_value}</option> );
	   	});
	   	return (
	   		<div className="input-group input-group-sm">
	   			<div className="input-group-prepend input-group-prepend-sm"><div className="input-group-text">{field.title}</div></div>
	   			<select name={field.name} onChange={this.updateFilterState.bind(this)} className="form-control form-control-sm" value={this.state.args[field.name]}>{options}</select>
	   		</div>
	   	);
	}

	renderCheckBox(field) {
		return (
			<div className="form-check">
				<input id={field.name} name={field.name} type="checkbox" checked={this.state.args[field.name] || false } onChange={this.updateFilterState.bind(this)} className="form-check-input" />
				<label htmlFor={field.name} className="form-check-label">{field.title}</label>
			</div>
		);
	}
	
	renderPriorityButton(i) {
		let icon = this.state.priorityFilter[i] === i ? 'check-square' : 'square';
		return (<li key={i} className="list-inline-item" onClick={() => this.changePriority(i)}><FontAwesomeIcon icon={['far', icon]} /><span className="cursor-default"> {i}</span></li>);
	}

	changePriority(i) {
		const priority = this.state.priorityFilter.slice();
		priority[i] = priority[i] === i ? '' : i;
		this.setState({	priorityFilter: priority });
	}

	updatePage() {
		this.setState({page : 1}, ()=> {
			this.updateVoterCookie();
			this.props.route.history.push('/1');
			this.getVoters();
		});
	}

	renderFilterToggle() {
		return (<Row onClick={()=>{this.expand()}}><Col className="cursor-default"><FontAwesomeIcon icon="filter" /> Show/Hide Filters</Col><Col className="text-right"><Badge>{this.state.data.numFound.toLocaleString() || 0} Records</Badge></Col></Row>);
	}

	renderFilters() {
		if(this.state.fetching) return;
		if(this.state.expanded === 'open') return (this.renderFilterToggle());
		let max_year = new Date().getFullYear();
		return (
			<Card className="mb-1">
				<CardBody>
					<Row>
						<Col>{this.renderFilterToggle()}<hr /></Col>
					</Row>
					<Row className="mb-1">	
						<Col>{this.renderTextBox({name: 'first_name', title : 'First'})}</Col>
						<Col>{this.renderTextBox({name: 'middle_name', title : 'Middle'})}</Col>
						<Col>{this.renderTextBox({name: 'last_name', title : 'Last'})}</Col>
					</Row>
					<Row className="mb-1">
						<Col md="2">{this.renderNumberBox({name: 'birth_age_min', title : 'Min Age', min : 18, max : 120})}</Col>
						<Col md="2">{this.renderNumberBox({name: 'birth_age_max', title : 'Max Age', min : 18, max : 120})}</Col>
						<Col md="3">{this.renderNumberBox({name: 'birth_year', title : 'Birth Year', min : 1850, max: max_year})}</Col>
						<Col>{this.renderSelectBox({name : 'birth_state', title : 'Birth State', options : BirthStateOptions})}</Col>
					</Row>
					<Row className="mb-1">
						<Col>{this.renderSelectBox({name : 'gender_code', title : 'Gender', options : GenderOptions})}</Col>
						<Col>{this.renderSelectBox({name : 'race_code', title : 'Race', options : RaceOptions})}</Col>
						<Col>{this.renderCheckBox({name : 'hispanic', title : 'Hispanic'})}</Col>
					</Row>
					<Row className="mb-1">
						<Col md="5">{this.renderTextBox({name: 'res_street_address', title : 'Street Address'})}</Col>
						<Col>{this.renderTextBox({name: 'res_city_desc', title : 'City'})}</Col>
						<Col md="2">{this.renderTextBox({name: 'zip_code', title : 'Zip'})}</Col>
						<Col>{this.renderSelectBox({name : 'county_id', title : 'County', options : CountyOptions})}</Col>
					</Row>
					<Row>
						<Col>{this.renderSelectBox({name : 'party_cd', title : 'Party', options : PartyOptions})}</Col>	
						<Col>{this.renderCheckBox({name : 'active_only', title : 'Active Only'})}</Col>
						<Col className="text-right">
							<button type="button" className="btn btn-primary btn-sm" onClick={() => this.updatePage()}>
									<FontAwesomeIcon icon="search" size="1x" /> Search
							</button>
						</Col>
					</Row>
				</CardBody>
			</Card>
		);
	}

	renderPage() {
		if(this.state.working) return;
		if(this.state.error) return (<Container><Alert color="danger">{this.state.error || 'Error'}</Alert></Container>);
		let hr = this.state.expanded === 'open' ? '' : <hr />;
		return (
			<Container fluid className="content">	
				{this.renderFilters()}
				{hr}
				{this.renderRows()}
				<div className="mt-1">
					{this.renderPaginator()}
				</div>
			</Container>
		);
	}


	render() {
		return (
			<div><Menu /><BlueDiv fluid />{this.renderPage()}</div>
		);
	}

}

export default VoterPage;