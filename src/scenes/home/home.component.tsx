import * as React from 'react';
import { SceneContainer } from '@components';
import { ModuleList } from './module-list/module-list.component';
import { classModules } from './home.content';

interface Props {}

export const Home: React.SFC<Props> = () => (
  <SceneContainer className="flex-row">
    <ModuleList modules={classModules} />
    <div className="flex-auto pv3 ph4">
      <h2 className="f1 lh-title mt0 dark-gray">Create a Lesson</h2>
    </div>
  </SceneContainer>
);
