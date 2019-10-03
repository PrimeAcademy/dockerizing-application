import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class EmployeesList extends Component {
    componentDidMount() {

    }

    render() {
        const showEmployees = this.props.store.employees.map((employee, index) => {
            return (
                <li key={index}>
                    Name: {employee.name}<br />
                    Rating: {employee.rating}<br />
                    Salary: {employee.annual_salary}<br />
                    Employee Number: {employee.employee_number}<br />
                </li>
            );
        });

        return (
            <div>
                {showEmployees.length === 0 &&
                    <p>
                        There are no employees currently loaded
                    </p>
                }
                
                {showEmployees.length > 0 &&
                    <ul>
                        {showEmployees}
                    </ul>
                }
            </div>
        );
    }
}

export default connect(mapStoreToProps)(EmployeesList);
