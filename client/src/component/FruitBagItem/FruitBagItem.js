import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
    Chip,
} from '@material-ui/core';

class FruitBagItem extends Component {
    handleDelete = (event) => {}

    render() {
        const styling = {
            backgroundColor: '#b0c4de',
        };
        const bagItemLabel = `${this.props.fruit.name}(s), ${this.props.fruit.count}`

        return (
            <Chip
                label={bagItemLabel}
                onDelete={this.handleDelete}
                style={styling}
            />
        );
    }
}

export default connect(mapStoreToProps)(FruitBagItem);
