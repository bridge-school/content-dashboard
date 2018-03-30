import * as React from 'react';

const complexityColors = {
  [1]: 'green',
  [2]: 'gold',
  [3]: 'orange',
  [4]: 'dark-red',
};

interface Props {
  id: string;
  name: string;
  complexity: 1 | 2 | 3 | 4;
}

export const ModuleListItem: React.SFC<Props> = ({ id, name, complexity }: Props) => {
  const complexityClass = `bg-${complexityColors[complexity]}`;
  return (
    <div key={id} className="flex items-center justify-between ph4 bb bw1 b--moon-gray">
      <h3>{name}</h3>
      <div
        className={`ml4 br-100 w2 h2 ${complexityClass} flex items-center justify-center`}
      >
        <h4 className="ma0 white">{complexity}</h4>
      </div>
    </div>
  );
};
