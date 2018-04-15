import * as React from 'react';
import {
    DropTarget,
    DropTargetSpec,
    DropTargetConnector,
    DropTargetMonitor,
    DropTargetCollector,
    ConnectDropTarget
} from 'react-dnd';

import { ItemTypes } from '../../../constants';

interface Props {
    connectDropTarget?: ConnectDropTarget;
    isOver?: boolean;
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

const Timeline: React.SFC<Props> = ({ connectDropTarget }: Props) => connectDropTarget(
    <div className="flex flex-auto flex-row h-100">
        <div className="flex flex-auto flex-column items-center justify-center">
            <span className="ba b--moon-gray w-75 h4"/>
        </div>
    </div>
);

const DroppableTimeline = DropTarget(
    ItemTypes.Module,
    timelineTarget,
    timelineCollect
)(Timeline);

export {
    DroppableTimeline as Timeline,
    Props as TimelineProps
};
