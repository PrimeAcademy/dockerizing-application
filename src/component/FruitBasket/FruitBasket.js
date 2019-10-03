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
        newCount: null,
    }

    onAddToBag = (event) => {
        if (this.props.fruit.quantity === 0 || this.state.newCount === 0) {
            return;
        }

        this.props.dispatch({
            type: 'ADD_TO_BAG',
            payload: {
                ...this.props.fruit,
                fruitIdx: this.props.fruitIdx,
            }
        });

        this.setState({
            newCount: this.state.newCount == null ? this.props.fruit.quantity - 1 : this.state.newCount - 1,
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
        let currQuantity = this.props.fruit != null ? this.props.fruit.quantity : 0;
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

        if (this.state.newCount != null
            && this.props.fruit.quantity > this.state.newCount
        ) {
            currQuantity = this.state.newCount;
        }

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
                            {currQuantity}
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
