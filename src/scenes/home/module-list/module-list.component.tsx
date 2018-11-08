import * as React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { RootReducerState } from '../../../state/reducers';
import { ModuleListItem } from './module-list-item/module-list-item.component';
import { ContentModule } from '../../../constants';
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
                                      }: Props) => (
  <div className={`bg-near-white overflow-y-scroll ${className}`} style={{minWidth: '24rem'}}>
    {
      modules.map((module: ContentModule, index: number) => (
        <ModuleListItem
          key={index}
          index={index}
          onDrop={handleDrop}
          id={module.id}
          name={module.name}
          complexity={module.complexity}
          modules={modules}
        />
      ))
    }
  </div>
);

const ConnectedModuleList = connect(
  (state: RootReducerState, ownProps: Props) => ({
    timeline: get(state, 'module.timeline', []),
    modules: get(state, 'module.modules', []),
    ...ownProps
  }),
  {
    handleDrop: DROP_MODULE.createAction,
  }
)(ModuleList);

export {
  ConnectedModuleList as ModuleList
};
