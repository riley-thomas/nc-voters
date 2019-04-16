import React, { Component } from 'react';
import Config from '../Config.js';

class MapDiv extends Component {

	getGoogleMapUrl(type) {
		let url = '//maps.googleapis.com/maps/api/staticmap?&zoom=13&size=350x200&maptype='+type+'&markers=color:blue%7C'+ encodeURIComponent(this.props.address) + '&key=' + Config.google_map_key;
		return (url);
	}

	renderGoogleMap(type) {
		let link = '//maps.google.com/?q='+ this.props.address;
		return (
			<a href={link} target="new_window" title="Open Map in new window">
				<img src={ this.getGoogleMapUrl(type) } title="Open Map In New Window" alt="Map" />
			</a>
		);
	}

	render() {
		if(this.props.address.trim() === 'removed') return '';
		return (
			<div>
				<div style={{'overflowX' : 'hidden'}}>
					{ this.renderGoogleMap('roadmap') }
				</div>
			</div>
		);
	}

}

export default MapDiv;