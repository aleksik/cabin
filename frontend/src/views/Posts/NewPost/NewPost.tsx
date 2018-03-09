import * as React from 'react';
import firebase from '../../../firebase';

class NewPost extends React.Component {

  state = {
    title: '',
    content: '',
    saved: false,
    error: false
  };

  handleInputChange(event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) {
    const target = event.target as HTMLInputElement;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {

      await firebase.db.collection('posts').add({
        title: this.state.title,
        content: this.state.content
      });

      this.setState({ 
        saved: true 
      });

    } catch (error) {

      this.setState({
        error: true
      });

    }
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

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-link is-medium">Submit</button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default NewPost;