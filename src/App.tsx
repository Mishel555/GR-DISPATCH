import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from '@store';
import { THEME } from '@constants/theme';
import { cacheService } from '@services/cache';
import { RootRouter } from '@components/routers';

const initApp = () => {
  const searchParams = Object.fromEntries(new URLSearchParams(window.location.search));
  const session = searchParams.session;

  if (session) {
    sessionStorage.setItem('session', session);
  }

  const loadListener = () => {
    // cleanup session state....
    cacheService.resetSessionState();

    window.removeEventListener('load', loadListener);
  };

  window.addEventListener('load', loadListener);
};

const App = () => {
  useEffect(() => {
    initApp();
  }, []);

  return (
    <ConfigProvider theme={THEME}>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </ConfigProvider>
  );
};

export default App;
