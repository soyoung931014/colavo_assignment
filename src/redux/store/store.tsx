import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from './rootReducer';
import type { PreloadedState } from '@reduxjs/toolkit';
const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default setupStore;
