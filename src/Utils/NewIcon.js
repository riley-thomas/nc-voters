import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NewIcon extends Component {

	render() {
		let textcolor = this.props.dark ? 'fa-layers-text text-dark' :'fa-layers-text text-light';
	   	return (
			<span>
				<span className="fa-layers fa-fw">
					<FontAwesomeIcon icon="certificate" size="2x" />
					<span className={textcolor} style={{ transform : 'rotate(-30deg) translate(-15%, -70%) scale(0.6)'}}>NEW</span>
				</span>
			</span>
	   	);
	}

}

export default NewIcon;