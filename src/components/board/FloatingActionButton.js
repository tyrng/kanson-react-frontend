import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { addList } from '../../store/actions/listActions';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FloatingActionButton(props) {
  const { boardId } = props;
  const boards = useSelector(state => state.boards.boards);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [selectedBoard, setSelectedBoard] = React.useState("");
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddList = () => {
    let condition = text ? true : false;
    let boardToAdd = boardId;
    if (!boardId) {
      condition = selectedBoard !== "" && text;
      boardToAdd = selectedBoard;
    } 
    if(condition) {
        dispatch(addList(boardToAdd, text));
        setOpen(false);
        setSelectedBoard("");
        setText("");
    }
    return;
  };
  const handleInputChange = e => {
      setText(e.target.value);
  };

  const handleSelectChange = e => {
    setSelectedBoard(e.target.value);
  };

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add another list</DialogTitle>
        <DialogContent>
          {boardId ? null : 
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Board</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedBoard}
                onChange={handleSelectChange}
              >
                {boards.map(board => 
                  <MenuItem key={board.id} value={board.id}>{board.title}</MenuItem>
                )}
              </Select>
            </FormControl>
          }
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            onChange={handleInputChange}
            label="Enter list title..."
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddList} color="primary">
            Add List
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}