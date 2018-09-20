import * as React from 'react';
import { ContentModule } from '../../constants';
import { Card, CardContent, Typography } from '@material-ui/core';

const SubSection = ({label, data, linkProp, labelProp, shouldLink = false}: 
  {linkProp?: string, labelProp?: string, label: string, data: string | any[], shouldLink?: boolean}) => (
  <div className="mb3">
    <Typography variant="subheading" className="mb2">{label}</Typography>
    <Typography variant="body1" className="truncate">
      {
        !Boolean(data) ?
        'Unavailable' :
        Array.isArray(data) && data.length ?
          data.map((item, i) =>
            shouldLink ?
              <a key={label + i} href={linkProp ? item[linkProp] : item} target="_blank" className="db">{labelProp ? item[labelProp] : item}</a> :
              <span className="db" key={label + i}>{item}</span>) :
          shouldLink ?
            <a href={data as string} target="_blank" className="db">{data}</a> :
            data
      }
      </Typography>
  </div>
);

export const ModuleComponent = ({module, cohortAssignments}: {module: ContentModule, cohortAssignments?: any[]}) => (
  <Card style={{width: '300px', height: '400px', margin: '15px'}}>
      <CardContent className="flex-grow-1">
        <div style={{marginBottom: '10px'}} >
          <Typography variant="title"> {module.name} </Typography>
          <Typography variant="caption"> Complexity: {module.complexity} </Typography>
        </div>
        
        { module.dependencies && Boolean(module.dependencies.length) &&
          (<SubSection 
            label="Dependencies" 
            shouldLink={true} 
            linkProp='url' 
            labelProp='label' 
            data={module.dependencies.map((mod: any) => ({...mod, url: `/module/${mod.id}`}))} />)
        }

        { module.content &&
          (<SubSection label="Content" data={module.content} shouldLink={true} />)
        }

        { module.challenges &&
          (<SubSection label="Challenges"
                      shouldLink={true}
                      data={cohortAssignments ? cohortAssignments.map(assignment => `https://repl.it/teacher/assignments/${assignment.id}`) : module.challenges ? module.challenges : []}
          />)
        }

        {/*<SubSection label="Homework"*/}
                    {/*data={*/}
                      {/*cohortAssignments ?*/}
                      {/*splitHomeworkFromChallenges(cohortAssignments, [].concat(module.homework).filter(Boolean).map(url => /[^/]*$/.exec(url)[0])) :*/}
                        {/*module.homework || []*/}
                    {/*}*/}
                    {/*shouldLink={true} />*/}

        { module.slides &&
          (<SubSection label="Slides" data={module.slides} shouldLink={true}/>)
        }
        
        { module.extras &&
          (<SubSection label="Extras" shouldLink={true}  data={module.extras ? module.extras : []} />)
        }

      </CardContent>
  </Card>);
