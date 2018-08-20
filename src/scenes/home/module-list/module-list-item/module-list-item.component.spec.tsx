import * as React from 'react';

import * as TestUtils from 'react-dom/test-utils';
import { ContextComponent, DragSourceMonitor } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';

import { wrapComponentInTestDragDropContext } from '../../../../../tests/helpers/dnd';

import { ModuleListItem } from './module-list-item.component';
import { DROP_MODULE_TOKEN } from '../../../../state/actions/dropModule';

describe('ModuleListItem', () => {
  it(`should render ModuleListItem with DragDropContext`, () => {
    const ListItem = wrapComponentInTestDragDropContext(ModuleListItem);
    const root: ContextComponent =
      TestUtils.renderIntoDocument(<ListItem id={1} modules={[{id: 1, name: 'Foo'}]} />) as ContextComponent;

    expect(root).toBeTruthy();
  });

  it('should set isDragging to true when item is being dragged', () => {
    const ListItem = wrapComponentInTestDragDropContext(ModuleListItem);
    const root = TestUtils.renderIntoDocument(
      <ListItem id={1} modules={[{id: 1, name: 'Foo'}]} />
    ) as ContextComponent;


    const backend: TestBackend = root.getManager().getBackend();

    const item = TestUtils.findRenderedComponentWithType(root as any, ModuleListItem);

    backend.simulateBeginDrag([item.getHandlerId()]);

    expect(item.state.isDragging).toBe(true);
  });

  describe('Dragging and dropping', () => {
    let ListItem;
    let root: ContextComponent;
    let backend: TestBackend;
    let manager: any & {monitor: DragSourceMonitor};
    let oldMonitor: DragSourceMonitor;
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.fn();
      ListItem = wrapComponentInTestDragDropContext(ModuleListItem);
      root = TestUtils.renderIntoDocument(
        <ListItem dispatch={dispatchSpy} id={1} modules={[{id: 1, name: 'Foo'}]}  />
      ) as ContextComponent;

      manager = root.getManager();
      backend = manager.getBackend();
      oldMonitor = manager.monitor;
    });

    afterEach(() => {
      manager.monitor = oldMonitor;
      jest.clearAllMocks();
    });

    it('should result in dispatching drop action (given the target was valid for dropping)', () => {
      const item = TestUtils.findRenderedComponentWithType(root as any, ModuleListItem);

      backend.simulateBeginDrag([item.getHandlerId()]);

      manager.monitor.didDrop = jest.fn(() => true);
      backend.simulateEndDrag();

      expect(dispatchSpy).toBeCalledWith(
        expect.objectContaining({
            type: DROP_MODULE_TOKEN
          }
        )
      );
    });

    it('should not result in dispatching drop action (given the drop was not successful)', () => {
      const item = TestUtils.findRenderedComponentWithType(root as any, ModuleListItem);

      backend.simulateBeginDrag([item.getHandlerId()]);


      manager.monitor.didDrop = jest.fn(() => false);
      backend.simulateEndDrag();

      expect(dispatchSpy).not.toBeCalled();
    });
  });
});
