import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { get } from 'lodash';

import { RootReducerState } from '../../../state/reducers';
import { Action } from '../../../state/actions';

import { classModules } from '../home.content';
import { DraggableElement } from './module-list-item/module-list-item.component';
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
    <List component="nav">
      {
        modules.map((module: ContentModule, index: number) => (
          <DraggableElement
            key={index}
            component={() => (
              <ListItem button={true}>
                <ListItemText inset={true} primary={module.complexity}/>
                <ListItemText inset={true} primary={module.name}/>
              </ListItem>
            )}
          modules={modules}
                    onEdit={submitUpdatedModule}/>
        ))
      }
    </List>
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
