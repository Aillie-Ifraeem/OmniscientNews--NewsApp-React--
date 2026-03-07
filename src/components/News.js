import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  


  constructor(){
    super();  //you have to use this super word to use constructor of this class
    console.log("hello i am constructor from news component");
    //with this.state we can set state inside a constructor
    this.state = {
      articles: [],
      loading: false
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=b4ec811cb4f348429429d92888d5c801";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles})
  }
  render() {
    return (
      <div className='container my-3'>
        <h2>NewsGeek - Top Headlines</h2>
        <div className="row">
        {this.state.articles.map((element)=>{
            
        return <div className="col-md-3 my-3" key={element.url}>
        <NewsItem  title={element.title ? element.title.slice(0, 45):""} description ={element.description ? element.description.slice(0, 88):""} Imageurl={element.urlToImage} newsUrl={element.url} />
        </div>
        })}

        </div>
        
      </div>
    )
  }
}

export default News
