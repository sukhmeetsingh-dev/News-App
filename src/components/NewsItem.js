import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className="my-3">
                <div className="card">
                <span className="position-absolute top-0 translate-middle badge roounded-pill bg-danger" style={{left:'90%', zIndex:'1'}} >{source}</span>
                    <img src={!imageUrl?"https:static.theprint.in/wp-content/uploads/2023/09/ANI-20230910171343.jpg":imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-body-secondary">By {!author?"unkown":author} on {new Date(date).toGMTString()} </small></p>
                            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem