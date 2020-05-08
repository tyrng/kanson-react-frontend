import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Textarea from 'react-textarea-autosize';
import Typography from '@material-ui/core/Typography';
import {sort} from '../../store/actions/listActions';
import { updateCard, deleteCard } from '../../store/actions/cardActions';
import { debounce } from 'underscore';
import Icon from '@material-ui/core/Icon';

function getStyle(style, snapshot) {
  // console.log('test2')
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.0001s`,
  };
}

class BoardCard extends React.Component {

  state = {
    disableInteractive: true,
    readOnly: true,
    closeButton: false,
    text: this.props.card.text
  }

  textareaRef = React.createRef();
  onClick = () => {
    this.setState({ disableInteractive: false, readOnly: false })
    this.textareaRef.current.focus();
  }

  onBlur = () => {
    this.setState({ disableInteractive: true, readOnly: true })
  }

  onChange = (e) => {
    this.setState({text: e.target.value});
    debounce(this.props.dispatch(updateCard(this.props.card.id, e.target.value)), 500);
  }

  moveCaretAtEnd(e) {
    var temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }
  resort = () => {
      this.props.dispatch(sort(this.props.lists, 0, 0));
  }

  onMouseDown = () => {
    this.props.dispatch(deleteCard(this.props.card.id));
    this.resort();
  }

  closeButtonTrue = () => {
    this.setState({closeButton: true})
  }

  closeButtonFalse = () => {
    this.setState({closeButton: false})
  }
  render() {
    const { classes, card, index } = this.props;

    const id = card.id;
    // console.log(id)
    // const index = card.index;


    return (
        <Draggable draggableId={String(id)} index={index} disableInteractiveElementBlocking={this.state.disableInteractive} >
            {(provided,snapshot) => {
              return (
              <React.Fragment>
                <div 
                onMouseOver={this.closeButtonTrue} 
                onMouseLeave={this.closeButtonFalse}
                onBlur={this.onBlur} 
                onClick={this.onClick} 
                className={classes.card} 
                ref={provided.innerRef} 
                {...provided.draggableProps} 
                {...provided.dragHandleProps} 
                style={getStyle(provided.draggableProps.style, snapshot)}>
                  {this.state.closeButton ? <Icon
                  onMouseDown={this.onMouseDown}
                  style={{
                      position: 'absolute',
                      left: 255,
                      marginTop: -10,
                      cursor: "pointer",
                      // color: 'rgba(0,0,0,0.75)'
                  }}>
                      cancel_sharp
                  </Icon> : null} 
                  <Card style={{ transitionDelay: '0ms' }}>
                      <CardContent >
                        <Typography >
                          <Textarea 
                          inputRef={this.textareaRef} 
                          onFocus={this.moveCaretAtEnd} 
                          {...provided.dragHandleProps} 
                          className={classes.textarea} 
                          value={this.state.text} 
                          onChange={this.onChange} 
                          onHeightChange={this.resort}/>
                        </Typography>
                      </CardContent>
                  </Card>
                </div>
              </React.Fragment>
            )}}
        </Draggable>
    );
  }
}

const styles = theme => ({
  card: {
    margin: theme.spacing(2,0)
  },
  textarea: {
    resize: "none",
    width: "100%",
    overflow: "hidden",
    outline: "none",
    border: "none",
    fontFamily: 'inherit',
    fontSize: 'inherit',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none !important',
    msUserSelect: 'none',
    backgroundColor: 'inherit'
  }
});

const mapStateToProps = state => ({
  lists: state.lists
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(BoardCard);