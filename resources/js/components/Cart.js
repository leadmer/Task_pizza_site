import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card, Form, FormControl, Button, Col } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default class Cart extends Component {

  constructor(props) {

    super(props);

    this.state = {
      localStorage_pizza: localStorage.getItem('cart_items') == undefined ? {} :
                          JSON.parse(localStorage.getItem('cart_items')),
      pizzas_in_cart: [],
      total_summ_dollar: 0,
      total_summ_euro: 0,
      telephone: ''
    }

    this.sendOrder = this.sendOrder.bind(this);
    this.cartListener = this.cartListener.bind(this);
    this.renderCart = this.renderCart.bind(this);
    this.deletePizza = this.deletePizza.bind(this);
  }

  componentDidMount() {
    for (var key in this.state.localStorage_pizza) {
      fetch(`/api/pizza/${key}`)
        .then(response => {
          return response.json();
        })
        .then(pizza => {
          var tmp = this.state.pizzas_in_cart;
          tmp.push(pizza[0]);
          var tmp_number = Number(this.state.localStorage_pizza[pizza[0].id]);
          var tmp_summ_dollar = this.state.total_summ_dollar + Number(pizza[0].price_in_dollar) * tmp_number;
          var tmp_summ_euro = this.state.total_summ_euro + Number(pizza[0].price_in_euro) * tmp_number;
          this.setState({
            pizzas_in_cart: tmp,
            total_summ_dollar: tmp_summ_dollar,
            total_summ_euro: tmp_summ_euro
          });
        });
    }
  }

  cartListener(event) {

    var pizza = this.state.pizzas_in_cart.filter(function (pizza) {
      return pizza.id == event.target.id;
    });

    var new_total_summ_dollar = this.state.total_summ_dollar + (Number(event.target.value) -
      Number(this.state.localStorage_pizza[event.target.id])) * pizza[0].price_in_dollar;

    var new_total_summ_euro = this.state.total_summ_euro + (Number(event.target.value) -
      Number(this.state.localStorage_pizza[event.target.id])) * pizza[0].price_in_euro;

    var pizzas_in_cart = JSON.parse(localStorage.getItem('cart_items'));
    pizzas_in_cart[event.target.id] = event.target.value;

    localStorage.setItem('cart_items', JSON.stringify(pizzas_in_cart));

    this.setState({
      localStorage_pizza: JSON.parse(localStorage.getItem('cart_items')),
      total_summ_dollar: new_total_summ_dollar,
      total_summ_euro: new_total_summ_euro
    });
  }

  renderCart() {
    return this.state.pizzas_in_cart.map(pizza => (
      <Card>
        <Card.Body>
          <button type="button" className="close" onClick={this.deletePizza.bind(this, pizza.id)} >&times;</button >
          <Card.Title>{pizza.name}</Card.Title>
          <Card.Text>
            {pizza.price_in_dollar}$ / {pizza.price_in_euro}€ count: 
              <input type="number" className="form-control col-1" id={pizza.id} min="1" style={{ display: "inline" }} 
                      value={Number(this.state.localStorage_pizza[pizza.id])} onChange={this.cartListener} />
          </Card.Text>
        </Card.Body>
      </Card>
    )
    )
  }

  sendOrder() {
    if (document.getElementById('address').value.length < 9 || document.getElementById('telephone').value.length < 10) {
      alert("Enter the delivery address and telephone number");
    }
    else {
      var tmp = this.state.pizzas_in_cart.slice();
      var name = document.getElementById("name").value;
      var telephone = document.getElementById("telephone").value.replace(/[^0-9]/g, '');
      var address = document.getElementById("address").value;
      var localStorage_pizza = Object.assign({}, this.state.localStorage_pizza);
      var orderData = tmp.map(function (pizza) {
        return {
          name_customer: name,
          telephone_number: telephone,
          delivery_address: address,
          pizza: pizza.name,
          count: parseInt(localStorage_pizza[pizza.id]),
          price_in_euro: Number(pizza.price_in_euro),
          price_in_dollar: Number(pizza.price_in_dollar),
        };
      });
      fetch('/api/order', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          alert("Your order is accepted");
          localStorage.setItem('cart_items', JSON.stringify({}));
          this.setState({ 
            pizzas_in_cart: [], 
            localStorage_pizza: JSON.parse(localStorage.getItem('cart_items')) 
          });
        })
    }
  }

  deletePizza(id) {
    var new_pizza_in_ls = Object.assign({}, this.state.pizza_in_ls);
    var localStorage_pizza = JSON.parse(localStorage.getItem('cart_items'));
    delete localStorage_pizza[id];
    localStorage.setItem('cart_items', JSON.stringify(localStorage_pizza));

    this.setState({
      pizzas_in_cart: this.state.pizzas_in_cart.filter(function (pizza) {
        return pizza.id != id;
      }),
      pizza_in_ls: new_pizza_in_ls
    });
  }

  render() {
    if (Object.keys(this.state.localStorage_pizza).length == 0) {
      return (
        <div>
          <h1>Cart is empty</h1>
          <br/>
          <h2> Order some pizza </h2>
        </div>
      );
    }
    return (
      <div>
        <Form>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={2}>
              First name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" id="name" placeholder="Enter your name" />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={2}>
              Delivery address
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" id="address" placeholder="Enter delivery address" />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={2}>
              Telephone number
            </Form.Label>
            <Col sm={10}>
              <PhoneInput id="telephone"
                country='ru'
                inputProps={{
                  id: 'telephone',
                  required: true
                }} />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={2}>
              Final price
            </Form.Label>
            <Col sm={10}>
              {this.state.total_summ_dollar.toFixed(2)}$ / {this.state.total_summ_euro.toFixed(2)}€
            </Col>
          </Form.Group>
          <Button variant="success" onClick={this.sendOrder.bind(this)}>
            Order
          </Button>
        </Form>
        <br />
        {this.renderCart()}
      </div>
    );
  }
}

