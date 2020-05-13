import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Card } from '@material-ui/core';
import Textarea from 'react-textarea-autosize';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addCard } from '../../store/actions/cardActions';
import {updateListUIImmediate} from '../../store/actions/listActions'

class ActionButton extends React.Component {

    state = {
        formOpen: false,
        text: ``
    };

    resort = () => {
        this.props.dispatch(updateListUIImmediate())
    }

    openForm = () => {
        this.setState({
            formOpen: true
        }, this.resort());
    };

    closeForm = e => {
        this.setState({
            formOpen: false
        }, this.resort());
    };

    handleInputChange = e => {
        this.setState({
            text: `${e.target.value}`
        });
    };

    handleAddCard = () => {
        const { dispatch, listID } = this.props;
        const { text } = this.state;

        if (text) {
            this.setState({
                text: ``
            });
            dispatch(addCard(listID, text));
        }
        return
    }

    renderAddButton = () => {

        const typeString = "card";

        const typeStyle = styles.card;

        return (
            <div 
            onClick={this.openForm}
            style={{...styles.openFormButtonGroup, ...typeStyle}}>
                <Icon>add</Icon>
                <p>Add another {typeString}</p>
            </div>
        );
    };

    renderForm = () => {
        
        const placeholder = "Enter a title for this card...";

        const btnTitle = "Add Card";
        
        return <div>
            <Card style={{
                overflow: "visible",
                minHeight: 80,
                // minWidth: 272,
                padding: "6px 8px 2px"
            }}>
                <Textarea
                placeholder={placeholder}
                autoFocus
                onBlur={this.closeForm}
                onHeightChange={this.resort}
                onChange={this.handleInputChange}
                style={{
                    resize: "none",
                    width: "100%",
                    overflow: "hidden",
                    outline: "none",
                    border: "none"
                }}
                />
            </Card>
            <div style={styles.formButtonGroup}>
                <Button
                onMouseDown={this.handleAddCard}
                variant="contained"
                style={{
                    color: "white",
                    backgroundColor: "#5aac44"
                }}
                >
                    {btnTitle}{" "}
                </Button>
                <Icon
                style={{
                    marginLeft: 8,
                    cursor: "pointer"
                }}>
                    close
                </Icon>
            </div>
        </div>
    };


    render() {
        return (this.state.formOpen ? this.renderForm() : this.renderAddButton())
    };
};

const styles = {
    openFormButtonGroup : {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3, 
        height: 36, 
        width: 272, 
        paddingLeft: 10
    },
    card : {
        opacity: 0.5,
        color: "inherit",
        background: "inherit"
    },
    formButtonGroup : {
        marginTop : 8,
        display: "flex",
        alignItems: "center"
    }
}

const mapStateToProps = state => ({
  lists: state.lists.lists
});
export default connect(mapStateToProps)(ActionButton);