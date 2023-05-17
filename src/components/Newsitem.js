import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageurl,newsurl} = this.props;
    return (
      <div>
        <div className="card my-4" >
  <img src={!imageurl? "https://static.toiimg.com/thumb/msid-100199834,width-1070,height-580,imgsize-55094,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a rel="noreferrer" href={newsurl } target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
