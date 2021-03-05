import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { GameItemData } from 'types/game';
import { sleep } from 'helpers/app';
import GameCard from 'components/GameCard';
import Loader from 'components/Loader';
import { fight } from 'helpers/game';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
      },
    },
  }),
);

interface GameProps {
  playButtonText?: string;
  onPlayClick: () => [GameItemData, GameItemData];
}

export const getCardStatus = (
  title: string,
  winner: string,
  draw: boolean,
): 'draw' | 'win' | 'lose' => {
  if (draw) {
    return 'draw';
  }
  if (winner) {
    if (winner === title) {
      return 'win';
    }
    return 'lose';
  }
  return undefined;
};

const Game: React.FC<GameProps> = ({
  playButtonText = 'Play the game',
  onPlayClick,
}) => {
  const classes = useStyles();
  const [resources, setResources] = React.useState<
    ReturnType<typeof onPlayClick>
  >(null);
  const [scores, setScores] = React.useState([0, 0]);
  const [loading, setLoading] = React.useState(false);
  const [winner, setWinner] = React.useState('');
  const [draw, setDraw] = React.useState(false);

  const handlePlayClick = async (): Promise<void> => {
    setLoading(true);
    await sleep(1000);
    setWinner('');
    setDraw(false);
    const randomResources = onPlayClick();
    if (!randomResources) {
      setResources(null);
      return;
    }
    setResources(randomResources);
    await sleep(1000);
    const { winner: newWinner, scores: newScores, draw: newDraw } = fight(
      randomResources,
    );
    setWinner(newWinner);
    setDraw(newDraw);
    setScores(([prevFirstScore, prevSecondScore]) => [
      prevFirstScore + newScores[0],
      prevSecondScore + newScores[1],
    ]);
    setLoading(false);
  };

  return (
    <Box mt={4}>
      {loading && <Loader data-testid="loader" size={80} />}
      <Container maxWidth="md">
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h4" data-testid="score1">
            {scores[0]}
          </Typography>
          <Typography variant="h4" data-testid="score2">
            {scores[1]}
          </Typography>
        </Box>
        {resources?.length > 0 && (
          <div className={classes.cardsWrapper}>
            {resources.map(({ title, attributes }, index) => (
              <React.Fragment key={title}>
                <Box flex={1} width="100%">
                  <GameCard
                    title={title}
                    attributes={attributes}
                    expanded
                    status={getCardStatus(title, winner, draw)}
                  />
                </Box>
                {index < resources.length - 1 && (
                  <Box alignSelf="center" p={4}>
                    VS
                  </Box>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        <Box mb={3}>
          <Button
            fullWidth
            data-testid="play"
            variant="contained"
            color="primary"
            size="large"
            onClick={handlePlayClick}
          >
            {playButtonText}
          </Button>
        </Box>
        <Box>
          <Button
            data-testid="reset"
            fullWidth
            variant="contained"
            onClick={() => setScores([0, 0])}
            size="large"
            disabled={scores.every((score) => score === 0)}
          >
            Reset scores
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Game;
