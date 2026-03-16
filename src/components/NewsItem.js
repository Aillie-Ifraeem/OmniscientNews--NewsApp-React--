import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title,description,Imageurl,newsUrl,author,date, source} = this.props /*this is called destructring, if this.props is an object and i am taking out
    title and description from it and storing both in a variable named title and description.
    */  
    return (
      <>
    <div className="card news-card" style={{width: "18rem"}}>
        <img src={!Imageurl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRxp_K7wxwCpePbjPX4cI5aJuXd57vc_-qw&s" : Imageurl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title} <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%",zindex:"1"}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span></h5>
        <p className="card-text">{description}...</p>
        <p className="card-text"><small className="text-body-secondary">By {!author ? "unknown" : author } on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} target="_black" className="btn btn-dark">Read more</a>
      </div>
    </div>
      </>
    )
  }
}

export default NewsItem
