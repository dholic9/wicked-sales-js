import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDetailClick = this.handleDetailClick.bind(this);
  }

  handleDetailClick(event) {
    this.props.setView('details', { productId: this.props.productId });
  }

  render() {
    return (
      <div
        onClick={this.handleDetailClick}
        className="card longFadeIn  feature-card h-100">
        <img src={this.props.image}
          className="card-img-top" alt="..."/>
        <div className="card-body">
          <h6 className="text-secondary">{'$' + (this.props.price / 100).toFixed(2)}</h6>
          <h5>{this.props.name}</h5>
          <p className="card-text">{this.props.shortDescription}</p>
        </div>
      </div>
    );
  }
}
