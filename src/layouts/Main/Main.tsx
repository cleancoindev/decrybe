import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { NavBar, Topbar} from './components';
import { Provider, observer, inject } from 'mobx-react';
import Signup  from './components/Signup'
import userStore from '../../store/UserStore';
import tasksStore from '../../store/TasksStore'
import { LinearProgress } from '@material-ui/core';
const stores = { userStore, tasksStore };
import { renderRoutes } from 'react-router-config';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  topBar: {
    zIndex: 2,
    position: 'relative'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: '0 0 auto'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto'
  }
}));

const RegisterModal = inject('userStore')(observer(({ userStore }) => {
  console.log(userStore.isReg)
  if (!userStore.isReg && userStore.isLogin) {
    return <Signup />
  } else {
    return null
  }
}))

const Main = props => {
  const { route } = props; // children

  const classes = useStyles(1);

  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <Provider { ...stores }>
      <div className={classes.root}>
      <Topbar
        className={classes.topBar}
        //onOpenNavBarMobile={handleNavBarMobileOpen}
      />
      <div className={classes.container}>
        <NavBar
          className={classes.navBar}
          onMobileClose={handleNavBarMobileClose}
          openMobile={openNavBarMobile}
        />
        <main className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {/*children*/}
            {renderRoutes(route.routes)}
          </Suspense>
        </main>
      </div>
    </div>
    </Provider>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;