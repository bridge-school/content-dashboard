import * as React from 'react';

import { Alert } from '../alert-list.content';
import { INSERT_MODULE_IN_TIMELINE } from '../../../../state/actions/insertModuleInTimeline';

interface Props {
    alert: Alert;
    dispatch?: any;
}

const AlertListItem: React.SFC<Props> = ({ alert, dispatch }: Props) => {
    const addPrerequisiteModule = (id, targetPosition) => dispatch(
        INSERT_MODULE_IN_TIMELINE.createAction({ id, targetPosition })
    );
    return (
        <div key={alert.id} className="flex flex-column items-center bg-near-white justify-between pa2 ma2">
            <h3 className="ma1">{`Module "${alert.module.name}" has unmet prequisites:`}</h3>
            <div>
                {
                    alert.missing.map(module => (
                        <div key={`missing-${module.id}`}>
                            {`⚠️ Prerequisite "${module.name}" missing from lesson plan.`}
                            <span
                                className="ml2 link underline-hover blue"
                                onClick={() => addPrerequisiteModule(module.id, alert.targetPosition)}
                            >
                                Add Module
                            </span>
                        </div>
                    ))
                }
                {
                    alert.following.map(module => (
                        <div key={`following-${module.id}`}>
                            {`⏰ Prerequisite "${module.name}" should be taught before this module.`}
                            <span
                                className="ml2 link underline-hover blue"
                                onClick={() => addPrerequisiteModule(module.id, alert.targetPosition)}
                            >
                                Move Module
                            </span>                            
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export {
    AlertListItem as AlertListItem,
    Props as ListItemProps
};
