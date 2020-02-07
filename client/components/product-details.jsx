import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.productId = this.props.params.productId;
    this.handleCatalogClick = this.handleCatalogClick.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
  }

  componentDidMount() {
    fetch('/api/products/' + this.productId)
      .then(res => res.json())
      .then(data => {
        this.setState({ product: data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleCatalogClick() {
    this.props.setView('catalog', {});
  }

  handleAddCart() {
    this.props.addToCart(this.state.product);
  }

  render() {
    return (
      <div className="product-detail mx-4 mb-5 fadeIn">
        <div className="row flex-row">
          <i onClick={this.handleCatalogClick} className="fas fa-angle-left d-flex text-secondary my-4 mr-2 ml-2"></i>
          <div onClick={this.handleCatalogClick} className="backButton my-3 text-secondary ">  Back to catalog</div>
        </div>

        <div className="row card-body ">
          <div className="product-detail-image text-center col-sm-12 col-md-5">
            <img className="card-detail-image" src={this.state.product
              ? this.state.product.image
              : 'loading'} alt=""/>
          </div>
          <div className="col-md-7 col-sm-12 card-detail">
            <h2>{this.state.product
              ? this.state.product.name
              : 'loading'}</h2>
            <h5 className="text-secondary">{this.state.product
              ? ('$' + (this.state.product.price / 100).toFixed(2))
              : 'loading'}</h5>
            <p>{this.state.product
              ? this.state.product.shortDescription
              : 'loading'}</p>
            <button onClick={this.handleAddCart} className="btn btn-primary" type="button">Add to Cart</button>
          </div>
          <div className="col-12 detail-long">
            <p>{this.state.product
              ? this.state.product.longDescription
              : 'loading'}</p>
          </div>
        </div>
      </div>
    );
  }

}
