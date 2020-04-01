import React from 'react';
import './ProductRow.css'

class ProductRow extends React.Component {
  constructor(props){
    super(props);
    this.destroy = this.destroy.bind(this);
    this.editRow = this.editRow.bind(this);
  }
  
  editRow(){
    this.props.editProduct(this.props.product.id)
  }

  //component to delete roww
  destroy(){
    this.props.onDestroy(this.props.product.id);
  }
  render() {
    return (
      <tr>
        <td>
          <span className={this.props.product.stocked ? "": "Product-out-of-stock"}>
            {this.props.product.name}
          </span>
        </td>
        <td>
          {this.props.product.price}
        </td>
        <td>
          <button className='delete' onClick={this.destroy}>x</button>
          <button className='edit' onClick={this.editRow}>edit</button>
        </td>
      </tr>
    );
  }
}

export default ProductRow;