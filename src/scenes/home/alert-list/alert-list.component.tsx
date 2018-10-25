import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { get, difference, isEmpty } from 'lodash';

import { RootReducerState } from '../../../state/reducers';
import { Action } from '../../../state/actions';

import { Alert } from './alert-list.content';
import { AlertListItem } from './alert-list-item/alert-list-item.component';

interface Props {
    alerts?: Array<Alert>;
    className?: string;
    dispatch?: Dispatch<Action>;
}

// Note: removed React Stateless Component type here temporarily to avoid ts lint error
const AlertList = ({
  alerts,
  className = '',
  dispatch
}: Props) => (
    alerts && alerts.length > 0 ? 
    ( 
        <div className={`overflow-y-scroll ${className}`}>
            {
                alerts.map((alert: Alert, index: number) => (
                    <AlertListItem
                        key={`ali-${alert.id}`}
                        alert={alert}
                        dispatch={dispatch}
                    />
                ))
            }
        </div>
    )
    : null
);

const selectTimeline = state => get(state, 'module.timeline', []);
const selectAllModules = state => get(state, 'module.allModules', []);

const selectAlerts = createSelector(
    selectTimeline,
    selectAllModules,
    (timeline, modules) => {
        const timelineModuleIds = timeline.map(module => module.id);
        return timeline.reduce(
            (alerts, module, index) => {
                if (!module.dependencies || module.dependencies.length === 0) { return alerts; }

                const precedingModuleIds = index > 0 ? timelineModuleIds.slice(0, index) : [];

                const unmetPrequisites = difference(module.dependencies, precedingModuleIds);
                if (isEmpty(unmetPrequisites)) { return alerts; }

                const missingPrequisiteModuleIds = difference(module.dependencies, timelineModuleIds);
                const followingPrequisiteModuleIds = difference(unmetPrequisites, missingPrequisiteModuleIds);
                const newAlert = {
                    id: module.id,
                    targetPosition: index,
                    module: module,
                    following: modules.filter(followingModule =>
                        followingPrequisiteModuleIds.includes(followingModule.id)
                    ),
                    missing: modules.filter(missingModule =>
                        missingPrequisiteModuleIds.includes(missingModule.id)
                    ),
                };
                return [...alerts, newAlert];
            },
            []  
        );
    }
);

const ConnectedAlertList = connect(
    (state: RootReducerState, ownProps: Props) => ({
        timeline: selectTimeline(state),
        // modules: selectModules(state),
        alerts: selectAlerts(state),
        ...ownProps
    }),
    (dispatch: Dispatch<Action>, ownProps: Props) => {
        return {
            ...ownProps,
            dispatch,
        };
    }
)(AlertList);

export {
    ConnectedAlertList as AlertList
};
