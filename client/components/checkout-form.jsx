import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      creditCard: null,
      shippingAddress: null
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressChange = this.handleShippingAddressChange.bind(this);
    this.handleBackToCatalog = this.handleBackToCatalog.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleCreditCardChange(event) {
    this.setState({
      creditCard: event.target.value
    });
  }

  handleShippingAddressChange(event) {
    this.setState({
      shippingAddress: event.target.value
    });
  }

  handleBackToCatalog() {
    this.props.setView('catalog', {});
  }

  handleSubmit(event) {
    event.preventDefault();




    const orderInformation = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(orderInformation);
    this.props.showModal();
  }

  displayTotalPrice() {
    let total = 0;
    this.props.cart.map(index => {
      total += Number(index.price / 100);
    });
    return total.toFixed(2);
  }

  render() {
    return (
      <div className="row flex-column mt-4 px-4 ">
        <div className="col-12  p-0">
          <h1>My Cart</h1>
        </div>
        <div className="row mb-4 mt-2">
          <div className="col-12 text-secondary">
            <h4>{'Order Total: $' + this.displayTotalPrice()}</h4>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 ">
            <form onSubmit={this.handleSubmit} className="input-group flex-column">
              <div className="form-group">
                <div className="input-group w-100 flex-column">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control w-100"
                    name="name"
                    id="name"
                    required
                    autoFocus
                    onChange={this.handleNameChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group flex-column">
                  <label htmlFor="creditCard">Credit Card</label>
                  <input
                    type="text"
                    className="form-control w-100"
                    name="creditCard"
                    id="creditCard"
                    required
                    autoFocus
                    onChange={this.handleCreditCardChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group flex-column w-100">
                  <label htmlFor="shippingAddress">Shipping Address</label>
                  <textarea
                    required
                    autoFocus
                    className="form-control w-100"
                    name="shippingAddress"
                    id="shippingAddress"
                    cols="30"
                    rows="5"
                    onChange={this.handleShippingAddressChange}
                  ></textarea>
                </div>
              </div>
              <div className="input-group-append w-100 justify-content-between align-items-center ">
                <div className=" d-flex flex-row">
                  <i onClick={this.handleBackToCatalog} className="fas fa-angle-left text-secondary pt-4 px-2 "></i>
                  <div onClick={this.handleBackToCatalog} className="backButton my-3 text-secondary "> Continue Shopping</div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary  float-right rounded">
                        Place Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
