import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

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
      cart: [],
      showModal: true,
      showCheckoutModal: false,
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleCheckoutModalClose = this.handleCheckoutModalClose.bind(this);
    this.handleShowCheckoutModal = this.handleShowCheckoutModal.bind(this);
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
          setView={this.setView}
          showModal={this.state.showModal}
          handleModalClose={this.handleModalClose}
          showCheckoutModal={this.state.showCheckoutModal}
          handleCheckoutModalClose={this.handleCheckoutModalClose}
        />
      );
    } else if (this.state.view.name === 'details') {
      return (
        <ProductDetails
          params={this.state.view.params}
          setView={this.setView}
          addToCart={this.addToCart} />
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <CartSummary
          setView={this.setView}
          Array={this.state.cart}
          delete={this.deleteFromCart} />
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <CheckoutForm
          setView={this.setView}
          placeOrder={this.placeOrder}
          cart={this.state.cart}
          showModal={this.handleShowCheckoutModal}/>
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
        const cartArr = [...this.state.cart];
        cartArr.push(data);
        this.setState({ cart: cartArr });
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
        this.setState({
          cart: [],
          view: {
            name: 'catalog',
            params: {}
          }
        });
      });
  }

  deleteFromCart(cartItem) {
    const cartItemId = cartItem.cartItemId;
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE',
      body: JSON.stringify(cartItemId)
    })
      .then(res => {
        const stateCart = [...this.state.cart];
        const result = stateCart.filter(index => index.cartItemId !== cartItemId);
        this.setState({ cart: result });
      });
  }

  handleModalClose(event) {
    this.setState({ showModal: false })
  }

  handleShowCheckoutModal() {
    this.setState({ showCheckoutModal: true})
  }

  handleCheckoutModalClose() {
    this.setState({ showCheckoutModal: false });
  }

  render() {
    return (
      <Router>
        <div>
          <Header
            cartItemCount={this.state.cart.length}
            setView={this.setView}>
          </Header>
          <div className="container-fluid">
            {this.showView()}
          </div>
        </div>
      </Router>
    );
  }
}
