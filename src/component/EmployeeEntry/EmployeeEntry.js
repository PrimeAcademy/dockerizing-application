import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
    Grid,
    Paper,
    Button,
} from '@material-ui/core';

class EmployeeEntry extends Component {
    state = {
        isAdding: false,
        name: '',
        employeeNumber: '',
        reviewRating: 0,
        annualSalary: 0,
    };

    onAddNewEmployee = (event) => {
        this.setState({
            isAdding: true,
        });
    }

    onSubmitNewEmployee = (event) => {
        this.props.dispatch({
            type: 'POST_EMPLOYEE',
            payload: {
                name: this.state.name,
                employee_number: this.state.employeeNumber,
                review_rating: this.state.reviewRating,
                annual_salary: this.state.annualSalary,
            }
        });
        this.setState({
            isAdding: false,
        });
    }

    changeNewEmployee = (event, fieldType) => {
        let newValue = event.target.value;
        if (fieldType === 'annualSalary' || fieldType === 'reviewRating') {
            newValue = parseInt(newValue);
        }

        this.setState({
            ...this.state,
            [fieldType]: newValue,
        })
    }

    render() {
        const contrStyling = {
            padding: '10px',
        };
        const fieldLabel = {
            fontSize: '0.6rem',
            fontWeight: 'bold',
            marginBottom: '5px',
        };
        let entryContent = <Grid item xs={12}>
            <Button onClick={this.onAddNewEmployee}>Add New Employee</Button>
        </Grid>;
        const inputStyling = {
            boxSizing: 'border-box',
            borderRadius: '3px',
            width: '100%',
            border: '1px solid #666666',
            padding: '6px',
        };

        if (this.state.isAdding) {
            entryContent = [
                <Grid item xs={2} key={0}>
                    <label>
                        <span style={fieldLabel}>Name</span>
                        <input
                            name="name"
                            style={inputStyling}
                            onChange={(event) => this.changeNewEmployee(event, 'name')}
                        />
                    </label>
                </Grid>,
                <Grid item xs={2} key={1}>
                    <label>
                        <span style={fieldLabel}>Employee Number</span>
                        <input
                            name="employeeNumber"
                            style={inputStyling}
                            onChange={(event) => this.changeNewEmployee(event, 'employeeNummber')}
                        />
                    </label>
                </Grid>,
                <Grid item xs={2} key={2}>
                    <label>
                        <span style={fieldLabel}>Review Rating</span>
                        <input
                            name="reviewRating"
                            style={inputStyling}
                            onChange={(event) => this.changeNewEmployee(event, 'reviewRating')}
                        />
                    </label>
                </Grid>,
                <Grid item xs={3} key={3}>
                    <label>
                        <span style={fieldLabel}>Annual Salary</span>
                        <input
                            name="annualSalary"
                            style={inputStyling}
                            onChange={(event) => this.changeNewEmployee(event, 'annualSalary')}
                        />
                    </label>
                </Grid>,
                <Grid item xs={3} key={3}>
                    <Button
                        color="primary"
                        onClick={this.onSubmitNewEmployee}
                    >
                        Submit
                    </Button>
                </Grid>
            ];
        }

        return (
            <Paper style={contrStyling}>
                <Grid container spacing={1}>
                    {entryContent}
                </Grid>
            </Paper>
        );
    }
}

export default connect(mapStoreToProps)(EmployeeEntry);
