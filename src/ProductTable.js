import React from 'react';
import ProductRow from './ProductRow.js';
import ProductTableHeader from './ProductTableHeader';

class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.sortByKeyAndOrder = this.sortByKeyAndOrder.bind(this);
        this.orderState = this.orderState.bind(this);
        //this.sortProducts = this.sortProducts.bind(this);
        this.state = {
            sort: {
                column: "name",
                direction: 'desc'
            }
        };
    }
    //component for changing the state from the producttableheader;
    orderState(column, direction) {
        this.setState({
            sort: {
                column: column,
                direction: direction
            }
        });

    }
    //component for sorting products in ascending and descending order
    sortByKeyAndOrder(objectA, objectB) {
        let isDesc = this.state.sort.direction === 'desc' ? -1 : 1;
        let [ a, b ] = [ objectA[ this.state.sort.column ], objectB[ this.state.sort.column ] ];
        if (this.state.sort.column === 'price') {
            [ a, b ] = [ a, b ].map((value) => parseFloat(value.replace(/[^\d.]/g, ''), 10));
        }
        if (a > b) {
            return 1 * isDesc;
        }
        if (a < b) {
            return -1 * isDesc;
        }
        return 0;
    }
    sortProducts() {
        //putting the Products into an array for easy iteration
        let productsAsArray = Object.keys(this.props.products).map((pid) => this.props.products[ pid ]);
        return productsAsArray.sort(this.sortByKeyAndOrder);
    }
    render() {
        let rows = [];
        this.sortProducts().forEach((product) => {
            //filtering the products by name and stock
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
                //console.log(product.name.indexOf(this.props.filterText))

            }
            rows.push(
                <ProductRow product={product} key={product.id} onDestroy={this.props.onDestroy} editProduct={this.props.editProduct} />

            );
        });
        return (
            <table>
                <thead>
                    <tr>
                        <ProductTableHeader
                            currentSort={this.state.sort}
                            column="name"
                            sortProducts={this.sortProducts}
                            orderState={this.orderState}
                        />
                        <ProductTableHeader
                            currentSort={this.state.sort}
                            column="price"
                            sortProducts={this.sortProducts}
                            orderState={this.orderState}
                        />

                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default ProductTable;