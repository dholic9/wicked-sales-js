import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.handleCarouselClick = this.handleCarouselClick.bind(this)
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

  handleCarouselClick(event) {
    let clickedId = event.target.getAttribute('data-id')
    this.props.setView('details', {productId: clickedId})
  }

  render() {
    const productsArray = this.state.products;

    return (
      <React.Fragment>
        <div className="row justify-content-center align-items-center carousel mb-4">
          <div id="carouselExampleIndicators" className="carousel slide" data-interval="5500" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
            </ol>
            <div className="carousel-inner text-center">
              <div  className="carousel-item active">
                <img onClick={this.handleCarouselClick} className="d-block w-10 carousel-pic" data-id="6" src="/images/panda.jpg" alt="First slide" />
              </div>
              <div  className="carousel-item ">
                <img onClick={this.handleCarouselClick} className="d-block w-10 carousel-pic" data-id="1" src="/images/one2miniwhite.png" alt="Second slide"/>
              </div>
              <div  className="carousel-item">
                <img onClick={this.handleCarouselClick} className="d-block w-10 carousel-pic" src="/images/one2miniwhite-1.jpg" data-id="1" alt="Third slide"/>
              </div>
              <div  className="carousel-item">
                <img onClick={this.handleCarouselClick} className="d-block w-10 carousel-pic" src="/images/ducky-mecha.jpg" data-id="2" alt="Fourth slide"/>
              </div>
              <div  className="carousel-item">
                <img onClick={this.handleCarouselClick} className="d-block w-10 carousel-pic" src="/images/sakura.jpg" data-id="3" alt="Fifth slide" />
              </div>
              <div  className="carousel-item">
                <img onClick={this.handleCarouselClick} className="d-block w-10 carousel-pic" src="/images/anne-pro2white.jpg" data-id="5" alt="Sixth slide" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="row mb-5">
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
      </React.Fragment>
    );
  }

}
