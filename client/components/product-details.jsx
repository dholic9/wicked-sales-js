import React from 'react'

export default class ProductDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      product: null,
    }
    this.productId = this.props.params.productId
    this.handleCatalogClick = this.handleCatalogClick.bind(this)
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



  render(){
    return (
      <div className="product-detail row">
        <i onClick={this.handleCatalogClick} className="fas fa-angle-left backButton my-4"></i>
        <div onClick={this.handleCatalogClick} className="backButton my-3">  Back to catalog</div>
        <div className="row">
          <div className="product-detail-image col-5">
            <img height="500px" width="500px" src={this.state.product
                        ? this.state.product.image
                        : "loading"} alt=""/>
          </div>
          <div className="col-7">
            <h2>{this.state.product
                  ? this.state.product.name
                  : "loading"}</h2>
            <h5>{this.state.product
                  ? ("$" + this.state.product.price)
                  : "loading"}</h5>
            <p>{this.state.product
                  ? this.state.product.shortDescription
                  : "loading"}</p>
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
