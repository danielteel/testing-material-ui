import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Popover from '@material-ui/core/Popover';

import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
	  '& .MuiTextField-root': {
		margin: theme.spacing(0),
		spacing: theme.spacing(1),
		width: '100%'
	  },
	},
	helpButton:	{ marginRight: theme.spacing(2) },
	rcrList: {textAlign: "center"},
	typography: {
		padding: theme.spacing(2),
	  },
  }));

function ListItemButton(props) {
	return <ListItem button alignItems="center" component={'div'} {...props} />;
}

export default function PerfCalc(props){
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const [rcr, setRCR] = React.useState(23);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};


	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return	<>
				<Typography variant="h6" noWrap style={{textAlign: "center"}} spacing={1}>
					Performance Calculator
				</Typography>
				<form className={classes.root} noValidate autoComplete="off">
					<Grid container spacing={3}>
						<Grid item container xs="6">
							<Grid item xs="12">
								<TextField id="oat" label="OAT (c)" type="number" variant="standard"/>
							</Grid>
							<Grid item xs="12">
								<TextField id="elevation" label="Elevation (ft)" type="number" variant="standard"/>
							</Grid>
							<Grid item xs="12">
								<TextField id="altstng" label="Alt Stng (in/Hg)" type="number" variant="standard"/>
							</Grid>
							<Grid item xs="10">
								<TextField id="rcr" label="RCR" type="number" variant="standard" value={rcr} onChange={(e)=>setRCR(e.target.value)}/>
							</Grid>
							<Grid item xs="2">								
								<IconButton children={<ListIcon />} id="side-menu-open" color="inherit" edge="start" onClick={handleClick} className={classes.helpButton}/>
								<Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
									anchorOrigin={{vertical: 'center',horizontal: 'right',}}
									transformOrigin={{vertical: 'center',horizontal: 'left',}}>
									<Typography className={classes.typography}>Runway Condition Rating</Typography>
									{
										[["Dry", 23, "Good"],["Wet", 15, "Medium-Good"],["Wet Snow", 11, "Medium"],["Wet Ice", 4, "Poor"]].map( rcr =>{
											return <List dense={true} component="div">
														<ListItemButton inset key={"rcr-list-"+rcr[0]} onClick={()=>{handleClose(); setRCR(rcr[1]);}}>
																<Grid container direction="row" justify="center">
																	<Grid className={classes.rcrList} item xs="4"><ListItemText primary={rcr[0]} /></Grid>
																	<Grid className={classes.rcrList} item xs="4"><ListItemText primary={rcr[1]} /></Grid>
																	<Grid className={classes.rcrList} item xs="4"><ListItemText primary={rcr[2]} /></Grid>
																</Grid>
														</ListItemButton>
													</List>
										})
										
									}

								</Popover>
							</Grid>
						</Grid>
						<Grid item container xs="6">
							<Grid item xs="12">
								<TextField id="opwt" label="Op Weight (lbs)" type="number" variant="standard"/>
							</Grid>
							<Grid item xs="12">
								<TextField id="fuel" label="Fuel (lbs)" type="number" variant="standard"/>
							</Grid>
							<Grid item xs="12">
								<TextField id="cargo1" label="Cargo 1 (lbs)" type="number" variant="standard"/>
							</Grid>
							<Grid item xs="12">
								<TextField id="cargo2" label="Cargo 2 (lbs)" type="number" variant="standard"/>
							</Grid>
						</Grid>
						<Grid item xs="12">
							<Button variant="contained" color="primary" style={{justifySelf:"center"}}>
								Calculate
							</Button>
						</Grid>
					</Grid>
				</form>
			</>
}