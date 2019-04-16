import React, { Component } from 'react';
import { Container } from 'reactstrap';

class BlueDiv extends Component {

  render() {
    return (
        <Container fluid={(this.props.fluid ? true : false)} className="topical-nav ncblue-bg d-print-none">
			{ this.props.children }
        </Container>
    );
  }

}

export default BlueDiv;