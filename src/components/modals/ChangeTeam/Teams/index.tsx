import { useEffect } from 'react';
import { ITeam } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectTeams } from '@selectors/teamsSelector';
import { getTeams } from '@thunks/teamsThunk';
import { TeamsWrapper, TeamButton } from './styled-components';

interface IProps {
  search: string;
  onSelect: (team: ITeam) => void;
}

const Teams = ({ search, onSelect }: IProps) => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector(selectTeams);

  useEffect(() => {
    dispatch(getTeams({
      ...(search?.length > 3 && ({ query: search })),
    }));
  }, [dispatch, search]);

  return (
    <TeamsWrapper direction="vertical">
      {teams?.map((team) => (
        <TeamButton key={team.id} type="link" onClick={() => onSelect(team)}>
          {team.alias}
        </TeamButton>
      ))}
    </TeamsWrapper>
  );
};

export default Teams;
