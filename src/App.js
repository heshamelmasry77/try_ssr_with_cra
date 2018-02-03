import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import Routes from './routes';

import { setMessage } from './reducers/app';
import './App.css';

// const AsyncComponent = Loadable({
//     loader: () => import(/* webpackChunkName: "welcome" */ "./Welcome"),
//         // loader: () => import("./Welcome"),
//     loading: () => <div>loading...</div>,
//     modules: ['welcome']
// });

class App extends Component {

    componentDidMount() {
        if(!this.props.message) {
            this.props.updateMessage("Hi, I'm from client!");
        }
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={'/images/logo.svg'} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <p>
              Redux: { this.props.message }
          </p>
          <button onClick={() =>  this.props.updateMessage("Hi, I'm from client!")}>Set Message</button>
          <ul>
              <li>
                  <Link to="/" >Home</Link>
              </li>
              <li>
                  <Link to="/about" >About</Link>
              </li>
          </ul>
          <div>
              <Routes />
          </div>
      </div>
    );
  }
}

const mapState = ({ app }) => ({
    message: app.message,
});

export default connect(mapState ,
    dispatch => ({
        updateMessage: (txt) => dispatch(setMessage(txt)),
    })
)(App);
