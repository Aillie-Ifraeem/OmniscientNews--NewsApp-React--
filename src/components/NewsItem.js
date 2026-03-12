import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title,description,Imageurl,newsUrl} = this.props /*this is called destructring, if this.props is an object and i am taking out
    title and description from it and storing both in a variable named title and description.
    */  
    return (
      <>
    <div className="card" style={{width: "18rem"}}>
        <img src={!Imageurl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRxp_K7wxwCpePbjPX4cI5aJuXd57vc_-qw&s" : Imageurl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}...</p>
        <a href={newsUrl} target="_black" className="btn btn-dark">Read more</a>
      </div>
    </div>
      </>
    )
  }
}

export default NewsItem
