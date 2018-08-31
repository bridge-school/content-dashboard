import * as React from 'react';
import { ContentModule } from '../../constants';
import { Card, CardContent, Typography } from '@material-ui/core';


const SubSection = ({label, data, shouldLink = false}: {label: string, data: string | any[], shouldLink?: boolean}) => (
  <div>
    <Typography variant="subheading">{label}</Typography>
    <Typography variant="body1" className="truncate">
      {
        !Boolean(data) ?
        'Unavailable' :
        Array.isArray(data) && data.length ?
          data.map((item, i) =>
            shouldLink ?
              <a key={item + i} href={item} target="_blank">{item}</a> :
              <span key={item + i}>{item}</span>) :
          shouldLink ?
            <a href={data as string} target="_blank">{data}</a> :
            data
      }
      </Typography>
  </div>
);

export const ModuleComponent = ({module}: {module: ContentModule}) => (
  <Card style={{width: '300px', height: '400px', margin: '15px'}}>
      <CardContent className="flex-grow-1">
        <div style={{marginBottom: '10px'}} >
          <Typography variant="title"> {module.name} </Typography>
          <Typography variant="caption"> Complexity: {module.complexity} </Typography>
        </div>

        <SubSection label="Dependencies" data={module.dependencies ? module.dependencies : []} />
        <SubSection label="Content" data={module.content} shouldLink={true} />
        <SubSection label="Challenges" shouldLink={true} data={module.challenges ? module.challenges : []} />
        <SubSection label="Homework" data={module.homework} shouldLink={true} />
        <SubSection label="Slides" data={module.slides} shouldLink={true} />
        <SubSection label="Extras" shouldLink={true} data={module.extras ? module.extras : []} />
      </CardContent>
  </Card>);
