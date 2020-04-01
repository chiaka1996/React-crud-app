import React from 'react';
import './ProductTableHeader.css';

class ProductTableHeader extends React.Component {
  constructor(props){
    super(props);
    this.setTheOrder = this.setTheOrder.bind(this);

  }
   setTheOrder(e){
    
    this.props.orderState(this.props.column, e.target.value);
   }
  render() {
    let currentSort = this.props.currentSort.column === this.props.column ? this.props.currentSort.direction : false;
    return(
      <th>
        {this.props.column}
        <button
          className={currentSort === 'asc' ? 'currentHeader' : ''}
          value="asc"
          onClick={this.setTheOrder}
        >&#x25B2;</button>
        <button
          className={currentSort === 'desc' ? 'currentHeader' : ''}
          value="desc"
          onClick ={this.setTheOrder}
        >&#x25BC;</button>
      </th>
  );
  }
}

export default ProductTableHeader;