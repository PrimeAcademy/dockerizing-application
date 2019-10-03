import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
    Paper,
    Typography,
    Button,
} from '@material-ui/core';

class FruitBasket extends Component {
    state = {
        selectedFruit: 0,
    }

    onAddToBag = (event) => {
        this.props.dispatch({
            type: 'ADD_TO_BAG',
            payload: {
                ...this.props.fruit,
                index: this.props.fruitIdx,
            }
        });
    }

    onRemoveFruit = (event) => {
        this.props.dispatch({
            type: 'DELETE_FRUIT',
            payload: {
                ...this.props.fruit,
                index: this.props.fruitIdx,
            }
        });
    }

    onAddNewFruit = (event) => {
        const index = this.state.selectedFruit;
        const fruitName = this.props.store.fruitOptions[index];
        this.props.dispatch({
            type: 'POST_NEW_FRUIT',
            payload: {
                index,
                fruitName,
            }
        });
    }

    render() {
        const {
            fruit,
        } = this.props;
        const styling = {
            padding: '10px',
            backgroundColor: '#b0c4de',
        };
        let basketContent = (
            <div>
                <Typography
                    variant="h6"
                    component="h6"
                    align="center"
                >
                    Select a Fruit
                </Typography>
                <Button
                    fullWidth={true}
                    variant="contained"
                    color="primary"
                    onClick={this.onRemoveFruit}
                >
                    New Fruit
                </Button>
            </div>
        );

        if (!this.props.empty) {
            basketContent = (
                <div>
                    <div className="vr vr_x2">
                        <Typography
                            variant="h6"
                            component="h6"
                            align="center"
                        >
                            {fruit.name}
                        </Typography>
                        <Typography
                            component="p"
                            align="center"
                        >
                            {fruit.quantity}
                        </Typography>
                    </div>
                    <div className="vr">
                        <Button
                            size="small"
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            onClick={this.onAddToBag}
                        >
                            Add to Bag
                        </Button>
                    </div>
                    <div className="vr">
                        <Button
                            size="small"
                            fullWidth={true}
                            variant="contained"
                            color="default"
                            onClick={this.onRemoveFruit}
                        >
                            Remove Fruit
                        </Button>
                    </div>
                    <div>
                        <Button
                            size="small"
                            fullWidth={true}
                            variant="contained"
                            color="default"
                            onClick={this.onRestock}
                        >
                            Restock
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <Paper style={styling}>
                {basketContent}
            </Paper>
        );
    }
}

export default connect(mapStoreToProps)(FruitBasket);
