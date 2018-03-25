import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import plusIcon from '@fortawesome/fontawesome-free-solid/faPlus';
import Card from '../../../components/Card';
import Post from '../../../types/Post';

import { getPosts } from '../../../api/posts';

class ListPosts extends React.Component {

  state: {
    posts: Post[];
  };

  constructor(props: any) {
    super(props);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    try {
      const posts = await getPosts();
      this.setState({ posts });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
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
          {this.state.posts.map(post => (
            <div key={post.title} className="column is-half-tablet is-one-third-widescreen">
              <Card
                title={post.title}
                author="Aleksi"
                image="https://picsum.photos/1280/640?image=786"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ListPosts;