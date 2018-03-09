import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import plusIcon from '@fortawesome/fontawesome-free-solid/faPlus';

import SessionStore from '../../../store/SessionStore';

import Card from '../../../components/Card';

interface InjectedProps {
  sessionStore: SessionStore;
}

@inject('sessionStore')
@observer
class ListPosts extends React.Component {
  
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
      <div className="container is-fluid">
        <nav className="level">
          <div className="level-left" />
          <div className="level-right">
            <div className="level-item">
              <Link to="/posts/new" className="button is-primary">
                <FontAwesomeIcon icon={plusIcon} />
              </Link>
            </div>
          </div>
        </nav>
        <div className="columns is-multiline">
          {posts.map(post => (
            <div className="column is-half-tablet is-one-third-widescreen">
              <Card
                title={post.title}
                author={post.author}
                image={post.image}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ListPosts;