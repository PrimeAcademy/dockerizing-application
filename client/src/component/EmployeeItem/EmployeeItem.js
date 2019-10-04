import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
    TableRow,
    TableCell,
} from '@material-ui/core';

class EmployeesList extends Component {
    render() {
        const employee = this.props.employee;

        return (
            <TableRow>
                <TableCell>
                    {employee.name}
                </TableCell>
                <TableCell>
                    {employee.employee_number}
                </TableCell>
                <TableCell>
                    {employee.review_rating}
                </TableCell>
                <TableCell>
                    {employee.annual_salary}
                </TableCell>
            </TableRow>
        );
    }
}

export default connect(mapStoreToProps)(EmployeesList);
