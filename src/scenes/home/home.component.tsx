import * as React from 'react';

import { SceneContainer } from '@components';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

import { ModuleList } from './module-list/module-list.component';
import { Timeline } from './timeline/timeline.component';
import { LessonPlanNameField } from './lesson-plan-name/lesson-plan-name.component';
// import { LessonPlanList } from '@scenes';

interface Props {}

export const Home: React.SFC<Props> = () => (
  <DragDropContextProvider backend={HTML5Backend}>
    <SceneContainer className="flex-row">
      <ModuleList/>
      <div className="flex-auto pv3 ph4 h-inherit">
        <h2 className="f1 lh-title mt0 dark-gray">Create a Lesson</h2>
        <LessonPlanNameField/>
        <Timeline/>
      </div>
    </SceneContainer>
  </DragDropContextProvider>
);
