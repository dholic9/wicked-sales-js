import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleCartItemDelete = this.handleCartItemDelete.bind(this);
    this.openDeleteConfirmation = this.openDeleteConfirmation.bind(this);
    this.handleCartAddQuantity = this.handleCartAddQuantity.bind(this);
    this.handleSetView = this.handleSetView.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleCartItemDelete() {
    this.props.delete(this.props.item);
  }

  openDeleteConfirmation() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  handleCartAddQuantity() {
    const tempProductId = this.props.item.productId;
    const increaseItem = {
      productId: tempProductId
    };
    this.props.addToCart(increaseItem);
  }

  handleSetView() {
    this.props.setView('details', { productId: this.props.item.productId });
  }

  render() {
    return (
      <div className="row my-3 p-2 border longFadeIn slideIn cart-item">
        <div className="col-md-5 col-sm-12">
          <img className="cart-pic" src={this.props.item.image} alt="" onClick={this.handleSetView}/>
        </div>
        <div className="cart-item-detail col-sm-12 col-md-6">
          <h3>{this.props.item.name}</h3>
          <h5 className="text-secondary">{'$' + (this.props.item.price / 100).toFixed(2)}</h5>
          <p>{this.props.item.shortDescription}</p>

          {/* <div className=" d-flex align-items-center mb-2 ">
            <button className="btn btn-sm border-dark">
              <i className="fas fa-minus"></i>
            </button>
            <div className="px-3 quantity-number">{this.props.item.quantity}</div>
            <button
              className="btn btn-sm border-dark"
              onClick={this.handleCartAddQuantity}>
              <i className="fas fa-plus"></i>
            </button>
          </div> */}

          <button type='button' className="btn btn-danger" onClick={this.openDeleteConfirmation}>Remove</button>
        </div>
        <div className={this.state.showModal
          ? 'modal fastFadeIn start-modal text-center'
          : 'modal fastFadeIn hidden start-modal text-center'}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content add-cart-modal align-items-center text-center justify-content-center">
              <div className="modal-body add-modal  flex-column justify-content-center">
                <h5 className='my-4 mx-5 '>Are you sure you want to remove {this.props.item.name} from your cart?</h5>
                <div className=" my-3 mx-2 row flex-row justify-content-around">
                  <div className="col-6">
                    <button className="btn btn-primary continue-button" onClick={this.closeModal} data-dismiss="modal">Cancel</button>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-danger  go-to-cart-button" onClick={this.handleCartItemDelete} data-dismiss="modal">Remove</button>
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
