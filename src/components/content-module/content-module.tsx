import * as React from 'react';
import { ContentModule } from '../../constants';

export const ModuleComponent = ({module}: {module: ContentModule}) => {

  const displayDependenciesIfPossible = (mod) => {
    if (mod.dependencies && mod.dependencies.length) {
      return (
        <div className="w-100 black">
          <h3>Dependencies</h3>
          {mod.dependencies.map(id => <span key={id} className="pv2">{id}</span>)}
        </div>
      );
    } else {
      return false;
    }
  };

  const displayChallengesIfPossible = (mod) => {
    if (mod.challenges && mod.challenges.length) {
      return (
        <div className="w-100 black">
          <h3>In Class Challenges</h3>
          <span>{mod.challenges.map(url => <a key={url} className="pv2" href={url} target="_blank">{url}</a>)}</span>
        </div>
      );
    } else {
      return false;
    }
  };

  const displayExtrasIfPossible = (mod) => {
    if (mod.extras && mod.extras.length) {
      return (
        <div className="w-100 black">
          <h3>Extras</h3>
          <span>{mod.extras.map(url => <a key={url} className="pv2" href={url} target="_blank">{url}</a>)}</span>
        </div>
      );
    } else {
      return false;
    }
  };

  return (
    <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4 tc">
    <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
      <span>{module.name}</span>
      <span> - {module.complexity}</span>
    </h1>
    {displayDependenciesIfPossible(module)}
    <div className="w-100 black">
      <h3>Content</h3>
      <a href={module.content} target="_blank">{module.content}</a>
    </div>
    {displayChallengesIfPossible(module)}
    <div className="w-100 black">
      <h3>Homework</h3>
      <a href={module.homework} target="_blank">{module.homework}</a>
    </div>
    <div className="w-100 black">
      <h3>Slides</h3>
      <a href={module.slides} target="_blank">{module.slides}</a>
    </div>
    {displayExtrasIfPossible(module)}
  </article>
  );
}; 