import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDetailClick = this.handleDetailClick.bind(this)
  }

  handleDetailClick(event) {
    console.log('product list : click fired')
    console.log(this.props)
    this.props.setView('details', { productId: this.props.productId})
  }



  render() {
    return (
      <div
        onClick={this.handleDetailClick}
        className="card   align-items-center justify-content-center"
        style={{
          width: '100%',
          height: '33rem'
        }}>
        <img src={this.props.image} height="250px" width="100%" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h6>{'$' + this.props.price}</h6>
          <h5>{this.props.name}</h5>
          <p className="card-text">{this.props.shortDescription}</p>
        </div>
      </div>
    );
  }
}
