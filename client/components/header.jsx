import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleCartView = this.handleCartView.bind(this);
    this.handleBackToHomeClick = this.handleBackToHomeClick.bind(this);
  }

  handleCartView() {
    this.props.setView('cart', {});
  }

  handleBackToHomeClick(event) {
    this.props.setView('catalog', {});
  }

  render() {
    const cartItemCount = this.props.cartItemCount;
    return (
      <nav className="navbar align-middle navbar-expand-lg">
        <div className="home-button d-flex align-items-center flex-row" onClick={this.handleBackToHomeClick}>
          <img className="icon" src="/images/key1.png"/>
          <h3 className="home-button title">Mechanical Keys</h3>
        </div>
        <div onClick={this.handleCartView} className="cart pb-1">
          <p className="m-0 cart-item-number">{cartItemCount === 1
            ? cartItemCount + '  Item'
            : cartItemCount + '  Items'}</p>
          <i className="fas mt-1 mx-2 fa-shopping-cart "></i>
        </div>
      </nav>
    );
  }
}
