import * as React from 'react';

import { SceneContainer } from '@components';
import { cohortLessonPlans } from './lesson-plan-listing.content';
import { LessonPlanListItem } from './lesson-plan-list-item.component';

interface Props {}

export const LessonPlanList: React.SFC<Props> = () => {
  const plans = cohortLessonPlans.map(plan => <LessonPlanListItem key={plan.id} plan={plan} />);
  return (
    <SceneContainer className="">
      <div className="flex justify-center">
        <div className="w-50 pt5">
          {plans}
        </div>
      </div>
    </SceneContainer>
  );
};