import { useEffect, useState } from 'react';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { IMapViewSettings, MapLegendsType, MapPolygonsType, MapViewType } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectMapViewSettings } from '@selectors/configSelector';
import { closeModal } from '@slices/modalSlice';
import { setMapView } from '@slices/configSlice';
import { ModalWrapper, Title, StyledDivider, ModalContent } from './styled-components';

import ViewSettings from './ViewSettings';
import LabelSettings from './LabelSettings';
import PolygonSettings from './PolygonSettings';
import MapLegend from './MapLegend';
import Footer from './Footer';

const MapSettings = () => {
  const dispatch = useAppDispatch();
  const mapViewSettings = useAppSelector(selectMapViewSettings);

  const [settings, setSettings] = useState<IMapViewSettings>({
    view: 'default',
    legend: 'orders',
  });

  const close = () => dispatch(closeModal());

  const onDropOffChange = (value: CheckboxValueType[]) => {
    const data = !!value.length;

    if (settings.hideDropOff !== data) {
      setSettings(prevState => ({ ...prevState, hideDropOff: data }));
    }
  };

  const onLegendChange = (value: MapLegendsType) => {
    if (settings.legend !== value) {
      setSettings(prevState => ({ ...prevState, legend: value }));
    }
  };

  const onDriverNameChange = (value: boolean) => {
    if (settings.showDriversName !== value) {
      setSettings(prevState => ({ ...prevState, showDriversName: value }));
    }
  };

  const onViewChange = (value: MapViewType) => {
    if (settings.view !== value) {
      setSettings(prevState => ({
        ...prevState,
        ...(value === 'default' && ({ hideDropOff: false })),
        view: value,
      }));
    }
  };

  const onPolygonChange = (values: MapPolygonsType[]) => {
    if (values.length !== settings.polygons?.length) {
      setSettings(prevState => ({ ...prevState, polygons: values }));
    }
  };

  const onConfirm = () => {
    close();
    dispatch(setMapView(settings));
  };

  useEffect(() => {
    if (mapViewSettings) {
      setSettings(mapViewSettings);
    }
  }, [mapViewSettings]);

  return (
    <ModalWrapper>
      <ModalContent>
        <Title>Map Settings</Title>
        <StyledDivider />
        <ViewSettings
          view={settings.view}
          dropOff={!!settings.hideDropOff}
          onChange={onViewChange}
          onDropChange={onDropOffChange}
        />
        <LabelSettings value={!!settings.showDriversName} onChange={onDriverNameChange} />
        <PolygonSettings polygons={settings.polygons} onChange={onPolygonChange} />
        <MapLegend legend={settings.legend} onChange={onLegendChange} />
      </ModalContent>
      <Footer onCancel={close} onConfirm={onConfirm} />
    </ModalWrapper>
  );
};

export default MapSettings;
