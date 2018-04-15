import * as React from 'react';

import { DragDropContext, ContextComponent } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';

export function wrapComponentInTestDragDropContext(DecoratedComponent, otherProps?: object) {
    @DragDropContext(TestBackend)
    class TestContextContainer extends React.Component {
        render() {
            return <DecoratedComponent {...this.props} {...otherProps} />;
        }
    }

    return TestContextContainer as ContextComponent;
}
