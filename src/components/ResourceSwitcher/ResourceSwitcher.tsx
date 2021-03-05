import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

type Item = {
  name: string;
  id: string;
  disabled: boolean;
};

interface ResourceSwitcherProps {
  items: Item[];
  activeItemId: string;
  onClick: (resource: string) => void;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const ResourceSwitcher: React.FC<ResourceSwitcherProps> = ({
  items,
  activeItemId,
  onClick,
}) => {
  const classes = useStyles();
  if (items.length === 0) {
    return null;
  }
  return (
    <Paper className={classes.root}>
      <Tabs
        value={activeItemId}
        onChange={(_, value) => onClick(value)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {items.map(({ name, id, disabled }) => (
          <Tab
            value={id}
            key={id}
            label={name}
            disabled={disabled}
            data-testid={id}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default ResourceSwitcher;
