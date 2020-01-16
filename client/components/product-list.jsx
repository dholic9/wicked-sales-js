import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    };

  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const productsArray = this.state.products;

    return (
      <div className="row">
        {productsArray.map(product => {
          return (
            <div key={product.productId} className="product-card col-12 col-sm-6 col-md-4 mb-3">
              <ProductListItem
                setView={this.props.setView}
                name={product.name}
                price={product.price}
                image={product.image}
                productId={product.productId}
                shortDescription={product.shortDescription}
              />
            </div>
          );
        })}
      </div>
    );
  }

}
