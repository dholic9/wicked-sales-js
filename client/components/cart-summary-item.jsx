import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    return (
      <div className="row my-3 p-2 border cart-item">
        <div className="col-5">
          <img height="250px" width="300px" src={this.props.item.image} alt=""/>
        </div>
        <div className="cart-item-detail col-sm-12 col-md-6">
          <h3>{this.props.item.name}</h3>
          <h5 className="text-secondary">{'$' + (this.props.item.price / 100).toFixed(2)}</h5>
          <p>{this.props.item.shortDescription}</p>
        </div>
      </div>
    );
  }

}
