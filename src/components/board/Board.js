import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BoardList from './BoardList';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {sort, fetchLists, fetchListsByBoardId, updateListUIImmediate} from '../../store/actions/listActions'
import {sort as cardSort, fetchCards} from '../../store/actions/cardActions'
import Masonry from 'react-mason';
import { DragDropContext } from 'react-beautiful-dnd';
import {isMobile} from 'react-device-detect';
import FloatingActionButton from './FloatingActionButton';
import { setCurrentBoardId } from '../../store/actions/boardActions';
import { fetchBoards } from '../../store/actions/boardActions';

class Board extends React.Component {

  componentDidMount = () => {
    this.props.dispatch(fetchBoards());
    this.props.dispatch(fetchCards());
    if(this.props.boardId !== null && this.props.boardId !== '') {
      this.props.dispatch(setCurrentBoardId(this.props.boardId));
      this.props.dispatch(fetchListsByBoardId(this.props.boardId));
    } else {
      this.props.dispatch(setCurrentBoardId(null));
      this.props.dispatch(fetchLists());
    }
  }
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
      // this.resort(this.props.dispatch, lists)
  }

  onSortStart= () => (document.body.style.cursor = 'grabbing')

  onSortEnd = (lists) => ({oldIndex, newIndex}) => {
    this.props.dispatch(sort(oldIndex, newIndex));
    document.body.style.cursor = 'default';
  };
  

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resort = async (dispatch, lists) => {
    await this.sleep(250);
    dispatch(updateListUIImmediate())
  }
  SortableItem = SortableElement(({value}) => {
    return (
      // <Grid key={value.id} item xs={12} sm={6} md={4}>
          <div><BoardList key={value.id} list={value.list} listCards={value.listCards}/></div>
      // </Grid>
      );
  });

  SortableList = SortableContainer(({items}) => {
    const disable = this.props.boardId ? false : true;
    if (items) {
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
                <this.SortableItem key={item.id} value={{listCards: listCards, list: item}} index={index} disabled={disable}/>
            )})}
          </Masonry>
        </DragDropContext>
      );
    }
    else {
      return null;
    }
  });

  render() {
    const {lists, boardId} = this.props;
    const mobile = isMobile ? 200 : 0;

    const sortF = (ob1,ob2) => {
      const ob1Board = this.props.boards.find(board => board.id === ob1.boardId);
      const ob1BoardIndex = ob1Board ? ob1Board.index : -1;
      const ob2Board = this.props.boards.find(board => board.id === ob2.boardId);
      const ob2BoardIndex = ob2Board ? ob2Board.index : -1;
      if (ob1BoardIndex > ob2BoardIndex) {
          return 1;
      } else if (ob1BoardIndex < ob2BoardIndex) { 
          return -1;
      }
  
      // Else go to the 2nd item
      if (ob1.index < ob2.index) { 
          return -1;
      } else if (ob1.index > ob2.index) {
          return 1
      } else { // nothing to split them
          return 0;
      }
  }

  const sortedLists = lists.sort(sortF);

    return (
      <React.Fragment>
          <this.SortableList items={sortedLists} onSortStart={this.onSortStart} onSortEnd={this.onSortEnd(lists)} axis='xy' useWindowAsScrollContainer={true} useDragHandle={true} pressDelay={mobile} shouldCancelStart={()=>false}/>
          <FloatingActionButton boardId={boardId}/>
        </React.Fragment>
      ) 
  }
}

const styles = theme => ({
  
});

const mapStateToProps = state => ({
  lists: state.lists.lists,
  cards: state.cards.cards,
  boards: state.boards.boards,
  search: state.search,
  pageName: state.pageName,
  fetchPending: state.boards.pending
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(Board);
