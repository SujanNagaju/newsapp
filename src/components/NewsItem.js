import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let { title, description, imageUrl, newsUrl, publishedDate, author, source } = this.props;
    return (
      <div>
        <div className="card my-3" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top" alt="card-image" />
          <div className="card-body">
            Source: <span className="badge text-bg-primary">{source}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <small className="text-body-secondary publishedDate">
                By {author ?? "Unknown"} on{" "}
                {new Date(publishedDate).toGMTString()}
              </small>
            </p>
            <p className="card-text">{description}</p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    ); 
  }
}

export default NewsItem
