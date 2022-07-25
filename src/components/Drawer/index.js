import React from 'react'
import { Link } from 'react-router-dom'

import clsx from 'clsx'
import {
    makeStyles, SwipeableDrawer, List, Divider, ListItem,
    ListItemIcon, ListItemText, Avatar
} from '@material-ui/core'

import { menu } from './menu'
import logo from '../../assets/images/logo.png'

const Drawer = ({ state, toggleDrawer }) => {

    const classes = useStyles()

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className={classes.header}>
                <Avatar
                    component={Link}
                    alt="logo producer point"
                    src={logo}
                    to='/home'
                />
                <label className={classes.title}>Producer Point</label>
            </div>
            <Divider />
            <List>
                {menu.map((i, k) => (
                    <ListItem className={classes.items} component={Link} to={i.path} button key={k}>
                        <ListItemIcon>{i.icon}</ListItemIcon>
                        <ListItemText primary={i.title} />
                    </ListItem>
                ))}
            </List>
        </div >
    );

    return (
        <div>
            <SwipeableDrawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {list('left')}
            </SwipeableDrawer>
        </div>
    );
}

export default Drawer

const useStyles = makeStyles({
    list: {
        width: 180,
    },
    fullList: {
        width: 'auto',
    },
    header: {
        display: 'flex',
        flex: 1,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    items: {
        '&:hover': {
            background: 'rgb(0,0,0,0.3)'
        },
    },
});
