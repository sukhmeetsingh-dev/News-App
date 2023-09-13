import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps ={
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes ={
        country: 'propTypes.string',
        pageSize: 'propTypes.number',
        category: 'propTypes.string'
    }

    capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor() {
        super();
        console.log("hello guys");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResult: 0
        }
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bdfb66584d5841cfa93f25cd5cf68be4
            &page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, 
            totalResult: parsedData.totalResults ,
            loading: false})
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({page: this.state.page -1});
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({page: this.state.page +1});
        this.updateNews();
    }

    render() {
        console.log("Render")
        return (
            <div className="container my-3">
                <h1 className="text-center">Alpha News - Top Headlines from {this.capitalizeFirstLetter(this.props.category)} </h1>
                {/* {this.state.loading && <Spinner/>} */}
                <InfiniteScroll 
                    dataLength={this.state.articles.length}
                     next={this.fetchMoreData}
                     hasMore={this.state.articles.length !== this.state.totalResult} 
                     loader={<Spinner/>}>
                 </InfiniteScroll>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} 
                                source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
                         &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} 
                        type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News