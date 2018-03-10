import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import plusIcon from '@fortawesome/fontawesome-free-solid/faPlus';
import Card from '../../../components/Card';
import fb from 'firebase';
import firebase from '../../../firebase';
import Post from '../../../types/Post';

class ListPosts extends React.Component {

  state: {
    posts: fb.firestore.QueryDocumentSnapshot[] | null;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      posts: null
    };
  }

  async componentDidMount() {
    try {
      const snapshot = await firebase.db.collection('posts').get();
      this.setState({
        posts: snapshot.docs
      });
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
          {this.state.posts && this.state.posts.map(doc => {
            const post = doc.data() as Post;
            return (
              <div key={doc.id} className="column is-half-tablet is-one-third-widescreen">
                <Card
                  title={post.title}
                  author="Aleksi"
                  image="https://picsum.photos/1280/640?image=786"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ListPosts;