import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import ListPostsView from './ListPosts';
import NewPostView from './NewPost';

const Posts = () => (
  <Switch>
    <Route exact={true} path="/posts" component={ListPostsView} />
    <Route exact={true} path="/posts/new" component={NewPostView} />
  </Switch>
);

export default Posts;