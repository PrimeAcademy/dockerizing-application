import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
    Grid,
} from '@material-ui/core';
import FruitBasket from '../FruitBasket/FruitBasket';

class FruitStand extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_FRUITS',
        });
    }

    render() {
        const fruitsInStand = this.props.store.fruits.map((fruitItem, index) => {
            return <Grid item xs={4} key={index}>
                <FruitBasket fruit={fruitItem} fruitIndex={index}></FruitBasket>
            </Grid>
        });

        return (
            <Grid container spacing={3}>
                {fruitsInStand}
            </Grid>
        );
    }
}

export default connect(mapStoreToProps)(FruitStand);
