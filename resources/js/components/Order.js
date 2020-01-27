import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Card, Button, Form, FormControl } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default class Order extends Component {

  constructor() {
    super();
    this.state = {
      orders: [],
    }
    this.getOrders = this.getOrders.bind(this);
  }


  getOrders() {
    var telephone_number = document.getElementById("phone").value.replace(/[^0-9]/g, '');
    fetch(`/api/order/${telephone_number}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(orders => {
        this.setState({ orders: orders });
      });
  }

  renderOrders() {
    if (this.state.orders.length == 0) {
      return (
        <h1>Nothing found</h1>
      );
    }
    else {
      return this.state.orders.map(order => {
        return (
          <Card>
            <Card.Body>
              <Card.Title> Order description </Card.Title>
              <Card.Text>
                Telephone : {order.telephone_number} <br />
                Name : {order.name_customer} <br />
                Pizza : {order.pizza} <br />
                Price : {order.price_in_dollar} dollar / {order.price_in_euro} euro <br />
                Count : {order.count} <br />
                Addres : {order.delivery_address}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })
    }
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <h1>Search for orders</h1>
            <br />
            <div className="col-5">
              <PhoneInput
                country='ru'
                inputProps={{
                  id: 'phone',
                  required: true,
                }} />
            </div>
          </Form.Group>
          <div className="col-5">
            <Button variant="primary" onClick={this.getOrders}>
              Find
                </Button>
          </div>
        </Form>
        <br />
        <div>
          {this.renderOrders()}
        </div>
      </div>
    );
  }
}

if (document.getElementById('example')) {
  ReactDOM.render(<Order />, document.getElementById('example'));
}

