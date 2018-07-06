import * as React from 'react';

import { createMemoryHistory, History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import { wrapComponentInTestDragDropContext } from '../../../../tests/helpers/dnd';

import { INITIAL_MODULE_STATE } from '../../../state/store';
import { ModuleList } from './module-list.component';
import { classModules } from '../home.content';
import * as TestUtils from 'react-dom/test-utils';
import { ContextComponent } from 'react-dnd';

const configureStore = (routerHistory: History) => configureMockStore([routerMiddleware(routerHistory)]);
const mockStore = configureStore(createMemoryHistory());

const initialState = {
    router: null,
    module: INITIAL_MODULE_STATE
};

describe('ModuleList Component', () => {
    let store;
    let Component;
    let WrappedModuleList;
    let dispatchSpy;

    beforeEach(() => {
        dispatchSpy = jest.fn();
        store = mockStore(initialState);

        WrappedModuleList = wrapComponentInTestDragDropContext(ModuleList, {
            modules: classModules,
            dispatch: dispatchSpy
        });

        Component = (
            <Provider store={store}>
                <div>
                    <WrappedModuleList />
                </div>
            </Provider>
        );
    });

    afterEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });

    it('should be rendered successfully with drag drop context and connected to redux store', () => {
        let root = TestUtils.renderIntoDocument(Component) as ContextComponent;

        expect(root).toBeTruthy();
    });
});
