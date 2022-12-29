import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import loderImg from '../../assets/img/insee-loader.gif'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={loderImg} width='100'/>
      {/* <CircularProgress color="secondary" /> */}
    </div>
  );
}