import React from 'react'

export default class ProductDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      product: null,
    }
    this.productId = this.props.params.productId
    this.handleCatalogClick = this.handleCatalogClick.bind(this)
    this.handleAddCart = this.handleAddCart.bind(this)
  }

  componentDidMount(){
    fetch('/api/products/' + this.productId)
      .then(res => res.json())
      .then(data => {
        this.setState({product: data})
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleCatalogClick(){
    this.props.setView('catalog', {})
  }

  handleAddCart(){
    this.props.addToCart(this.state.product)
  }


  render(){
    return (
      <div className="product-detail row">
        <i onClick={this.handleCatalogClick} className="fas fa-angle-left text-secondary my-4 mr-2"></i>
        <div onClick={this.handleCatalogClick} className="backButton my-3 text-secondary ">  Back to catalog</div>
        <div className="row ">
          <div className="product-detail-image col-5">
            <img className="card-detail-image" src={this.state.product
                        ? this.state.product.image
                        : "loading"} alt=""/>
          </div>
          <div className="col-7 card-detail">
            <h2>{this.state.product
                  ? this.state.product.name
                  : "loading"}</h2>
            <h5 className="text-secondary">{this.state.product
                  ? ("$" + this.state.product.price.toFixed(2))
                  : "loading"}</h5>
            <p>{this.state.product
                  ? this.state.product.shortDescription
                  : "loading"}</p>
            <button onClick={this.handleAddCart} className="btn btn-primary" type="button">Add to Cart</button>
          </div>
          <div className="col-12">
            <p>{this.state.product
                  ? this.state.product.longDescription
                  : "loading"}</p>
          </div>
        </div>
      </div>
    )
  }

}
