import React, { Component } from 'react';

import Chart from 'containers/Chart';
import TableExam from 'containers/Table';

class Layout extends Component {
    render() {
        return (
            <div className="wrapper">
                <TableExam/>
                <Chart/>
            </div>
        );
    }
}

export default Layout;