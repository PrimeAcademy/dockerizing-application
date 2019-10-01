import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@material-ui/core';

class ColorGenerator extends Component {
    onNewColor = (event) => {
        this.props.dispatch({
            type: 'GENERATE_NEW_COLOR'
        });
    }

    onChangeColorFormat = (event, colorFormat) => {
        const colorgenEventType = `CONVERT_TO_${colorFormat}_COLOR`;
        this.props.dispatch({
            type: colorgenEventType
        });
    }

    render() {
        const colorGen = this.props.store.colorgen;
        const colorSwatchStyling = {
            backgroundColor: colorGen.color,
            display: 'block',
            paddingBottom: '45%',
        };
        const colorFormatBtnConfig = [
            {
                name: 'Make HEX',
                colorType: 'HEX',
                disabled: colorGen.type === 'HEX',
            },
            {
                name: 'Make RGB',
                colorType: 'RGB',
                disabled: colorGen.type === 'RGB',
            },
            {
                name: 'Make HSL',
                colorType: 'HSL',
                disabled: colorGen.type === 'HSL',
            },
        ];
        const colorFormatBtns = colorFormatBtnConfig.map((btnConfig, index) => {
            return (
                <Grid item xs={4} key={index}>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        disabled={btnConfig.disabled}
                        onClick={(event) => this.onChangeColorFormat(event, btnConfig.colorType)}
                    >
                        {btnConfig.name}
                    </Button>
                </Grid>
            );
        });

        return (
            <Card>
                <CardActionArea>
                    <div style={colorSwatchStyling}></div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h4">
                            {colorGen.color}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Button
                                fullWidth={true}
                                variant="contained"
                                color="primary"
                                onClick={this.onNewColor}
                            >
                                New Color
                            </Button>
                        </Grid>
                        {colorFormatBtns}
                    </Grid>
                </CardActions>
            </Card>
        );
    }
}

export default connect(mapStoreToProps)(ColorGenerator);
