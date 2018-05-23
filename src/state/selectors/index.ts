import { RootReducerState } from '../reducers';
import { createSelector } from 'reselect';
import { ContentModule } from '../../constants';
import { get } from 'lodash';

export const getIDsFromList = createSelector(
  (state: RootReducerState) => get(state, 'module.timeline', []),
  (modules: ContentModule[]) => modules.map(mod => mod.id)
);