import React from 'react';
import {
	Switch,
	Route,
	Link as RouterLink,
	BrowserRouter as ReactBrowser
} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IsoIcon from '@material-ui/icons/Iso';
import MenuIcon from '@material-ui/icons/Menu';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import PerfCalc from './PerfCalc';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root:			{ display: 'flex' },
	menuButton:	{ marginRight: theme.spacing(2) },
	toolbar:		theme.mixins.toolbar,
	drawerPaper:{ width: drawerWidth },
	content:		{
						flexGrow: 1,
						padding: theme.spacing(3)
					},
	menuLink:	{textDecoration: "none", color: theme.palette.text.primary}
}));

function ListItemLink(props){
	return	<RouterLink id={props.id} to={props.to} className={props.className} onClick={props.onClick}>
					<ListItem button>
						<ListItemIcon children={props.leftIcon}/>
						<ListItemText className={props.className} primary={props.text} />
					</ListItem>
				</RouterLink>
}

export default function App(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const closeDrawer=()=>{
		setMobileOpen(false);
	}

	return	<ReactBrowser>
					<div className={classes.root}>
						
						<AppBar position="fixed">
							<Toolbar>

								<IconButton children={<MenuIcon />} id="side-menu-open" color="inherit" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}/>

								<Typography variant="h6" noWrap>
									OTFMA
								</Typography>

							</Toolbar>
						</AppBar>
						<nav>
							<Drawer id="side-menu" variant="temporary" anchor={theme.direction === 'rtl' ? 'right' : 'left'} 
									open={mobileOpen} onClose={handleDrawerToggle} classes={{paper: classes.drawerPaper}} ModalProps={{keepMounted: true}} >
							<div>
								<div className={classes.toolbar} />
								<Divider />
								<List>
									<ListItemLink onClick={closeDrawer} className={classes.menuLink} to="new" key="newform" leftIcon={<FlightTakeoffIcon/>} text="New W&B"/> 
									<ListItemLink onClick={closeDrawer} className={classes.menuLink} to="find" key="recent" leftIcon={<SearchIcon/>} text="Recent"/> 
								</List>
								<Divider />
								<List>
									<ListItemLink onClick={closeDrawer} className={classes.menuLink} to="perfcalc" key="perfcalc" leftIcon={<IsoIcon/>} text="Performance Calculator"/> 
								</List>
							</div>
							</Drawer>
						</nav>

						<main className={classes.content}>
							<div className={classes.toolbar} />
							<Switch>
								<Route exact path='/'>
									<Container id="home-content">
										Home
									</Container>
								</Route>

								<Route path='/new'>
									<Container id="new-content">
										New
									</Container>
								</Route>

								<Route path='/find'>
									<Container id="find-content">
										Find
									</Container>
								</Route>

								<Route path='/perfcalc'>
									<Container id="perfcalc-content" maxWidth="sm">
										<PerfCalc/>
									</Container>
								</Route>
							</Switch>
						</main>
					</div>
				</ReactBrowser>
}