import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      showModal: false,
    };
    this.productId = this.props.params.productId;
    this.handleCatalogClick = this.handleCatalogClick.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.goToCart = this.goToCart.bind(this)
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

  closeModal(){
    this.setState({showModal: false})
  }

  goToCart(){
    this.props.setView('cart', {})
  }


  handleAddCart() {
    this.props.addToCart(this.state.product);
    this.setState({showModal: true})

  }

  render() {
    return (
      <div className="product-detail mx-4 mb-5 fadeIn">
        <div className="row flex-row clickable">
          <i onClick={this.handleCatalogClick} className="fas fa-angle-left d-flex text-secondary my-4 mr-2 ml-2"></i>
          <div onClick={this.handleCatalogClick} className="backButton my-3 text-secondary ">  Back to catalog</div>
        </div>
        <div className="row card-body ">
          <div className="product-detail-image text-center col-sm-12 col-lg-7 p-0 pr-3 mb-4">
            <img className="card-detail-image" src={this.state.product
              ? this.state.product.image
              : 'loading'} alt=""
            />
          </div>
          <div className="col-md-12 col-lg-5 col-sm-12 mb-3 card-detail">
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
          <div className="col-12 border-top pt-4 detail-long">
            <h4><u>Product Description:</u></h4>
            <p>{this.state.product
              ? this.state.product.longDescription
              : 'loading'}</p>
          </div>
        </div>

        <div className={this.state.showModal
          ? "modal longFadeIn start-modal text-center"
          : "modal longFadeIn hidden start-modal text-center"}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content add-cart-modal align-items-center text-center justify-content-center">
              <div className="modal-body p-0  flex-column justify-content-center">
                <h5 className='my-4 mx-5 '>Item has been added to your cart</h5>
                <div className=" my-3 mx-2 row flex-row justify-content-around">
                  <div className="col-6">
                    <button className="btn btn-primary continue-button" onClick={this.closeModal} data-dismiss="modal">Continue Shopping</button>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-danger  go-to-cart-button"  onClick={this.goToCart} data-dismiss="modal">Go To Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

}
