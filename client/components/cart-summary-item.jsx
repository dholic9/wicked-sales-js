import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleCartItemDelete = this.handleCartItemDelete.bind(this)
  }

  handleCartItemDelete(event){
    this.props.delete(this.props.item)
  }


  render() {
    return (
      <div className="row my-3 p-2 border cart-item">
        <div className="col-md-5 col-sm-12">
          <img className="cart-pic" src={this.props.item.image} alt=""/>
        </div>
        <div className="cart-item-detail col-sm-12 col-md-6">
          <h3>{this.props.item.name}</h3>
          <h5 className="text-secondary">{'$' + (this.props.item.price / 100).toFixed(2)}</h5>
          <p>{this.props.item.shortDescription}</p>
          <button type='button' className="btn btn-secondary" onClick={this.handleCartItemDelete}>Remove</button>
        </div>
      </div>
    );
  }

}
