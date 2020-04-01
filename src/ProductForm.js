import React from 'react';
import './ProductRow.css'
const RESET_VALUES = {id: '', category: '', price: '', stocked: false, name: ''};

class ProductForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      product:  this.props.editedStatus === false ? Object.assign({}, RESET_VALUES) : Object.assign({}, this.props.editedStatus),
      nameState: true,
      categoryState:true,
      priceState:true,
      name:"",
      category:"",
      price: ""

    }
  }
  //function to save products from form inputs
  handleSave(e){
    if((this.state.product['name']==="" || this.state.product['category']==="") || this.state.product['price']===""){
    if(this.state.product['name']===""){
      this.setState({
        name: "name cannot be empty",
        nameState:false
      })
     
    }
    
    //check for blank fields
    if(this.state.product['category']===""){
      this.setState({
        category: "category cannot be empty",
        categoryState: false
       
      })
      
    }
   
    if(this.state.product['price']===""){
      this.setState({
       price:"price cannot be empty",
       priceState: false 
      })
    }
    
    e.preventDefault();
  }

    else{
    this.props.onSave(this.state.product);
    //reset the form values to blank after submitting
    this.setState({
      product: Object.assign({}, RESET_VALUES)
    });
    //prevent he form submit event from triggering an HTTP post;
    e.preventDefault();
  }
  }
  handleChange(e){
    const target = e.target;
    const value = target.type === 'checkbox'? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: ""
    })

    this.setState((prevState) => {
      prevState.product[name] = value;
      return{product: prevState.product};
    });
  }
  render() {
    return (
      <form>
      <h3>Enter a new product</h3>
        <p>
          <label>
            Name
            <br />
            <input type="text" name="name" onChange={this.handleChange} value={this.state.product.name} />
            <p className="error">{this.state.name}</p>
          </label>
        </p>
        <p>
          <label>
            Category
            <br />
            <input type="text" name="category" onChange={this.handleChange} value = {this.state.product.category}/>
            <p className="error">{this.state.category}</p>
          </label>
        </p>
        <p>
          <label>
            Price
            <br />
            <input type="text" name="price" onChange={this.handleChange} value = {this.state.product.price} />
            <p className="error">{this.state.price}</p>
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="stocked" onChange = {this.handleChange} value ={this.state.product.stocked} />
            &nbsp;In stock?
          </label>
        </p>
        <input type="submit" value="Save"  className="submit" onClick ={this.handleSave} />
      </form>
    );
  }
}

export default ProductForm;