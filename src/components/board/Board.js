import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BoardList from './BoardList';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {sort} from '../../store/actions/listActions'
import {sort as cardSort} from '../../store/actions/cardActions'
import Masonry from 'react-mason';
import { DragDropContext } from 'react-beautiful-dnd';
import {isMobile} from 'react-device-detect';
import FloatingActionButton from './FloatingActionButton';

class Board extends React.Component {

  onDragEnd = (lists) => (result) => {
      const { destination, source, draggableId } = result;

      if(!destination) {
          return;
      }

      this.props.dispatch(cardSort(
          source.droppableId, 
          destination.droppableId,
          source.index,
          destination.index,
          draggableId
      ));
      this.resort(this.props.dispatch, lists)
  }

  onSortStart= () => (document.body.style.cursor = 'grabbing')

  onSortEnd = (lists) => ({oldIndex, newIndex}) => {
    this.props.dispatch(sort(lists, oldIndex, newIndex));
    document.body.style.cursor = 'default';
  };
  

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resort = async (dispatch, lists) => {
    await this.sleep(250);
    dispatch(sort(lists, 0, 0))
  }
  SortableItem = SortableElement(({value}) => {
    return (
      // <Grid key={value.id} item xs={12} sm={6} md={4}>
          <div><BoardList key={value.id} list={value.list} listCards={value.listCards}/></div>
      // </Grid>
      );
  });

  SortableList = SortableContainer(({items}) => {
    return (
      <DragDropContext onDragEnd={this.onDragEnd(items)}>
        <Masonry>
          {items.map((item, index) => {
            const listCards = (this.props.cards.filter((card) => card.listId === item.id)).sort((a,b) => a.index - b.index);
            let cardCount = listCards.length;
            listCards.forEach(card => {
              if (card.text.toUpperCase().indexOf(this.props.search.toUpperCase()) === -1) cardCount--;
            });
            const listFilter = item.title.toUpperCase().indexOf(this.props.search.toUpperCase()) !== -1;
            const cardFilter = cardCount !== 0;
            if (!cardFilter && !listFilter) return null;
            return (
              <this.SortableItem key={item.id} value={{listCards: listCards, list: item}} index={index} />
          )})}
        </Masonry>
      </DragDropContext>
    );
  });

  render() {
    const {lists, boardId} = this.props;
    const mobile = isMobile ? 200 : 0;

    const boardLists = (boardId ? (lists.filter((list) => list.boardId === boardId)) : lists).sort((a,b) => a.index - b.index);

    return (
      <React.Fragment>
          <this.SortableList items={boardLists} onSortStart={this.onSortStart} onSortEnd={this.onSortEnd(boardLists)} axis='xy' useWindowAsScrollContainer={true} useDragHandle={true} pressDelay={mobile} shouldCancelStart={()=>false}/>
          <FloatingActionButton boardId={boardId}/>
        </React.Fragment>
      ) 
  }
}

const styles = theme => ({
  
});

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  search: state.search
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(Board);
