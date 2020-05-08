import React, { Component } from 'react';
import {compose} from 'redux';
import Board from '../board/Board'
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
class Home extends Component {

  render(){
    const { classes } = this.props;
    const boardId = this.props.match.params.id ? this.props.match.params.id : null;

    return (
      <React.Fragment>
        <Container className={classes.cardGrid} maxWidth="md">
          <Board key={boardId} boardId={boardId}/>
        </Container>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});
export default compose(
  withStyles(styles),
)(Home);