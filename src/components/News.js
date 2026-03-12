import React, { Component } from 'react'
import NewsItem from './NewsItem'
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types'


export class News extends Component {
static defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general'
}
static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

  constructor(){
    super();  //you have to use this super word to use constructor of this class
    console.log("hello i am constructor from news component");
    //with this.state we can set state inside a constructor
    this.state = {
      articles: [],
      loading: false,
      page: 1
      
    }
  }

  

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4ec811cb4f348429429d92888d5c801&page=1&pageSize=${this.props.pageSize}`;
    //let url = "https://newsapi.org/v2/top-headlines?country=${this.country}&apiKey=b4ec811cb4f348429429d92888d5c801&page=1&pageSize=${this.props.pageSize}";
    this.setState({loading:true});
    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({articles: parsedData.articles,
       totalResults: parsedData.totalResults,
      loading: false
      })
  }

  handlePreviousClick = async ()=>{
   

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4ec811cb4f348429429d92888d5c801&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
       this.setState({loading:true})
      let data = await fetch(url);
       let parsedData = await data.json();
       this.setState({
         
        page: this.state.page - 1,
  articles: parsedData.articles || [],
  loading: false
       })
    
  }

  handleNextClick = async ()=>{
     if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)) { //this --> Math.ceil(this.state.totalResults/20) tell us how much pages do we need to show all of our result
      
      console.log("NO NEXT PAGE !")
    }else{
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4ec811cb4f348429429d92888d5c801&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
   this.setState({loading: true});
   let data = await fetch(url);
    let parsedData = await data.json();

     if (!parsedData.articles) return;

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles || [],
      loading: false
    })

  }

  }
  
  render() {
    return (
      <div className='container my-3'>
        <h2>NewsMinion - Top Headlines</h2>
       {this.state.loading && <LoadingSpinner />}
        <div className="row">
          {!this.state.loading && ((this.state.articles || []).map((element)=>{
            
          return <div className="col-md-3 my-3" key={element.url}>
                    <NewsItem  title={element.title ? element.title.slice(0, 45):""} description ={element.description ? element.description.slice(0, 88):""} Imageurl={element.urlToImage} newsUrl={element.url} />
                  </div>
          }))}

        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(Math.min(this.state.totalResults,100)/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
