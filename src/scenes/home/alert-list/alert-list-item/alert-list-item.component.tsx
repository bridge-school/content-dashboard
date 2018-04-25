import * as React from 'react';

import { Alert } from '../alert-list.content';

interface Props {
  alert: Alert;

  dispatch?: any;
}

const AlertListItem: React.SFC<Props> = ({ alert }: Props) => {

  return (
    <div key={alert.id} className="flex flex-column items-center bg-near-white justify-between pa2 ma2">
        <h3 className="ma1">{`Module "${alert.module.name}" has unmet prequisites:`}</h3>
        <div>
            {
                alert.missing.map(module => (
                    <div key={`missing-${module.id}`}>
                        {`⚠️ Prerequisite "${module.name}" missing from lesson plan.`}
                    </div>
                ))
            }
            {
                alert.following.map(module => (
                    <div key={`following-${module.id}`}>
                        {`⏰ Prerequisite "${module.name}" should be taught before this module.`}
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
