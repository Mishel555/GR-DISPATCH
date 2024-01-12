import { ChangeEvent, useEffect, useState } from 'react';
import { EModalTypes, ITeam, ModalsPropsType } from '@types';
import { useAppDispatch, useAppSelector, useDebounce } from '@hooks';
import { selectDriverById } from '@selectors/driversSelector';
import { updateDriverById } from '@thunks/driversThunk';
import { closeModal, openModal } from '@slices/modalSlice';
import Footer from './Footer';
import Search from './Search';
import Teams from './Teams';
import { ModalWrapper, Title } from './styled-components';

const ChangeTeam = ({ driverId }: ModalsPropsType<EModalTypes.CHANGE_DRIVER_TEAM>) => {
  const dispatch = useAppDispatch();
  const driver = useAppSelector(selectDriverById(driverId));

  const [team, setTeam] = useState<ITeam | null>(driver?.team || null);
  const [search, setSearch] = useState<string>(driver?.team.alias ?? '');
  const debouncedSearch = useDebounce(search, 300);

  const close = () => dispatch(closeModal());

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const onTeamSelect = (team: ITeam) => {
    setTeam(team);
    setSearch(team.alias);
  };

  const onConfirm = async () => {
    if (!team || !driver || !search || team.id === driver.team.id) {
      return close();
    }

    await dispatch(updateDriverById({ driverId, data: { team: { id: team.id } } }));

    dispatch(openModal({
      type: EModalTypes.SUCCESS_MESSAGE,
      props: {
        timeout: 2000,
        autoHide: true,
        messages: [driver.name, `Team has been changed to “${team.alias}”`],
      },
    }));
  };

  useEffect(() => {
    if (!driver) return;

    setTeam(driver.team);
    setSearch(driver.team.alias);
  }, [driver]);

  return (
    <ModalWrapper>
      <Title>Change Team</Title>
      <Search value={search} onChange={onSearch} />
      {team && <Teams search={debouncedSearch} onSelect={onTeamSelect} />}
      <Footer onCancel={close} onConfirm={onConfirm} />
    </ModalWrapper>
  );
};

export default ChangeTeam;
