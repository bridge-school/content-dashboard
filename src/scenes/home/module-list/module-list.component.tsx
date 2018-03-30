import * as React from 'react';
import { ClassModule } from '../home.content';
import { ModuleListItem } from './module-list-item.component';

interface Props {
  modules: Array<ClassModule>;
  className?: string;
}

export const ModuleList: React.SFC<Props> = ({
  modules,
  className = '',
}: Props) => (
  <div className={`bg-near-white overflow-y-scroll ${className}`}>
    {
      modules.map(module => (
        <ModuleListItem
          {...module}
        />
      ))
    }
  </div>
);
