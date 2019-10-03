import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
    Grid,
} from '@material-ui/core';
import FruitBasket from '../FruitBasket/FruitBasket';
import FruitBag from '../FruitBag/FruitBag';

class FruitStand extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_FRUITS',
        });
    }

    render() {
        const fruitsInStand = this.props.store.fruits.map((fruitItem, index) => {
            return (<Grid item xs={3} key={index}>
                        <FruitBasket fruit={fruitItem} fruitIdx={index}></FruitBasket>
                    </Grid>);
        });

        if (fruitsInStand.length < 4) {
            fruitsInStand.push(<Grid item xs={3} key={fruitsInStand.length - 1}>
                <FruitBasket empty></FruitBasket>
            </Grid>)
        }

        return (
            <div>
                <div className="vr">
                    <Grid container spacing={3}>
                        {fruitsInStand}
                    </Grid>
                </div>

                <FruitBag />
            </div>
        );
    }
}

export default connect(mapStoreToProps)(FruitStand);
