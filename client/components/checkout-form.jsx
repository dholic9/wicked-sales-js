import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      creditCard: null,
      shippingAddress: null,
      nameIsValid: true,
      cardIsValid: true,
      addressIsValid: true,
      showButton: true
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressChange = this.handleShippingAddressChange.bind(this);
    this.handleBackToCatalog = this.handleBackToCatalog.bind(this);
    this.blurNameTest = this.blurNameTest.bind(this);
    this.blurCardTest = this.blurCardTest.bind(this);
    this.blurAddressTest = this.blurAddressTest.bind(this);
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

  blurNameTest(event) {
    const nameStr = event.target.value;
    nameStr.trim();
    if (!nameStr) {
      this.setState({ nameIsValid: true });
    } else if (nameStr.length < 5) {
      this.setState({ nameIsValid: false });
    } else {
      this.setState({ nameIsValid: true });
    }
  }

  blurCardTest(event) {
    const cardStr = event.target.value;
    cardStr.trim();
    if (!cardStr) {
      this.setState({ cardIsValid: true });
    } else if (isNaN(cardStr)) {
      this.setState({ cardIsValid: false });
    } else if (cardStr.length !== 16) {
      this.setState({ cardIsValid: false });
    } else {
      this.setState({ cardIsValid: true });
    }
  }

  blurAddressTest(event) {
    const addressStr = event.target.value;
    addressStr.trim();
    if (!addressStr) {
      this.setState({ addressIsValid: true });
    } else if (addressStr.length < 21) {
      this.setState({ addressIsValid: false });
    } else {
      this.setState({ addressIsValid: true });
    }
  }

  handleBackToCatalog() {
    this.props.setView('catalog', {});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.nameIsValid === false || this.state.cardIsValid === false || this.state.addressIsValid === false) {
      alert('could not process the order until all fields are filled out');
      return;
    }
    const orderInformation = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(orderInformation);
    this.props.showModal();
    this.handleBackToCatalog();
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
      <div className="row longFadeIn flex-column mt-4 px-4 ">
        <div className="col-12 p-0">
          <h1>My Cart</h1>
        </div>
        <div className="row mb-4 mt-2">
          <div className="col-12 text-secondary">
            <h4>{'Order Total: $' + this.displayTotalPrice()}</h4>
          </div>
        </div>
        <div className="row justify-content-center mb-3">
          <div className="col-12">
            <form id="form" onSubmit={this.handleSubmit} className="input-group card flex-column border rounded p-3">
              <div className="form-group">
                <h3 className="col-12 p-0 mb-3">Shipping/Billing Address</h3>
                <div className="input-group w-100 flex-column">
                  <label htmlFor="name">Name</label>
                  { this.state.nameIsValid
                    ? <input
                      type="text"
                      className="form-control rounded w-100"
                      name="name"
                      id="name"
                      minLength="5"
                      maxLength="65"
                      required
                      autoFocus
                      onChange={this.handleNameChange}
                      onBlur={this.blurNameTest}/>
                    : <input
                      type="text"
                      className="form-control isInvalid rounded w-100"
                      name="name"
                      id="name"
                      minLength="5"
                      maxLength="65"
                      required
                      autoFocus
                      onChange={this.handleNameChange}
                      onBlur={this.blurNameTest}/>
                  }
                  { this.state.nameIsValid
                    ? <div className="feedback d-none">
                      <small>Minimum of 5 characters.</small>
                    </div>
                    : <div className="feedback ">
                      <small>Minimum of 5 characters.</small>
                    </div>
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="input-group flex-column">
                  <label htmlFor="creditCard">Credit Card</label>
                  { this.state.cardIsValid
                    ? <input
                      type="text"
                      className="form-control rounded w-100"
                      name="creditCard"
                      id="creditCard"
                      required
                      autoFocus
                      maxLength="16"
                      onChange={this.handleCreditCardChange}
                      onBlur={this.blurCardTest}/>
                    : <input
                      type="text"
                      className="form-control isInvalid rounded w-100"
                      name="creditCard"
                      id="creditCard"
                      required
                      autoFocus
                      maxLength="16"
                      onChange={this.handleCreditCardChange}
                      onBlur={this.blurCardTest}/>
                  }
                  {this.state.cardIsValid
                    ? <div className="feedback d-none">
                      <small>Invalid credit card number.</small>
                    </div>
                    : <div className="feedback ">
                      <small>Invalid credit card number.</small>
                    </div>
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="input-group rounded flex-column w-100">
                  <label htmlFor="shippingAddress">Shipping Address</label>
                  {this.state.addressIsValid
                    ? <textarea
                      autoFocus
                      className="form-control rounded w-100"
                      name="shippingAddress"
                      id="shippingAddress"
                      required
                      cols="30"
                      rows="5"
                      minLength="21"
                      maxLength="156"
                      onChange={this.handleShippingAddressChange}
                      onBlur={this.blurAddressTest}>
                    </textarea>
                    : <textarea
                      autoFocus
                      className="form-control isInvalid rounded w-100"
                      name="shippingAddress"
                      id="shippingAddress"
                      required
                      cols="30"
                      rows="5"
                      minLength="21"
                      maxLength="156"
                      onChange={this.handleShippingAddressChange}
                      onBlur={this.blurAddressTest}>
                    </textarea>
                  }
                  {this.state.addressIsValid
                    ? <div className="feedback d-none">
                      <small>Minimum of 21 characters.</small>
                    </div>
                    : <div className="feedback ">
                      <small>Minimum of 21 characters.</small>
                    </div>
                  }
                </div>
              </div>
              <div className="input-group-append w-100 justify-content-between align-items-center ">
                <div className=" d-flex flex-row">
                  <i onClick={this.handleBackToCatalog} className="fas fa-angle-left text-secondary pt-4 px-2 "></i>
                  <div onClick={this.handleBackToCatalog} className="backButton my-3 text-secondary "> Continue Shopping</div>
                </div>
                <div>
                  {this.state.showButton
                    ? <button
                      type="submit"
                      className="btn btn-primary float-right rounded" >
                        Place Order
                    </button>
                    : <button
                      type="button"
                      className="btn btn-secondary float-right rounded">
                      Place Order
                    </button>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
