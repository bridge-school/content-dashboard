import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';
import {
    DropTarget,
    DropTargetSpec,
    DropTargetConnector,
    DropTargetMonitor,
    DropTargetCollector,
    ConnectDropTarget
} from 'react-dnd';

import { RootReducerState } from '../../../state/reducers';
import { ItemTypes } from '../../../constants';
import { ClassModule } from '../home.content';

const complexityColors = {
  [1]: 'green',
  [2]: 'gold',
  [3]: 'orange',
  [4]: 'dark-red',
};

interface Props {
    connectDropTarget?: ConnectDropTarget;
    isOver?: boolean;
    timeline?: Array<ClassModule>;
}

const timelineCollect: DropTargetCollector = function (connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
};

const timelineTarget: DropTargetSpec<Props> = {
    drop: (props: Props, monitor: DropTargetMonitor) => {
        return monitor.getItem();
    }
};

const Timeline: React.SFC<Props> = ({ connectDropTarget, timeline }: Props) => connectDropTarget(
    <div className="flex flex-auto flex-row h-100">
        <div className="flex flex-auto flex-column items-center justify-center">
            <div className="flex flex-row ba b--moon-gray w-100 mw-100 h3 overflow-x-scroll">
                {
                    timeline.map((module: ClassModule, index: number) => (
                        <div 
                            key={index} 
                            className={`flex ba white ph2 bg-${complexityColors[module.complexity]} items-center`} 
                            style={{flex: module.complexity}}
                        >
                            {module.name}
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
);

const ConnectedTimeline = reduxConnect(
    (state: RootReducerState, ownProps: Props) => ({
        timeline: (state.module && state.module.timeline) || [],
        ...ownProps
    }),
    () => ({})
)(Timeline);

const DroppableTimeline = DropTarget(
    ItemTypes.Module,
    timelineTarget,
    timelineCollect
)(ConnectedTimeline);

export {
    DroppableTimeline as Timeline,
    Props as TimelineProps
};
