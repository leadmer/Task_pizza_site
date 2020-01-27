import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pizza from './components/Pizza';
import Home from './components/Home';
import Order from './components/Order';
import Cart from './components/Cart';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default class Index extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <div>
                        <Route path='/' exact component={Home}/>
                        <Route path='/pizza' exact component={Pizza}/>
                        <Route path='/order' exact component={Order}/>
                        <Route path='/cart' exact component={Cart}/>
                    </div>
                </Router>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}
