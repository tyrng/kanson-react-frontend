import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink  } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LabelIcon from '@material-ui/icons/Label';
import EditIcon from '@material-ui/icons/Edit';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
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
import { sort, addBoard, updateBoard, deleteBoard } from '../../store/actions/boardActions'

const SortHandle = SortableHandle(({value}) => <DragHandleIcon style={{marginLeft: 'auto'}}/>)

const SortableItem = SortableElement(({value}) => 
<div>
  <Link
  key={value.board.title}
  component={NavLink}
  to={`/board/${value.board.id}`}
  underline='none'
  color='inherit'
  onClick={value.toggleDrawer(false)}
  activeClassName={value.activeLinkClass}
  exact
  >
    <ListItem button>
      <ListItemIcon><LabelIcon /></ListItemIcon>
      <ListItemText primary={value.board.title} style={{wordWrap: 'break-word'}}/>
      <SortHandle/>
    </ListItem>
  </Link></div>)
  

const SortableList = SortableContainer(({items}) => {
  return (
    <div>
      {items.boards.map((board, index) => (
        <SortableItem key={board.id} index={index} value={{board: board, activeLinkClass: items.activeLinkClass, toggleDrawer: items.toggleDrawer}}/>
      ))}
    </div>
  );
});

const SignedInLinks = (props) => {

    const classes = UseStyles();
    const boards = useSelector(state => state.boards);
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [addBoardText, setAddBoardText] = React.useState('');
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [editBoardText, setEditBoardText] = React.useState('');
    const [editSelectedBoard, setEditSelectedBoard] = React.useState('');
    const { activeLinkClass, setDragging, toggleDrawer } = props;

    const dispatch = useDispatch();

    const onSortStart = () => {
      setDragging(true);
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
      dispatch(sort(boards, oldIndex, newIndex));
      setDragging(false);
    };

    const handleAddDialogOpen = () => {
      setAddDialogOpen(true);
    }
    
    const handleAddDialogClose = () => {
      setAddDialogOpen(false);
    };

    const handleAddBoardText = e => {
      setAddBoardText(e.target.value);
    }

    const handleAddBoard = () => {
      dispatch(addBoard(addBoardText));
      setAddBoardText('');
      setAddDialogOpen(false);
    }

    const handleEditDialogOpen = () => {
      setEditDialogOpen(true);
    }
    
    const handleEditDialogClose = () => {
      setEditDialogOpen(false);
    };

    const handleEditBoardText = e => {
      setEditBoardText(e.target.value);
    }

    const handleEditSelectChange = e => {
      setEditSelectedBoard(e.target.value)
    }

    const handleUpdateBoard = () => {
      const selected = editSelectedBoard;
      const text = editBoardText;
      setEditSelectedBoard('');
      setEditBoardText('');
      dispatch(updateBoard(selected, text));
      setEditDialogOpen(false);
    }

    const handleDeleteBoard = () => {
      const selected = editSelectedBoard;
      setEditSelectedBoard('');
      dispatch(deleteBoard(selected));
      setEditDialogOpen(false);
    }

    return (
    <div>
      <div className={classes.avatarRoot}>
        <div className={classes.avatarMargin}>
            <Avatar className={classes.avatar}>TO</Avatar>  
        </div>
        <h2>Tyrone Ong</h2>
      </div>
      <List>
        <Divider className={classes.dividerMargin}/>
        <Link
        component={NavLink}
        to='/home'
        underline='none'
        color='inherit'
        onClick={toggleDrawer(false)}
        activeClassName={activeLinkClass}
        exact
        >
          <ListItem button>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary='All Boards'/>
          </ListItem>
        </Link>
        <Divider className={classes.dividerMargin}/>
        <SortableList items={{boards: boards, activeLinkClass: activeLinkClass, toggleDrawer: toggleDrawer}} helperClass={classes.sortableHelper} onSortEnd={onSortEnd} onSortStart={onSortStart} useDragHandle={true}/>
        <Divider className={classes.dividerMargin}/>
        <div style={{display: 'flex'}}>
          <ListItem button 
          onClick={handleEditDialogOpen}
          style={{width: '50%', borderStyle: 'solid', borderRightWidth: 1, borderColor: 'rgba(0,0,0,0.2)'}}>
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText primary='Edit'/>
          </ListItem>
          <ListItem button 
          onClick={handleAddDialogOpen}
          style={{width: '50%'}}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary='Add'/>
          </ListItem>
        </div>
        <Divider className={classes.dividerMargin}/>
        <ListItem button key='Sign Out'>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary='Sign Out' />
        </ListItem>
      </List>
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add board</DialogTitle>
        <DialogContent>            
            {/* <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
            </DialogContentText> */}
            <TextField
                // autoFocus
                margin="dense"
                id="name"
                onChange={handleAddBoardText}
                label="Board title"
                type="text"
                value={addBoardText}
                fullWidth
            />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleAddDialogClose} color="primary">
            Cancel
        </Button>
        <Button onClick={handleAddBoard} color="primary">
            Add Board
        </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit board</DialogTitle>
          <DialogContent>
              <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label2">Board</InputLabel>
              <Select
                  labelId="demo-simple-select-label2"
                  id="demo-simple-select2"
                  value={editSelectedBoard}
                  onChange={handleEditSelectChange}
                  autoWidth
                  style={{minWidth: 100}}
              >
                  {boards.map(board => 
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
                  onChange={handleEditBoardText}
                  label="List title"
                  type="text"
                  value={editBoardText}
                  fullWidth
              />
          </DialogContent>
          <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
              Cancel
          </Button>
          <Button onClick={handleDeleteBoard} color="secondary">
              Delete Board
          </Button>
          <Button onClick={handleUpdateBoard} color="primary">
              Update List
          </Button>
          </DialogActions>
      </Dialog>
    </div>
)};

const UseStyles = makeStyles((theme => ({
    
  avatarRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatarMargin: {
    margin: theme.spacing(2, 0, 0, 0)
  },
  dividerMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  avatar: {
    width: 60,
    height: 60
  },
  sortableHelper: {
    zIndex: 1500
  }
})))

export default SignedInLinks;