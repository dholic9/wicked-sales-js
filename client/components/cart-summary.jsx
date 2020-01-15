import React from 'react'
import CartSummaryItem from './cart-summary-item'



export default class CartSummary extends React.Component{

  displayCartItems(){
    var cartArray = this.props.Array
    cartArray.map(item => {
      return (
        <CartSummaryItem item={item}></CartSummaryItem>
      )
    })
  }


render(){
  return(
    <div className="row">
      <div className="col">

      </div>
    </div>
    {this.displayCartItems()}
  )
}



}
