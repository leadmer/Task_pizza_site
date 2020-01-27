import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CardGroup, Card, ListGroup, ListGroupItem, Button, CardDeck } from 'react-bootstrap';


export default class Pizza extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pizzas: []
        }
    }

    componentDidMount() {
        axios.get('api/pizza').then(response => {
            this.setState({
                pizzas: response.data
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    addPizzaToLocalStorage(pizza_id) {

        var cart_items = localStorage.getItem('cart_items');

        if (cart_items == null) {
            cart_items = {};
            cart_items[pizza_id] = 1;
        }
        else {
            cart_items = JSON.parse(cart_items);
            if (cart_items[pizza_id] === undefined) {
                cart_items[pizza_id] = 1;
            }
            else {
                cart_items[pizza_id] = cart_items[pizza_id] + 1;
            }
        }

        localStorage.setItem('cart_items', JSON.stringify(cart_items));
        alert('Pizza added to cart');
    }

    render_pizzas() {
        return this.state.pizzas.map(pizza => {
            var path_images = `./images/${pizza.name.toLowerCase()}.jpg`;

            return (
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={path_images} />
                    <Card.Body>
                        <Card.Title>Pizza {pizza.name}</Card.Title>
                        <Card.Text>Description: {pizza.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" data-dismiss="alert"
                            onClick={this.addPizzaToLocalStorage.bind(this, pizza.id)}>
                            €{pizza.price_in_euro}<br />${pizza.price_in_dollar}
                        </Button>
                    </Card.Footer>
                </Card>
            );
        })
    }

    render() {
        return (
            <div className='card-columns' >
                {this.render_pizzas()}
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Pizza />, document.getElementById('example'));
}
