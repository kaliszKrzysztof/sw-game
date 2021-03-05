import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: fade('#000', 0.3),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
  }),
);

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 40 }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={size} data-testid="loader" />
    </div>
  );
};

export default Loader;
