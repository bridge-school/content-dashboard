import * as React from 'react';
import {
  DragSource,
  DragSourceSpec,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceCollector,
  ConnectDragSource
} from 'react-dnd';

import { ItemTypes } from '../../../../constants';
import { getComplexityColor } from '../../../../utils';

import { DROP_MODULE } from '../../../../state/actions/dropModule';

import { EditForm } from './module-edit-form/module-edit-form.component';

interface Props {
  id: string;
  name: string;
  complexity: 1 | 2 | 3 | 4 | 5;
  onEdit: Function;
  modules: any;
  dispatch?: any;
  connectDragSource?: ConnectDragSource;
  isDragging?: boolean;
}

type ListItemDragDescriptor = Pick<Props, 'id'>;

const ModuleListItem: React.SFC<Props> = ({ id, name, complexity, connectDragSource, onEdit, modules }: Props) => {
  const complexityClass = `bg-${getComplexityColor(complexity)}`;

  return connectDragSource(
    <div key={id} className="flex items-center justify-between ph4 bb bw1 b--moon-gray">
      <h3>{name}</h3>
      <div className="flex">
        <div
          className={`ml2 mr4 br-100 w2 h2 ${complexityClass} flex items-center justify-center`}
        >
          <h4 className="ma0 white">{complexity}</h4>
        </div>
        <EditForm
          id={id}
          onEdit={onEdit}
          modules={modules}
        />
      </div>
    </div>
  );
};

const moduleListItemCollect: DragSourceCollector = function (connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const moduleListItemSource: DragSourceSpec<Props> = {
  isDragging(props: Props, monitor: DragSourceMonitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return (monitor.getItem() as ListItemDragDescriptor).id === props.id;
  },

  beginDrag(props: Props, monitor: DragSourceMonitor): ListItemDragDescriptor {
    return { id: props.id };
  },

  endDrag(props: Props, monitor: DragSourceMonitor) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    let droppedItem = monitor.getItem();

    if (props.dispatch) {
      props.dispatch(DROP_MODULE.createAction(droppedItem as any));
    }
  }
};

const DraggableModuleListItem = DragSource(
  ItemTypes.Module,
  moduleListItemSource,
  moduleListItemCollect
)(ModuleListItem);

export {
  DraggableModuleListItem as ModuleListItem,
  Props as ListItemProps
};
