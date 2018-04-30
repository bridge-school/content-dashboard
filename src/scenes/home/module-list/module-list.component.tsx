import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { get } from 'lodash';

import { RootReducerState } from '../../../state/reducers';
import { Action } from '../../../state/actions';

import { classModules } from '../home.content';
import { ModuleListItem } from './module-list-item/module-list-item.component';
import { ContentModule } from '../../../constants';

interface Props {
    modules?: Array<ContentModule>;
    className?: string;

    module?: string;
    dispatch?: Dispatch<Action>;
}

const ModuleList: React.SFC<Props> = ({
  modules,
  className = '',
  dispatch
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
    (dispatch: Dispatch<Action>, ownProps: Props) => {
        return {
            ...ownProps,
            dispatch,
        };
    }
)(ModuleList);

export {
    ConnectedModuleList as ModuleList
};
