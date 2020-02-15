import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import {ApolloClient, createNetworkInterface} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-boost'


import * as reducers from './src/reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// const networkInterface = createNetworkInterface({
//   uri: 'http://40.70.8.207:5000/graphiql'
// })
const client = new ApolloClient({
  uri: 'http://40.70.8.207:5000/graphql'
})

class LeagionGolf extends PureComponent {
    constructor(props) {
      super(props);
    }
  
    render(){
      return(
        <ApolloProvider client={client} store={store}>
          <App/>
        </ApolloProvider>
      )
    }
  }

AppRegistry.registerComponent('leagionGolf', () => LeagionGolf);
