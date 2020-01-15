import React from 'react';

export default class Header extends React.Component {
  constructor(props){
    super(props)
    this.handleCartView = this.handleCartView.bind(this)
  }

  handleCartView(){
    this.props.setView("cart", {})
  }

  render() {
    let cartItemCount = this.props.cartItemCount
    return (
      <nav className="navbar text-white navbar-expand-lg navbar-dark bg-dark">
        <h3>$Wicked Sales</h3>
        <div onClick={this.handleCartView} className="cart">
          <p className="m-0 cart-item-number">{cartItemCount===1
                ? cartItemCount+"  Item"
                : cartItemCount+"  Items"}</p>
          <i className="fas mt-1 mx-2 fa-shopping-cart"></i>
        </div>
      </nav>
    );
  }
}
