import React from 'react';

export default class Header extends React.Component {





  render() {
    let cartItemCount = this.props.cartItemCount

    return (
      <nav className="navbar text-white navbar-expand-lg navbar-dark bg-dark">
        <h3>$Wicked Sales</h3>
        <div className="cart">
          <p className="cart-item-number">{cartItemCount=1
                ? cartItemCount+"  Item"
                : cartItemCount+"  Itms"}</p>
          <i className="fas fa-shopping-cart"></i>
        </div>
      </nav>
    );
  }
}
