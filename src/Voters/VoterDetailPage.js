import React, { Component } from 'react';
import { Container, Alert } from 'reactstrap';
import SolrFetcher from '../Utils/SolrFetcher';
import VoterDetailCard from './VoterDetailCard';
import VoterHistoryCard from './VoterHistoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Menu from '../Utils/Menu';
import BlueDiv from '../Utils/BlueDiv';

class VoterDetailPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ncid: this.props.route.match.params.ncid,
			working: true,
			fetching: false,
			voter: null,
			voterhistory : null,
			error : null
		};
	}

	componentWillReceiveProps(nextProps){
		if(this.props.ncid !== nextProps.ncid) this.setState({page: nextProps.ncid}, ()=> this.getVoterDetail());
	}

	componentWillMount() {
		this.getVoterDetail();
	}

	getVoterDetail() {
		this.setState({fetching : true});
		SolrFetcher({ action: 'detail', ncid : this.state.ncid }).then( (response) => {
			if(response.status === 200) {
				if(response.data.response.numFound === 1) this.setState({voter : response.data.response.docs[0]});
			}		
        }).catch((e)=> { 
        	this.setState({error : 'Error'}, ()=> { console.error(e)})
        }).finally(()=> {
        	this.getVoterHistory();
        });
	}

 	getVoterHistory(){
		SolrFetcher({ action: 'history', ncid : this.state.ncid }).then( (response) => {
			if(response.status === 200) {
				if(response.data.response.numFound > 0) this.setState({voterhistory : response.data.response.docs});
			}		
        }).catch((e)=> { 
        	this.setState({error : 'Error'}, ()=> { console.error(e)})
        }).finally(()=> {
        	this.stopWorking();
        });
 	}

	renderDetail() {
		if(this.state.fetching){
			return <div className="text-center m-2"><FontAwesomeIcon icon="spinner" size="4x" spin pulse /></div>
		}
		let voterhistorycard = (this.state.voterhistory) ? <VoterHistoryCard voterhistory={this.state.voterhistory} /> : null;
		return (
			<Container>
				<VoterDetailCard voter={this.state.voter} />
				<div className="mt-3">{voterhistorycard}</div>
			</Container>);
	}

	stopWorking() {
		this.setState({working:false, fetching: false});
	}

	renderPage() {
		if(this.state.working) return;
		if(this.state.error) return (<Container><Alert color="danger">{this.state.error || 'Error'}</Alert></Container>);
		return (
			<Container fluid className="content">	
				{this.renderDetail()}
			</Container>
		);
	}

	render() {
		return (
			<div><Menu /><BlueDiv fluid />{this.renderPage()}</div>
		);
	}

}

export default VoterDetailPage;