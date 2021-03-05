import React from 'react';
import Image from 'next/image';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing(8, 0),
    },
    title: {
      marginTop: theme.spacing(4),
    },
  }),
);

interface ErrorInfoProps {
  title: string;
  message: string;
}

const ErrorInfo: React.FC<ErrorInfoProps> = ({ title, message }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Image
        src="/darth_vader.png"
        alt="Something went wrong"
        width={293}
        height={300}
        data-testid="image"
      />
      <Typography
        className={classes.title}
        align="center"
        color="textSecondary"
        variant="h4"
        gutterBottom
        data-testid="title"
      >
        {title}
      </Typography>
      <Typography align="center" color="textSecondary" data-testid="message">
        {message}
      </Typography>
    </div>
  );
};

export default ErrorInfo;
