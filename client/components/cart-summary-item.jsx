import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleCartItemDelete = this.handleCartItemDelete.bind(this);
    this.handleCartAddQuantity = this.handleCartAddQuantity.bind(this);
  }

  handleCartItemDelete(event){
    this.props.delete(this.props.item)
  }

  handleCartAddQuantity(){
    let tempProductId = this.props.item.productId;

      let increaseItem = {
        productId: tempProductId
      }
    this.props.addToCart(increaseItem)

  }


  render() {

    console.log('item props', this.props);
    console.log('item state', this.state)

    return (
      <div className="row my-3 p-2 border cart-item">
        <div className="col-md-5 col-sm-12">
          <img className="cart-pic" src={this.props.item.image} alt=""/>
        </div>
        <div className="cart-item-detail col-sm-12 col-md-6">
          <h3>{this.props.item.name}</h3>
          <h5 className="text-secondary">{'$' + (this.props.item.price / 100).toFixed(2)}</h5>
          <p>{this.props.item.shortDescription}</p>
          <div className=" d-flex align-items-center mb-2 ">
            <button className="btn btn-sm border-dark">
              <i className="fas fa-minus"></i>
            </button>
            <div className="px-3 quantity-number">{this.props.item.quantity}</div>
            <button className="btn btn-sm border-dark" onClick={this.handleCartAddQuantity}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <button type='button' className="btn btn-danger" onClick={this.handleCartItemDelete}>Remove</button>
        </div>
      </div>
    );
  }

}
