import React from 'react';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import BoardCard from './BoardCard';
import { Droppable } from 'react-beautiful-dnd';
import {SortableHandle} from 'react-sortable-hoc';
import ActionButton from './ActionButton';
import Textarea from 'react-textarea-autosize';
import {updateListUIImmediate} from '../../store/actions/listActions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { updateList, deleteList } from '../../store/actions/listActions';
class BoardList extends React.Component {

    state = {
        open: false,
        dialogText: this.props.list.title,
        selectedBoard: this.props.boards.find((board) => this.props.list.boardId === board.id) ? this.props.boards.find((board) => this.props.list.boardId === board.id).id : '',
        showIcon: false
    };

    onMouseOver = () => {
        if(!this.state.open)
            this.setState( {showIcon: true});
    }

    onMouseLeave = () => {
        this.setState( {showIcon: false});
    }

    handleClickOpen = () => {
        this.setState({open: true, showIcon: false});
    };
    
    handleClose = () => {
        this.setState({open: false});
    };

    handleInputChange = e => {
        this.setState({dialogText: e.target.value});
    };
    handleDeleteList = e => {
        this.props.dispatch(deleteList(this.props.list.id));
        this.handleClose();
    };
    handleUpdateList = e => {
        this.props.dispatch(updateList(this.props.list.id, this.state.selectedBoard, this.state.dialogText));
        this.handleClose();
    };

    handleSelectChange = e => {
      this.setState({selectedBoard: e.target.value});
    };

    resort = () => {
        this.props.dispatch(updateListUIImmediate())
    }

    SortHandle = SortableHandle(({value}) => {
        return (
            <Typography gutterBottom variant="h5" component="h2">
                <Textarea className={this.props.classes.textarea} value={value} readOnly onHeightChange={this.resort}
                        style={{cursor: this.props.currentBoardId == null ? '' : 'grab'}}
                        onMouseEnter={ () => { if (document.body.style.cursor !== 'grabbing' && this.props.currentBoardId != null) document.body.style.cursor = 'grab' } }
                        onMouseLeave={ () => { if (document.body.style.cursor === 'grab' && this.props.currentBoardId != null) document.body.style.cursor = '' } }
                        onMouseDown={ () => { if (this.props.currentBoardId != null) document.body.style.cursor = 'grabbing' } }/>
            </Typography>
          );
      });

  render() {
    const { classes, listCards, list } = this.props;

    return (
        <Card className={classes.card} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
            <Droppable droppableId={String(list.id)}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <CardContent>
                            <div style={{display: 'flex'}}>
                                <this.SortHandle value={list.title} />
                                {this.state.showIcon ? 
                                    <Icon
                                    onMouseDown={this.handleClickOpen}
                                    style={{
                                        marginTop: 5,
                                        cursor: "pointer",
                                        color: 'rgba(0,0,0,0.75)'
                                    }}>
                                        create
                                    </Icon>
                                : null }
                            </div>
                            {listCards.map((card, index) => (
                                <BoardCard key={card.id} card={card} index={index}/>
                            ))}
                            {provided.placeholder}
                            <ActionButton listID={list.id}/>
                        </CardContent>
                    </div>
                )}
            </Droppable>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit list</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Board</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.selectedBoard}
                        onChange={this.handleSelectChange}
                    >
                        {this.props.boards.map(board => 
                        <MenuItem key={board.id} value={board.id}>{board.title}</MenuItem>
                        )}
                    </Select>
                    </FormControl>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText> */}
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        onChange={this.handleInputChange}
                        label="List title"
                        type="text"
                        value={this.state.dialogText}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleDeleteList} color="secondary">
                    Delete List
                </Button>
                <Button onClick={this.handleUpdateList} color="primary">
                    Update List
                </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
  }
}

const styles = theme => ({
    card: {
        backgroundColor: 'orange',
        margin: theme.spacing(1),
        width: 275
    },
    textarea: {
      resize: "none",
      width: 225,
      overflow: "hidden",
      outline: "none",
      border: "none",
      fontFamily: 'inherit',
      fontSize: 'inherit',
      userSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none !important',
      msUserSelect: 'none',
      backgroundColor: 'inherit',
    //   cursor: 'grab'
    }
});

const mapStateToProps = state => ({
  lists: state.lists.lists,
  cards: state.cards.cards,
  boards: state.boards.boards,
  currentBoardId: state.boards.currentBoardId
});

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
  )(BoardList);