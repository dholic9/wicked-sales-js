import React from 'react'
import CartSummaryItem from './cart-summary-item'



export default class CartSummary extends React.Component{
  constructor(props) {
    super(props)
    this.handleSetView = this.handleSetView.bind(this)
  }

  displayCartItems(){
    var cartArray = this.props.Array
    console.log('cartsummary ', cartArray)
    return cartArray.map(item => {
      return (
        <CartSummaryItem key={item.cartItemId} item={item}></CartSummaryItem>
      )
    })
  }

  handleSetView(){
    this.props.setView("catalog", {})
  }

render(){
  return(
    <div className="container">
      <div className="row">
        <div className="col text-secondary backButton">
          <span>
            <i onClick={this.handleSetView} className="fas fa-angle-left mt-2 mr-2 backButton"></i>
          </span>
          <div onClick={this.handleSetView} className="backButton ">  Back to catalog</div>
        </div>
      </div>
      <div className="row ">
        <h1>My Cart</h1>
      </div>
      {this.displayCartItems()}
    </div>
  )
}



}
