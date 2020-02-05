import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  showView() {
    if (this.state.view.name === 'catalog') {
      return (
        <ProductList
          setView={this.setView}>
        </ProductList>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <ProductDetails
          params={this.state.view.params}
          setView={this.setView}
          addToCart={this.addToCart}>
        </ProductDetails>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <CartSummary
          setView={this.setView}
          Array={this.state.cart}>
        </CartSummary>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <CheckoutForm
          setView={this.setView}
          placeOrder={this.placeOrder}
          cart={this.state.cart}
        >
        </CheckoutForm>
      );
    }
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        this.setState({ cart: data });
      });
  }

  addToCart(product) {
    fetch('api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        console.log('addtocart fetch data: ', data);
        const cartArr = [...this.state.cart];
        cartArr.push(data);
        this.setState({ cart: cartArr });
        console.log('state after add cart', this.state);
      })
      .catch(err => { console.error(err); });
  }

  placeOrder(orderObject) {
    fetch('api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderObject)
    })
      .then(res => res.json())
      .then(data => {
        console.log('placedorder data: ', data);
        this.setState({
          cart: [],
          view: {
            name: 'catalog',
            params: {}
          }
        });
      });
  }

  render() {
    return (
      <div>
        <Header
          cartItemCount={this.state.cart.length}
          setView={this.setView}>
        </Header>
        <div className="container-fluid">
          {this.showView()}
        </div>
      </div>

    );
  }
}
