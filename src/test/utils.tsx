import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { RootState } from '@src/redux/store/rootReducer';
import { PreloadedState, Store } from 'redux';
import { ThemeProvider } from 'styled-components';
import theme from '@src/styles/theme';
import setupStore from '@src/redux/store/store';

//아래 코드 Extended~~ 인터페이스는 RTL에서 기본적인 렌더 옵션을 확장하며, initialState,
//store와 같은 다른 항목을 지정할 수 있도록 사용자에게 허용합니다.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: Store;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    // 스토어 인스턴스가 전달되지 않았을 경우 자동으로 스토어 인스턴스를 생성한다.
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from '@testing-library/react';
