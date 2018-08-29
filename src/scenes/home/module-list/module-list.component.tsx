import * as React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { RootReducerState } from '../../../state/reducers';
import { classModules } from '../home.content';
import { ModuleListItem } from './module-list-item/module-list-item.component';
import { ContentModule } from '../../../constants';
import { UpdateModule } from '../../../state/actions/editModule';
import { DROP_MODULE } from '../../../state/actions/dropModule';

interface Props {
  modules?: Array<ContentModule>;
  className?: string;
  submitUpdatedModule?: any;
  module?: string;
  handleDrop?: any;
  timeline?: any;
}

const ModuleList: React.SFC<Props> = ({
                                        modules,
                                        className = '',
                                        handleDrop,
                                        submitUpdatedModule
                                      }: Props) => (
  <div className={`bg-near-white overflow-y-scroll ${className}`} style={{minWidth: '24rem'}}>
    {
      modules.map((module: ContentModule, index: number) => (
        <ModuleListItem
          key={index}
          onDrop={handleDrop}
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
    modules: get(state, 'module.modules', classModules),
    ...ownProps
  }),
  {
    handleDrop: DROP_MODULE.createAction,
    submitUpdatedModule: UpdateModule,
  }
)(ModuleList);

export {
  ConnectedModuleList as ModuleList
};
