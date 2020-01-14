import React from 'react'

export default class ProductDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      product: null,
    }
    this.productId = this.props.params.productId
    this.handleLongDescription = this.handleLongDescription.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }

  componentDidMount(){
    fetch('/api/products/' + this.productId)
      .then(res => res.json())
      .then(data => {
        this.setState({product: data})
        console.log('product details state', this.state)
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleLongDescription(){
    if(!this.state.product){
      return "Loading..."
    } else {
      return this.state.product.longDescription
    }
  }

  handleImage(){
    if(!this.state.product){
      return "Loading..."
    } else {
      return (this.state.product.image)
    }
  }


  render(){
    return (
      <div className="row">
        <div className="col-5">
          <img src={this.state.product
                    ? this.state.product.image
                    : "nothing"} alt=""/>
        </div>
        <div className="col-7">
          <h2>{this.state.product
              ? this.state.product.name
              : "hello"}</h2>
          <h5>{this.state.product
            ? ("$" + this.state.product.price)
            : "hello"}</h5>
          <p>{this.state.product
            ? this.state.product.shortDescription
            : "hello"}</p>
        </div>
        <div className="col-12">
          <p>{this.handleLongDescription()}</p>
        </div>
      </div>
    )
  }

}
