import * as React from 'react';
import { ContentModule } from '../../constants';

export const ModuleComponent = ({module}: {module: ContentModule}) => (
  <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4 tc">
    <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
      <span>{module.name}</span>
      <span> - {module.complexity}</span>
    </h1>
    <div className="w-100 black">
      <h3>Dependencies</h3>
      {module.dependencies.map(id => <span key={id} className="pv2">{id}</span>)}
    </div>
    <div className="w-100 black">
      <h3>Content</h3>
      <a href={module.content} target="_blank">{module.content}</a>
    </div>
    <div className="w-100 black">
      <h3>In Class Challenges</h3>
      <span>{module.challenges.map(url => <a key={url} className="pv2" href={url} target="_blank">{url}</a>)}</span>
    </div>
    <div className="w-100 black">
      <h3>Homework</h3>
      <a href={module.homework} target="_blank">{module.homework}</a>
    </div>
    <div className="w-100 black">
      <h3>Slides</h3>
      <a href={module.slides} target="_blank">{module.slides}</a>
    </div>
    <div className="w-100 black">
      <h3>Extras</h3>
      <span>{module.extras.map(url => <a key={url} className="pv2" href={url} target="_blank">{url}</a>)}</span>
    </div>
  </article>
);
