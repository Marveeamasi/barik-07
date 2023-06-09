import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize:10,
    category:"general"
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

  constructor(){
    super();
    console.log("hey i am a constructor of news component");
    this.state= {
        articles: [],
        loading:false,
        page:1
     }
  }

async componentDidMount(){
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=7dc16a11fb314dbaa12fb074a8a27370&page=1&pagesize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parseData = await data.json();
  console.log(parseData);
  this.setState({
    articles:parseData.articles,
    totalResults:parseData.totalResults,
    loading:false
  })
}


handlePreviousClick=async()=>{
console.log("Previous")

let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=7dc16a11fb314dbaa12fb074a8a27370&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
this.setState({loading:true})
  let data = await fetch(url);
  let parseData = await data.json();
  console.log(parseData);
this.setState({
  page:this.state.page - 1,
  articles:parseData.articles,
  loading:false
   })
}
handleNextClick=async()=>{
console.log("Next");
if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=7dc16a11fb314dbaa12fb074a8a27370&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
this.setState({loading:true})
  let data = await fetch(url);
  let parseData = await data.json();
this.setState({
  page:this.state.page + 1,
  articles:parseData.articles,
  loading:false
   })
  }
}


  render() {
    return (
      <div className='container my-4'>
        <h1 className="text-center" style={{margin: "35px 0"}}>NewsPedia - Top Headlines</h1>
       { this.state.loading && <Spinner/>}
        <div className="row ">
        {!this.state.loading && this.state.articles.map((element)=>{
        return <div className="col-md-4 " key={element.url} >
        <Newsitem title={element.title?element.title.slice(0,46):""} description={element.description?element.description.slice(0,120):""} imageurl={element.urlToImage}newsurl={element.url}/>
        </div>
        })}
          
        </div>
        <div className="container d-flex justify-content-between my-5">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News
