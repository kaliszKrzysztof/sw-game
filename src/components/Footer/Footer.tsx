import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(4, 0),
      borderTop: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.grey[100],
    },
    swapiHeader: {
      fontSize: '2rem',
      color: '#FFE81F',
      fontWeight: theme.typography.fontWeightBold,
    },
    swapiText: {
      color: '#FFE81F',
      fontWeight: theme.typography.fontWeightMedium,
    },
  }),
);

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div>
        <Typography align="center" color="textSecondary">
          Powered by
        </Typography>
        <Typography align="center" className={classes.swapiHeader}>
          SWAPI
        </Typography>
        <Typography align="center" color="textSecondary">
          The Star Wars API
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
