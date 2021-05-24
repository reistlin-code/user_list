import React, {Component} from 'react';
import React_t from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, username, email, website) {
    return { name, username, email, website };
}

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});
//  какой нибудь комментарий измененный мной
export default class Components extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoader: false,
            items: []
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoader: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoader: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoader, items} = this.state;
        if (error) {
            return <p> Error {error.message} </p>
        } else if (!isLoader) {
            return <p> Loading...</p>
        } else {
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="left">Username</StyledTableCell>
                                <StyledTableCell align="left">Email</StyledTableCell>
                                <StyledTableCell align="left">Website</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((row) => (
                                <StyledTableRow key={items}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                                    <StyledTableCell align="left">{row.email}</StyledTableCell>
                                    <StyledTableCell align="left">{row.website}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    }
}

