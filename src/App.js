import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import ErrorPage from './Errors/ErrorPage';
import Head from './Head/Head';
import VoterPage from './Voters/VoterPage';
import VoterDetailPage from './Voters/VoterDetailPage';
import Footer from './Footer/Footer';
import { addBackToTop } from 'vanilla-back-to-top';

addBackToTop();

class App extends Component {

  renderPage() {
    return (
      <div className="mb-5">
        <Switch>
          <Redirect exact from="/" to="/1" />
          <Route exact path="/:page([1-9]{1}[0-9]{0,5})" render={ (r) =>
            <div> 
              <VoterPage route={r} page={r.match.params.page}/>
            </div>
          } />
          <Route exact path="/voter/:ncid([A-z]{1,3}[0-9]{3,8})" render={ (r) =>
            <div> 
              <VoterDetailPage route={r} ncid={r.match.params.ncid}/>
            </div>
          } />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    );
  }


  render() {

    return (
      <div>
        <Head />
        {this.renderPage()}
        <Footer />
      </div>
    );
  }
}

export default App;

