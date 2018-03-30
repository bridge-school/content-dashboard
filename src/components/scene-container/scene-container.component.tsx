import * as React from 'react';

interface Props {
  className?: string;
  children?: React.ReactChild | Array<React.ReactChild>;
  style?: Object;
}

export const SceneContainer: React.SFC<Props> = ({
  className = '',
  style = {},
  children,
}: Props) => (
  <div
    className={`flex flex-column w-100 ${className}`}
    style={style}
  >
    {children}
  </div>
);
