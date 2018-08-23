import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { get } from 'lodash';

import { RootReducerState } from '../../../state/reducers';
import { Action } from '../../../state/actions';

import { classModules } from '../home.content';
import { ModuleListItem } from './module-list-item/module-list-item.component';
import { ContentModule } from '../../../constants';

import { UpdateModule } from '../../../state/actions/editModule';

interface Props {
  modules?: Array<ContentModule>;
  className?: string;
  submitUpdatedModule?: any;
  module?: string;
  dispatch?: Dispatch<Action>;
  timeline?: any;
}

const ModuleList: React.SFC<Props> = ({
                                        modules,
                                        className = '',
                                        dispatch,
                                        submitUpdatedModule
                                      }: Props) => (
  <div className={`bg-near-white overflow-y-scroll ${className}`} style={{minWidth: '24rem'}}>
    {
      modules.map((module: ContentModule, index: number) => (
        <ModuleListItem
          key={index}
          dispatch={dispatch}
          id={module.id}
          name={module.name}
          complexity={module.complexity}
          modules={modules}
          onEdit={submitUpdatedModule}
        />
      ))
    }
  </div>
);

const ConnectedModuleList = connect(
  (state: RootReducerState, ownProps: Props) => ({
    timeline: get(state, 'module.timeline', []),
    modules: get(state, 'module.modules', classModules).filter(m => m.challenges && m.challenges.length),
    ...ownProps
  }),
  (dispatch: Dispatch<Action>, ownProps: Props) => {
    return {
      ...ownProps,
      dispatch,
      submitUpdatedModule: (module: ContentModule, moduleIndex: number) =>
        dispatch(UpdateModule(module, moduleIndex)),
    };
  }
)(ModuleList);

export {
  ConnectedModuleList as ModuleList
};
