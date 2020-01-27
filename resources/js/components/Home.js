import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'react-bootstrap';

export default class Home extends Component {
    render() {
        var path_images = `./images/main_pizza.jpeg`;
        return (
            <div className="container">
                <Card>
                    <Card.Body>
                        <Card.Text>
                        <h1>Order the best pizza of your life in our pizzeria</h1>
                        </Card.Text>
                    </Card.Body>
                    <Card.Img variant="top" src={path_images} />
                </Card>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Home />, document.getElementById('example'));
}
