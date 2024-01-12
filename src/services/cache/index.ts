import { IMapViewSettings } from '@types';

const MAP_VIEW_VERSION = '0.0.1'; // update if you need to reset clients storage
const MAP_VIEW_KEY = 'MAP_VIEW_SETTINGS';

const SESSION_STATE_VERSION = '0.0.1'; // update if you need to reset clients storage
const SESSION_STATE_KEY = 'SESSION_STATE';

const clearMapSettings = () => {
  localStorage.removeItem(MAP_VIEW_KEY);
};

const saveMapSettings = (data: IMapViewSettings) => {
  localStorage.setItem(MAP_VIEW_KEY, JSON.stringify({ ...data, version: MAP_VIEW_VERSION }));
};

const getMapSettings = (): IMapViewSettings | null => {
  const data = localStorage.getItem(MAP_VIEW_KEY);

  if (data) {
    const json = JSON.parse(data);

    if (json.version !== MAP_VIEW_VERSION) {
      clearMapSettings();
      return null;
    }

    return JSON.parse(data);
  }

  return null;
};

const saveSessionState = (key: string, state: unknown, version = '0.0.1') => {
  const sessionState = sessionStorage.getItem(SESSION_STATE_KEY);

  if (sessionState) {
    const data = JSON.parse(sessionState);

    sessionStorage.setItem(SESSION_STATE_KEY, JSON.stringify({
      ...data,
      [key]: { version, data: state },
      version: SESSION_STATE_VERSION,
    }));
  } else {
    sessionStorage.setItem(SESSION_STATE_KEY, JSON.stringify({
      [key]: { version, data: state },
      version: SESSION_STATE_VERSION,
    }));
  }
};

const getSessionState = <T>(key: string): T | null => {
  const sessionState = sessionStorage.getItem(SESSION_STATE_KEY);

  if (!sessionState) return null;

  const data = JSON.parse(sessionState);
  const storageItem = data[key];

  if (storageItem) {
    return storageItem.data as T;
  }

  return null;
};

const removeSessionState = (key: string) => {
  const sessionState = sessionStorage.getItem(SESSION_STATE_KEY);

  if (sessionState) {
    const data = JSON.parse(sessionState);

    if (data[key] !== undefined) {
      delete data[key];
    }

    sessionStorage.setItem(SESSION_STATE_KEY, JSON.stringify(data));
  }
};

const resetSessionState = () => {
  sessionStorage.removeItem(SESSION_STATE_KEY);
};

export const cacheService = {
  saveMapSettings,
  getMapSettings,
  saveSessionState,
  getSessionState,
  removeSessionState,
  resetSessionState,
};
