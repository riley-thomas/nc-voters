import React, { Component } from 'react';
import County from '../data/county.json';

class SelectCounty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value : this.props.value,
		};
	}
	handleChanged(event){
		if(this.state.value !== event.target.value){
			this.setState({value : event.target.value});
			this.props.handleChange(event);			
		}
	}
	renderSelectBox(){
		let Counties = County.map((c,id) => {
			return { label : c.glbl_county.fips_county_desc, value : c.bets_county_code };
		});
		return (
			<select name="county_id" options={Counties} onChange={this.handleChanged.bind(this)} value={ this.state.value ? this.state.value : this.props.value } className="form-control">
				<option value="">All Counties</option>
				{ Counties.map((c,id) => { return <option key={c.value} value={c.value}>{c.label}</option> }) }
			</select>
		);
	}
	render() {

		return (
			<div>{ this.renderSelectBox() }</div>
		);
	}
}

export default SelectCounty;