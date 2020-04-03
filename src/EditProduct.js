import React from 'react';
import './ProductRow.css'

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            category: this.props.category,
            price: this.props.price,
            stocked: this.props.stocked

        }
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.id !== nextProps.id) {
            return {
                id: nextProps.id,
                name: nextProps.name,
                category: nextProps.category,
                price: nextProps.price,
                stocked: nextProps.stocked
            };
        }

        // Return null to indicate no change to state.
        return null;
    }

    //function to save products from form inputs
    handleSave(e) {
        e.preventDefault()
        this.props.editProduct(this.state)
        this.props.updateProduct(this.state)
    }
    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name

        this.setState({
            [ name ]: value
        });
    }
    render() {
        return (
            <form>
                <h3>Edit product</h3>
                <p>
                    <label>
                        Name
            <br />
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.name} /><br />
                        <span className="error">{this.state.name}</span>
                    </label>
                </p>
                <p>
                    <label>
                        Category
            <br />
                        <input type="text" name="category" onChange={this.handleChange} value={this.state.category} /><br />
                        <span className="error">{this.state.category}</span>
                    </label>
                </p>
                <p>
                    <label>
                        Price
            <br />
                        <input type="text" name="price" onChange={this.handleChange} value={this.state.price} /><br />
                        <span className="error">{this.state.price}</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" name="stocked" onChange={this.handleChange} value={this.state.stocked} /><br />
                        &nbsp;In stock?
          </label>
                </p>
                <input type="submit" value="Save" className="submit" onClick={this.handleSave} />
            </form>
        );
    }
}

export default EditProduct;