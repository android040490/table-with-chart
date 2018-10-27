import React from 'react'
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

import { connect } from 'react-redux';

import { getStudents } from 'redux-store/selectors';

// Resolves charts dependancy
charts(FusionCharts);

const chartConfig = {
    "chart": {
        "caption": "Student exam results ( Biology )",
        "subcaption": "For the year 2018",
        "yaxisname": "Number of points",
        "xaxisname": "Students name",
        "decimals": "1",
        "theme": "gammel"
    }
};

class Chart extends React.Component {

    render() {
        let students = this.props.students.map(item => {
            return {
                label: item.name,
                value: item.exam.point
            }
        })
        return (
            <ReactFusioncharts
                type="column3d"
                width='100%'
                height='500'
                dataFormat="JSON"
                dataSource={{
                    ...chartConfig,
                    data: students
                }} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        students: getStudents(state)
    }
}

export default connect(mapStateToProps)(Chart);