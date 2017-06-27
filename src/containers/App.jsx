import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { history } from './../store/configureStore';

import Header from '../containers/Header';

export default class App extends React.Component {
  render() {
    return(
      <ConnectedRouter history={history}>
      </ConnectedRouter>
    );
  }
}
