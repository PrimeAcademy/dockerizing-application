import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class FruitBasket extends Component {
    render() {
        const {
            name,
            quantity,
        } = this.props.fruit;
        return (
            <div>
                <div>{name}</div>
                <p>{quantity}</p>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(FruitBasket);
