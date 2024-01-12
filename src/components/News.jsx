import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
export default function News(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0);
    const capitalize = (str) => str = str.charAt(0).toUpperCase() + str.slice(1);
    useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsWave`;
        fetchData();
    }, [page]);

    const fetchData = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        try {
            setLoading(true);
            props.setProgress(30);
            let data = await fetch(url);
            props.setProgress(50);
            let parsedData = await data.json();
            props.setProgress(75);
            setArticles(parsedData.articles);
            setTotalArticles(parsedData.totalResults);
            setLoading(false);
            props.setProgress(100);
        } catch (error) {
            console.log("Error in fetch API");
        }
    }

    const handlePrevClick = async () => {
        setPage(page - 1);
    }
    const handleNextClick = async () => {
        setPage(page + 1);

    }
    return (
        <div className='container my-3'>
            <h2 className='text-center' style={{margin:"70px 0 10px 0"}}>Top {capitalize(props.category)} Headlines - NewsWave</h2>
            {loading && <Spinner />}
            {!loading && <div className="row">
                {articles.map(({ title, description, urlToImage, url, publishedAt, source }) =>
                    < div key={url} className="col-md-4 col-sm-6">
                        <NewsItem title={title} description={description} imageUrl={urlToImage ? urlToImage : 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-live-poster-design-template-246158d7780548f5b1bc22dfb93d8651_screen.jpg?ts=1619083519'} newsUrl={url} publishedAt={publishedAt} source={source} />
                    </div>
                )}
            </div>}
            {!loading && <div className='d-flex justify-content-center'>
                <button disabled={page <= 1} className='btn btn-dark mx-2 my-2' onClick={handlePrevClick}><i className="me-1 fa-solid fa-angle-left"></i>Prev</button>
                <button disabled={page >= Math.ceil(totalArticles / props.pageSize)} className='btn btn-dark mx-2 my-2' onClick={handleNextClick}>Next<i className="ms-1 fa-solid fa-angle-right"></i></button>
            </div>}
        </div >
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}