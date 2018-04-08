import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootReducerState } from '../../../state/reducers';
import { Action } from '../../../state/actions';

import { ClassModule, classModules } from '../home.content';
import { ModuleListItem } from './module-list-item.component';

interface Props {
    modules?: Array<ClassModule>;
    className?: string;

    module?: string;
    dispatch?: Dispatch<Action>;
}

const ModuleList: React.SFC<Props> = ({
  modules,
  className = '',
  dispatch
}: Props) => (
    <div className={`bg-near-white overflow-y-scroll ${className}`}>
        {
            modules.map((module: ClassModule, index: number) => (
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
        timeline: (state.module && state.module.timeline) || [],
        modules: (state.module && state.module.modules) || classModules,
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
