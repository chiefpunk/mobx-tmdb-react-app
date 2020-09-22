import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { headerStyles } from '../Styles/styles';
import logo from '../Assets/tmdb_logo.svg';
import forkMe from '../Assets/fork-me.svg';

class Header extends Component{
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <div className={classes.headerBar}>
            <Link to="/" className={classes.mainLogo}>
              <img src={logo} className={classes.logo} alt='main logo'/>
            </Link>
            <a href="https://github.com/rashmiap/mobx-tmdb-react-app">
              <img src={forkMe} />
            </a>
          </div>
        </AppBar>
      </div>
    )
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(headerStyles)(Header);
