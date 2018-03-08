import * as React from 'react';

import './Card.css';

interface Props {
  title: string;
  author: string;
  image: string;
}

class Card extends React.PureComponent {

  props: Props;

  render() {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-2by1">
            <img src={this.props.image} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{this.props.title}</p>
              <p className="subtitle is-6">{this.props.author}</p>
            </div>
          </div>

          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris.
            <br />
            <time>8.3.2018</time>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;