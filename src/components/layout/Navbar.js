import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { fade, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Drawer from './Drawer';
import {search} from '../../store/actions/rootActions';
import { debounce } from 'lodash';

class Navbar extends React.Component {
  state = { 
    drawerState: false,
    searchText: '',
    dragging: false
  };

  toggleDrawer = (open) => (event) => {
    if ((event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) || this.state.dragging) {
      return;
    }
    this.setState({ drawerState: open });
  };

  setDragging = (value) => {
    this.setState({dragging: value});
  }

  handleSearchOnChange = e => {
    e.persist();
    this.setState({searchText: e.target.value});
    this.debouncedSearch();
  }

  debouncedSearch = debounce(() => {this.props.dispatch(search(this.state.searchText))}, 250);

  render() {
    const { pageName, classes, user } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer(true)}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              { pageName ? pageName : null}
            </Typography>
            { this.props.user ? 
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={this.state.searchText}
                  onChange={this.handleSearchOnChange}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            : null }
          </Toolbar>
        </AppBar>
          <Drawer setDragging={this.setDragging} drawerState={this.state.drawerState} toggleDrawer={this.toggleDrawer} user={user} />
        <main
          className={classes.content}
        >
          <div className={classes.drawerHeader} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // color: '#000000',
    // backgroundColor: '#000000',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    whiteSpace: 'pre'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '24ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
});

const mapStateToProps = state => ({
  search: state.search,
  user: state.authentication.user,
  pageName: state.pageName
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles))(Navbar);