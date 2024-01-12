import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    articles = [];
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalArticles: 0,
        }
        document.title = `${this.capitalize(this.props.category)} - NewsWave`
    }
    capitalize = (str)=>str = str.charAt(0).toUpperCase() + str.slice(1);

    async componentDidMount() {
        await this.fetchData();
    }

    fetchData = async () => {
        this.props.setProgress(10);
        const { page } = this.state;
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
        try {
            this.setState({
                loading: true
            })
            this.props.setProgress(30);
            let data = await fetch(url);
            this.props.setProgress(50);
            let parsedData = await data.json();
            this.props.setProgress(75);
            await this.setState({
                articles: parsedData.articles,
                totalArticles: parsedData.totalResults,
                loading: false
            });
            this.props.setProgress(100);
        } catch (error) {
            console.log("Error in fetch API");
        }
    }

    handlePrevClick = async () => {
        await this.setState((prevState) => ({
            page: prevState.page - 1
        }));
        await this.fetchData();
    }
    handleNextClick = async () => {
        await this.setState((prevState) => ({
            page: prevState.page + 1
        }));
        await this.fetchData();
    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>Top Headlines - NewsWave</h2>
                {this.state.loading && <Spinner />}
                {!this.state.loading && <div className="row">
                    {this.state.articles.map(({ title, description, urlToImage, url,publishedAt, source }) =>
                        < div key={url} className="col-md-4 col-sm-6">
                            <NewsItem title={title} description={description} imageUrl={urlToImage ? urlToImage : 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-live-poster-design-template-246158d7780548f5b1bc22dfb93d8651_screen.jpg?ts=1619083519'} newsUrl={url} publishedAt={publishedAt} source={source} />
                        </div>
                    )}
                </div>}
                {!this.state.loading && <div className='d-flex justify-content-center'>
                    <button disabled={this.state.page <= 1} className='btn btn-dark mx-2 my-2' onClick={this.handlePrevClick}><i className="me-1 fa-solid fa-angle-left"></i>Prev</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalArticles / this.props.pageSize)} className='btn btn-dark mx-2 my-2' onClick={this.handleNextClick}>Next<i className="ms-1 fa-solid fa-angle-right"></i></button>
                </div>}
            </div >
        )
    }
}
