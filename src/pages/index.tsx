import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import { getAllPeople } from 'api/people';
import { getAllStarships } from 'api/starships';
import { Person } from 'types/people';
import { Starship } from 'types/starships';
import { GameItemData } from 'types/game';
import { randomValuesFromArray } from 'helpers/app';
import { personToGameData } from 'helpers/people';
import { starshipToGameData } from 'helpers/starships';
import ResourceSwitcher from 'components/ResourceSwitcher';
import ErrorInfo from 'components/ErrorInfo';
import Game from 'components/Game';

interface HomeProps {
  data: {
    people: Person[];
    starships: Starship[];
  };
  error?: boolean;
}

const Home: NextPage<HomeProps> = ({ data: { people, starships }, error }) => {
  const switcherItems = [
    {
      id: 'people',
      name: 'People',
      disabled: people.length < 2,
    },
    {
      id: 'starships',
      name: 'Starships',
      disabled: starships.length < 2,
    },
  ];
  const activeResourceId =
    switcherItems.find(({ disabled }) => !disabled)?.id || '';
  const [activeResource, setActiveResource] = React.useState<string>(
    activeResourceId,
  );

  const handlePlayClick = (): [GameItemData, GameItemData] => {
    if (activeResource === 'people') {
      const [person1, person2] = randomValuesFromArray(people, 2).map(
        personToGameData,
      );
      return [person1, person2];
    }
    if (activeResource === 'starships') {
      const [ship1, ship2] = randomValuesFromArray(starships, 2).map(
        starshipToGameData,
      );
      return [ship1, ship2];
    }
  };

  if (error || (people.length < 2 && starships.length < 2)) {
    return (
      <ErrorInfo
        title="Something went wrong"
        message="Please contact kalisz.krzysztofl@gmail.com if the problem persists."
      />
    );
  }
  return (
    <div>
      <ResourceSwitcher
        activeItemId={activeResource}
        items={switcherItems}
        onClick={(item) => setActiveResource(item)}
      />
      <Game
        playButtonText={
          activeResource === 'people'
            ? 'Play with random characters!'
            : 'Play with random starships!'
        }
        onPlayClick={handlePlayClick}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const peoplePromise = getAllPeople();
  const starshipsPromise = getAllStarships();
  const [peopleResponse, starshipsResponse] = await Promise.all([
    peoplePromise,
    starshipsPromise,
  ]);
  const [peopleError, people] = peopleResponse;
  const [starshipsError, starships] = starshipsResponse;

  if (peopleError || starshipsError) {
    return {
      props: {
        data: {
          people: [],
          starships: [],
        },
        error: true,
      },
    };
  }

  return {
    props: {
      data: {
        people,
        starships,
      },
    },
  };
};

export default Home;
