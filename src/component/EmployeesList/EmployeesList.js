import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@material-ui/core';
import EmployeeItem from '../EmployeeItem/EmployeeItem';
import EmployeeEntry from '../EmployeeEntry/EmployeeEntry';

class EmployeesList extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_EMPLOYEES',
        });
    }

    render() {
        const showEmployees = this.props.store.employees.map((employee, index) => {
            return (
                <EmployeeItem employee={employee} key={index} />
            );
        });

        return (
            <div>
                <div className="vr vr_x3">
                    {showEmployees.length === 0 &&
                        <p>
                            There are no employees currently loaded
                        </p>
                    }
                    
                    {showEmployees.length > 0 &&
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Name
                                        </TableCell>
                                        <TableCell>
                                            Employee Number
                                        </TableCell>
                                        <TableCell>
                                            Rating
                                        </TableCell>
                                        <TableCell>
                                            Salary
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {showEmployees}
                                </TableBody>
                            </Table>
                        </Paper>
                    }
                </div>

                <div>
                    <EmployeeEntry />
                </div>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(EmployeesList);
