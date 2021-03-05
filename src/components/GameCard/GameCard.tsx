import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { Attribute } from 'types/game';

export type GameCardStatus = 'win' | 'lose' | 'draw';

interface GameCardProps {
  title: string;
  attributes: Attribute[];
  expanded: boolean;
  status?: GameCardStatus;
}

const getStyles = (status: GameCardStatus): React.CSSProperties => {
  switch (status) {
    case 'win': {
      return {
        borderColor: '#149414',
        color: '#149414',
      };
    }
    case 'lose': {
      return {
        borderColor: '#F44336',
        color: '#F44336',
      };
    }
    case 'draw': {
      return {
        borderColor: '#FCCF14',
        color: '#FCCF14',
      };
    }
    default: {
      return {};
    }
  }
};

const GameCard: React.FC<GameCardProps> = ({
  title,
  attributes,
  expanded,
  status,
}) => {
  return (
    <Card variant="outlined" style={getStyles(status)} data-testid="game-card">
      <CardHeader
        title={title}
        titleTypographyProps={{ align: 'center', color: 'inherit' }}
      />
      {attributes.length > 0 && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent data-testid="attributes">
            {attributes.map(({ name, value }, index) => (
              <Typography
                data-testid="attribute"
                color="inherit"
                key={name}
                align="center"
                paragraph={index < attributes.length - 1}
              >{`${name}: ${value}`}</Typography>
            ))}
          </CardContent>
        </Collapse>
      )}
    </Card>
  );
};

export default GameCard;
