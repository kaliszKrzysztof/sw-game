import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarRoot: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: theme.spacing(),
      paddingBottom: theme.spacing(),
    },
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar color="default" position="static">
      <Toolbar classes={{ root: classes.toolbarRoot }}>
        <Link href="/">
          <a>
            <Image
              priority
              src="/logo.png"
              alt="Star Wars"
              width={200}
              height={86}
            />
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
