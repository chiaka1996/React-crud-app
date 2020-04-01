import React from 'react';
import Filters from './Filters.js';
import ProductTable from './ProductTable.js';
import ProductForm from './ProductForm.js';

var PRODUCTS = {
    '1': {id: 1, category: 'Musical Instruments', price: '$459.99', stocked: true, name: 'Clarinet'},
    '2': {id: 2, category: 'Musical Instruments', price: '$5,000', stocked: true, name: 'Cello'},
    '3': {id: 3, category: 'Musical Instruments', price: '$11,000', stocked: false, name: 'Fortepiano'},
    '4': {id: 4, category: 'Furniture', price: '$799', stocked: true, name: 'Chaise Lounge'},
    '5': {id: 5, category: 'Furniture', price: '$1,300', stocked: false, name: 'Dining Table'},
    '6': {id: 6, category: 'Furniture', price: '$100', stocked: true, name: 'Bean Bag'}
  };

class Products extends React.Component{
    constructor(props){
        super(props);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.state = {
            filterText:'',
            inStockOnly: false,
            products: PRODUCTS,
            editedProduct:{},
            editStatus: false
        }
    }

//component to edit product
    editProduct(productId) {
        this.setState({
            editedProduct: Object.assign({},this.state.products[productId])
        })
        console.log(this.state.editedProduct);
    }

    //component to delete product
    handleDestroy(productId) {
        this.setState((prevState) => {
            let products = prevState.products;
            delete products[productId];
            return{products};
        })
    }

    //component to save product
    saveProduct(product){
        product.id = new Date().getTime();
        this.setState((prevState) => {
            let products = prevState.products;
            products[product.id] = product;
            return{products};
        })
    }

    //component to filter products
    handleFilter(filterInput){
        this.setState(filterInput);
    }
    render(){
        return(
            <div>
               <Filters 
               filterText = {this.state.filterText}
               inStockOnly ={this.state.inStockOnly}
               onFilter = {this.handleFilter}
               />
               <ProductTable  
               products={this.state.products}
               filterText = {this.state.filterText}
               inStockOnly ={this.state.inStockOnly}
               onDestroy = {this.handleDestroy}
               editProduct = {this.editProduct}
               />
               <ProductForm editedProducts={this.state.editedProduct} onSave = {this.saveProduct} editedStatus={this.state.editStatus}/>
            </div>
        );

    }
}

export default Products;