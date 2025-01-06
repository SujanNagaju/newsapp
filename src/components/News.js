import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=33841b956b9a470e8fde67a9a447a5ad&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handleNextClick = async () => {
    if (
      Math.ceil(this.state.totalResults / this.props.pageSize) >
      this.state.page + 1
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${this.props.category}&apiKey=33841b956b9a470e8fde67a9a447a5ad&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=33841b956b9a470e8fde67a9a447a5ad&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Top headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element, index) => {
              return (
                <div className="col-md-4" key={`card-wrapper-${index}`}>
                  <NewsItem
                    title={
                      element.title?.length > 45
                        ? element.title.slice(0, 45) + " ..."
                        : element.title
                    }
                    description={
                      element.description?.length > 88
                        ? element.description.slice(0, 88) + " ..."
                        : element.description
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    publishedDate={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              );
            })}

          {!this.state.loading && (
            <div className="container">
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  onClick={this.handlePrevClick}
                  className="btn btn-dark"
                  disabled={this.state.page <= 1}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={this.handleNextClick}
                  className="btn btn-dark"
                  disabled={
                    this.state.page + 1 >=
                    Math.ceil(this.state.totalResults / this.props.pageSize)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default News
