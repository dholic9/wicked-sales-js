import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);

    this.handleSetView = this.handleSetView.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
    this.displayCartItems = this.displayCartItems.bind(this);
  }

  displayCartItems() {

    const cartArray = [...this.props.Array];

    // console.log('cartarray BEFORE', cartArray)



    // console.log('AFTER', cartArray)

    return cartArray.map(item => {
      return (
        <CartSummaryItem
          key={item.cartItemId}
          delete={this.props.delete}
          item={item}
          addToCart={this.props.addToCart}>
        </CartSummaryItem>
      );
    });

    // this.setState();
  }

  handleSetView() {
    this.props.setView('catalog', {});
  }

  displayTotalPrice() {
    let sum = 0;
    this.props.Array.map(index => {
      sum += Number((index.price * index.quantity) / 100);
    });
    return sum.toFixed(2);
  }

  goToCheckout(event) {
    this.props.setView('checkout', {});
  }

  render() {
    return (
      <div className="container fadeIn">
        <div className="row">
          <div className="text-secondary backButton mb-2">
            <span>
              <i onClick={this.handleSetView} className="fas fa-angle-left mt-1 mr-2 backButton"></i>
            </span>
            <div onClick={this.handleSetView} className="backButton ">  Back to catalog</div>
          </div>
        </div>
        <div className="row ">
          <h1>My Cart</h1>
        </div>
          {this.props.Array.length === 0
            ? <div className="row">
                <h3>Your Shopping Cart is empty.</h3>
              </div>
            : this.displayCartItems()}
        <div className="row justify-content-between mb-4 pb-4 pt-2">
          {this.props.Array.length === 0
            ? ''
            : (<div className="flex-row">
                <h4 className="total-price">{'Cart Total: $' + this.displayTotalPrice()}</h4>
              </div>)
          }
          <div>
            {this.props.Array.length === 0
              ? ''
              : <button
                type="button"
                className="btn btn-primary"
                onClick={this.goToCheckout}>
                    Checkout
                </button>}
          </div>
        </div>
      </div>
    );
  }
}
