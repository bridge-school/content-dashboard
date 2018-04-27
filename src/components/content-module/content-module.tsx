import * as React from 'react';
import { ContentModule } from '../../constants';

export const ModuleComponent = ({module}: {module: ContentModule}) => (
  <div className="w-100 ph3 pv2 white background-gradient_blue">
    <div className="w-100 black">
      <div>{module.name}</div>
      <div>{module.complexity}</div>
    </div>
    <div className="w-100 black">
      <h3>Dependencies</h3>
      {module.ins.map(id => <span key={id} className="pv2">{id}</span>)}
    </div>
    <div className="w-100 black">
      <h3>Content</h3>
      <span>{module.content}</span>
    </div>
    <div className="w-100 black">
      <h3>In Class Challenges</h3>
      <span>{module.challenges.map(url => <a key={url} className="pv2" href={url} target="_blank">{url}</a>)}</span>
    </div>
    <div className="w-100 black">
      <h3>Homework</h3>
      <span>{module.homework}</span>
    </div>
    <div className="w-100 black">
      <h3>Slides</h3>
      <span>{module.slides}</span>
    </div>
    <div className="w-100 black">
      <h3>Extras</h3>
      <span>{module.extras.map(url => <a key={url} className="pv2" href={url} target="_blank">{url}</a>)}}</span>
    </div>
  </div>
);
