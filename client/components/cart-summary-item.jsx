import React from 'react'

export default class CartSummaryItem extends React.Component {
  constructor(props){
    super(props)
    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this)
  }

  handleDeleteFromCart(){
    let cartItemId = this.props.item.cartItemId
    this.props.deleteFromCart(cartItemId)
  }


  render(){
    console.log('cart summary item Props: ', this.props)
    return(
      <div className="row my-3 p-2 border cart-item">
        <div className="col-5">
          <img height="250px" width="300px" src={this.props.item.image} alt=""/>
        </div>
        <div className="col-7">
          <div className="row pl-3 justify-content-between align-items-start ">
            <h3>{this.props.item.name}</h3>
            <button type="button" onClick={this.handleDeleteFromCart} className="close " aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <h5 className="text-secondary">{"$"+(this.props.item.price/100).toFixed(2)}</h5>
          <p>{this.props.item.shortDescription}</p>
              <button onClick={this.handleDeleteFromCart} type="button" className="btn btn-outline-info">Delete</button>
        </div>
      </div>
    )
  }

}
