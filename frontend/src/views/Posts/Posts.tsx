import * as React from 'react';
import { observer, inject } from 'mobx-react';

import SessionStore from '../../store/SessionStore';

import Card from '../../components/Card';

interface InjectedProps {
  sessionStore: SessionStore;
}

@inject('sessionStore')
@observer
class PostsView extends React.Component {
  
  get injectedProps() {
    return this.props as InjectedProps;
  }
  
  render() {

    const posts = [
      {
        title: 'Lorem ipsum villa helena',
        author: 'Antti',
        image: 'https://picsum.photos/1280/640?image=1080'
      },
      {
        title: 'Lorem ipsum villa helena',
        author: 'Sari',
        image: 'https://picsum.photos/1280/640?image=977'
      },
      {
        title: 'Lorem ipsum villa helena',
        author: 'Anna',
        image: 'https://picsum.photos/1280/640?image=919'
      },
      {
        title: 'Lorem ipsum villa helena',
        author: 'Sari',
        image: 'https://picsum.photos/1280/640?image=786'
      },
      {
        title: 'Lorem ipsum villa helena',
        author: 'Antti',
        image: 'https://picsum.photos/1280/640?image=491'
      },
      {
        title: 'Lorem ipsum villa helena',
        author: 'Ilari',
        image: 'https://picsum.photos/1280/640?image=292'
      },
    ];

    return (
      <>
        <div>
          <div className="columns is-multiline">
            {posts.map(post => (
              <div className="column is-one-third">
                <Card
                  title={post.title}
                  author={post.author}
                  image={post.image}
                />
              </div>
            ))}
            {posts.map(post => (
              <div className="column is-one-third">
                <Card
                  title={post.title}
                  author={post.author}
                  image={post.image}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default PostsView;