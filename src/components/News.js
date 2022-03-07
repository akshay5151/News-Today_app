import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize : 8 ,
    category : "business"
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize:PropTypes.number,
    category : PropTypes.string
  }
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page : 1
    };
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=da45c5ccb9054624b3166c17bda6fe0f&page=1&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles : parsedData.articles,
       totalArticles:parsedData.totalArticles,
       loading : false
      })
  }

  handlePreClick=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=da45c5ccb9054624b3166c17bda6fe0f&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      page: this.state.page - 1,
      articles : parsedData.articles,
      loading : false
    })
  }

  handleNextClick= async()=>{
    if(!(this.state.page +1 > Math.ceil(this.state.totalArticles/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=da45c5ccb9054624b3166c17bda6fe0f&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles : parsedData.articles,
        loading : false
      })
    }   
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin : '35px 0px'}}>NewsToday - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key ={element.url}>
                <NewsItem 
                  title={element.title?element.title:""}
                  description={element.description?element.description:""}
                  imgurl={element.urlToImage}
                  newsurl={element.url} author ={element.author} date = {element.publishedAt} source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News
