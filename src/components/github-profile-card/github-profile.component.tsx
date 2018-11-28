import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  card: {
    display: 'flex',
    width: 200,
    height: 60
  },
  details: {
    display: 'flex',
    flexDirection: 'column' as any,
    padding: 7
  },
  content: {
    flex: '2 0 auto',
    padding: '0'
  },
  cover: {
    flexGrow: 1
  },
});

interface Props extends WithStyles<typeof styles> {
  user: any;
}

export const GithubProfileCard = withStyles(styles)
((props: Props) => (
  <Card className={props.classes.card}>
    <div className={props.classes.details}>
      <CardContent className={props.classes.content}>
        <Typography variant="h5">{props.user.displayName}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {props.user.email}
        </Typography>
      </CardContent>
    </div>
    <CardMedia
      className={props.classes.cover}
      image={props.user.photoURL}
      title={props.user.displayName}
    />
  </Card>
));
