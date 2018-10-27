import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';

import { getStudents as fetchStudents, changeExamPoint } from 'redux-store/actions';
import { getStudents } from 'redux-store/selectors';


const styles = theme => ({
    root: {
        maxWidth: 1200,
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        margin: 'auto'
    },
    table: {
        minWidth: "100%",
    },
});


class TableExam extends React.Component {
    constructor(props) {
        super(props);
        
        this.changeValue = this.changeValue.bind(this);
    }
    

    componentWillMount() {
        this.props.fetchStudents()
    }

    renderStudents(students){
        return(
            students.map((student, index) => {
                return (
                    <TableRow hover key={student.name + index.toString()}>
                        <TableCell component="th" scope="row">
                            {student.name}
                        </TableCell>
                        <TableCell numeric>{student.exam.name}</TableCell>
                        <TableCell onClick={this.changeValue(student.name)} numeric>{student.exam.point}</TableCell>
                    </TableRow>
                );
            })
        )
    }

    changeValue(student) {
        let self = this
        return function (e) {
            let currentCell = e.target;
            let oldVal = currentCell.innerHTML;
            let inp = document.createElement("input")

            currentCell.innerHTML = '';
            inp.type = 'number';
            inp.style.width = '40px';
            inp.value = oldVal;
            inp.addEventListener('keydown', (e) => {
                if (e.keyCode == 13) {
                    inp.blur()
                }
                return
            })
            inp.addEventListener('blur',  (e) => {
                let newVal = e.target.value
                currentCell.removeChild(inp)
                if(oldVal != newVal){
                    self.props.changeExamPoint(student, newVal)
                }else{
                    currentCell.innerHTML = oldVal;
                }
                return
            })
            currentCell.appendChild(inp)
            inp.focus()
        }
    }

    render() {
        const { classes, students } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student name</TableCell>
                            <TableCell numeric>Exam name</TableCell>
                            <TableCell numeric>Exam points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderStudents(students)}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

TableExam.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        students: getStudents(state)
    }
}

const mapDispatchToProps = {
    fetchStudents,
    changeExamPoint
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TableExam));