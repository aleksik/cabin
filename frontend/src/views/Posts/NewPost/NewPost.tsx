import * as React from 'react';
import firebase from '../../../firebase';
import Post from '../../../types/Post';

class NewPost extends React.Component {

  state: {
    title: string;
    content: string;
    coverImage: File | null;
    saved: boolean;
    error: boolean;
    loading: boolean;
  };

  coverImageInput: HTMLInputElement | null;

  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      content: '',
      coverImage: null,
      saved: false,
      error: false,
      loading: false
    };
  }

  handleInputChange(event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) {
    const target = event.target as HTMLInputElement;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Early exit if already loading
    if (this.state.loading) {
      return;
    }

    this.setState({
      loading: true
    });

    try {
      const post: Post = {
        title: this.state.title,
        content: this.state.content,
        coverImage: null,
        createdAt: new Date()
      };

      // Upload cover image
      if (this.state.coverImage) {
        const storageRef = firebase.storage.ref();
        const imageRef = storageRef.child(`images/${this.state.coverImage.name}`);
        const snapshot = await imageRef.put(this.state.coverImage);
        post.coverImage = snapshot.ref.fullPath;
      }

      // Save the post
      await firebase.db.collection('posts').add(post);

      this.setState({ 
        saved: true,
        loading: false
      });

    } catch (error) {

      this.setState({
        error: true,
        loading: false
      });

    }
  }

  handleCoverImageInputChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const acceptedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    let coverImage;

    if (target.files && acceptedTypes.indexOf(target.files[0].type) > -1) {
      coverImage = target.files[0];
    }

    this.setState({
      coverImage: coverImage
    });
  }
  
  render() {
    return (
      <div className="container is-fluid">
        <h2 className="title is-3">New post</h2>
        <form className="box" onSubmit={e => this.handleSubmit(e)}>
          {this.state.saved && (
            <article className="message is-primary">
              <div className="message-body">
                <strong>Saved!</strong>
              </div>
            </article>
          )}
          {this.state.error && (
            <article className="message is-danger">
              <div className="message-body">
                <strong>Error!</strong>
              </div>
            </article>
          )}
          <div className="field">
            <label className="label is-medium">Title</label>
            <div className="control">
              <input
                name="title"
                className="input is-medium" 
                type="text" 
                placeholder="Text input"
                value={this.state.title}
                onChange={e => this.handleInputChange(e)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label is-medium">Content</label>
            <div className="control">
              <textarea 
                name="content"
                className="textarea is-medium"
                placeholder="Textarea"
                value={this.state.content}
                onChange={e => this.handleInputChange(e)}
              />
            </div>
          </div>
          
          <div className="field">
            <label className="label is-medium">Cover image</label>
            <div className="control">
              <div className="file has-name is-medium">
                <label className="file-label">
                  <input
                    name="coverImage"
                    className="file-input" 
                    type="file"
                    ref={input => {
                      this.coverImageInput = input;
                    }}
                    onChange={e => this.handleCoverImageInputChange(e)}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload" />
                    </span>
                    <span className="file-label">
                      Choose a file…
                    </span>
                  </span>
                  <span className="file-name">
                    {this.state.coverImage && this.state.coverImage.name}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button 
                type="submit" 
                className={`button is-link is-medium ${this.state.loading && 'is-loading'}`}
              >
                Submit
              </button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default NewPost;