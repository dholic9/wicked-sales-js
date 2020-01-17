import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetView = this.handleSetView.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this)
  }

  displayCartItems() {
    var cartArray = this.props.Array;
    return cartArray.map(item => {
      return (
        <CartSummaryItem key={item.cartItemId} item={item} deleteFromCart={this.props.deleteFromCart}></CartSummaryItem>
      );
    });
  }

  handleSetView() {
    this.props.setView('catalog', {});
  }

  displayTotalPrice() {
    let sum = 0;
    this.props.Array.map(index => {
      sum += Number(index.price/100);
    });
    return sum.toFixed(2);
  }

  goToCheckout(event){
    this.props.setView('checkout', {})
  }

  render() {
    console.log('cart summary props:', this.props)
    return (
      <div className="container">
        <div className="row">
          <div className="text-secondary backButton mb-2">
            <span>
              <i onClick={this.handleSetView} className="fas fa-angle-left mt-1 mr-2 backButton"></i>
            </span>
            <div onClick={this.handleSetView} className="backButton ">  Back to catalog</div>
          </div>
        </div>
        <div className="row mb-2">
          <h1>My Cart</h1>
        </div> {
          this.props.Array.length<1
            ?(<div className="row  my-3 ">
                <h6>Your Shopping Cart is empty.</h6>
              </div>)
            : this.displayCartItems()
          }
        <div className="row border-top border-dark justify-content-between my-4 mb-4 pb-4 pt-2">
          <div className="flex-row ">
            <h4 className="total-price">{'Cart Total: $' + this.displayTotalPrice()}</h4>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.goToCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }

}
