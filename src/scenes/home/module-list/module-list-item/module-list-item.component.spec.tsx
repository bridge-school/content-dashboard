import * as React from 'react';

import * as TestUtils from 'react-dom/test-utils';
import { ContextComponent, DragSourceMonitor } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';

import { wrapComponentInTestDragDropContext } from '../../../../../tests/helpers/dnd';

import { ModuleListItem } from './module-list-item.component';

describe('ModuleListItem', () => {
  it(`should render ModuleListItem with DragDropContext`, () => {
    const ListItem = wrapComponentInTestDragDropContext(ModuleListItem);
    // @ts-ignore
    const root: ContextComponent =
      // @ts-ignore
      TestUtils.renderIntoDocument(<ListItem id={1} modules={[{id: 1, name: 'Foo'}]} />) as ContextComponent;

    expect(root).toBeTruthy();
  });

  it('should set isDragging to true when item is being dragged', () => {
    const ListItem = wrapComponentInTestDragDropContext(ModuleListItem);
    const root = TestUtils.renderIntoDocument(
      <ListItem id={1} modules={[{id: 1, name: 'Foo'}]} />
      // @ts-ignore
    ) as ContextComponent;


    const backend: TestBackend = root.getManager().getBackend();

    const item = TestUtils.findRenderedComponentWithType(root as any, ModuleListItem);

    // @ts-ignore
    backend.simulateBeginDrag([item.getHandlerId()]);

    // @ts-ignore
    expect(item.state.isDragging).toBe(true);
  });

  describe('Dragging and dropping', () => {
    let ListItem;
    // @ts-ignore
    let root: ContextComponent;
    let backend: TestBackend;
    let manager: any & {monitor: DragSourceMonitor};
    let oldMonitor: DragSourceMonitor;
    let dropSpy;

    beforeEach(() => {
      dropSpy = jest.fn();
      ListItem = wrapComponentInTestDragDropContext(ModuleListItem);
      root = TestUtils.renderIntoDocument(
        <ListItem onDrop={dropSpy} id={1} modules={[{id: 1, name: 'Foo'}]}  />
        // @ts-ignore
      ) as ContextComponent;

      manager = root.getManager();
      backend = manager.getBackend();
      oldMonitor = manager.monitor;
    });

    afterEach(() => {
      manager.monitor = oldMonitor;
      jest.clearAllMocks();
    });

    it('should result in onDrop callback (given the target was valid for dropping)', () => {
      const item = TestUtils.findRenderedComponentWithType(root as any, ModuleListItem);

      // @ts-ignore
      backend.simulateBeginDrag([item.getHandlerId()]);

      manager.monitor.didDrop = jest.fn(() => true);
      backend.simulateEndDrag();

      expect(dropSpy).toBeCalledWith(
        expect.objectContaining({"id": 1})
      );
    });

    it('should not result in onDrop callback (given the drop was not successful)', () => {
      const item = TestUtils.findRenderedComponentWithType(root as any, ModuleListItem);

      // @ts-ignore
      backend.simulateBeginDrag([item.getHandlerId()]);


      manager.monitor.didDrop = jest.fn(() => false);
      backend.simulateEndDrag();

      expect(dropSpy).not.toBeCalled();
    });
  });
});
