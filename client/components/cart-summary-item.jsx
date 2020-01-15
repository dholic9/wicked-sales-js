import React from 'react'

export default class CartSummaryItem extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className="row">
        <div className="col-5">
          <img src={this.props.item.image} alt=""/>
        </div>
        <div className="col-7">
          <h3>{this.props.item.name}</h3>
          <h4>{"$"+this.props.item.price}</h4>
          <p>{this.props.item.shortDescription}</p>
        </div>
      </div>




    )
  }

}
