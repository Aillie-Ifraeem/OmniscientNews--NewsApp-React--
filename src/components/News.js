import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    setLoading(true);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b4ec811cb4f348429429d92888d5c801&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);
  };

  useEffect(() => {
    document.title = `OmniscientNews - ${props.category === 'general' ? 'Home' : props.category}`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${nextPage}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    const newArticles = (parsedData.articles || []).filter(
      (newArticle) =>
        !articles.some(
          (oldArticle) => oldArticle.url === newArticle.url
        )
    );

    setArticles(prev => prev.concat(newArticles)); // important fix
    setTotalResults(parsedData.totalResults || 0);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <>
      <h2 className='my-3 text-center'>
        <b>OmniscientNews - Top {props.category === 'general' ? '' : props.category} Headlines</b>
      </h2>

      {loading && <LoadingSpinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < Math.min(totalResults, 100)}
        loader={<LoadingSpinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-3 my-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  Imageurl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};

export default News;