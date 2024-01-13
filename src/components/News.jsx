import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
export default function News(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0);
    const capitalize = (str) => str = str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsWave`;
        fetchData();
        setPage((prev)=>prev+1);
    }, []);
    // useEffect(() => {
    //     document.title = `${capitalize(props.category)} - NewsWave`;
    //     console.log("first time");
    //     fetchData();
    // }, []);
    // useEffect(() => {
    //     window.addEventListener("scroll", handleInfiniteScroll);
    // }, []);

    // const handleInfiniteScroll = async () => {
    //     try {
    //         console.log(Math.ceil(window.innerHeight + document.documentElement.scrollTop) + " " + document.documentElement.scrollHeight)
    //         if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.scrollHeight) {
    //             console.log("hello");
    //             console.log(page);
    //             setPage((prev) => prev + 1);
    //             console.log(page);
    //         }
    //     }
    //     catch (error) {
    //         console.log("error in infinite scroll");
    //     }
    // }

    const fetchData = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        try {
            props.setProgress(30);
            let data = await fetch(url);
            props.setProgress(50);
            let parsedData = await data.json();
            props.setProgress(75);
            setArticles((prev) => [...prev, ...parsedData.articles]);
            setTotalArticles(parsedData.totalResults);
            props.setProgress(100);
            setLoading(false);
        } catch (error) {
            console.log("Error in fetch API");
        }
    }

    const fetchMoreData = () => {
        setPage((prev) => prev + 1);
        fetchData();
    }
    return (
        <>
            <h2 className='text-center' style={{ margin: "70px 0 10px 0" }}>Top {capitalize(props.category)} Headlines - NewsWave</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalArticles}
                loader={<Spinner />}
            >
                <div className="container">
                    {<div className="row">
                        {articles.map(({ title, description, urlToImage, url, publishedAt, source }) =>
                            <div key={url} className="col-md-4 col-sm-6">
                                <NewsItem title={title} description={description} imageUrl={urlToImage ? urlToImage : 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-live-poster-design-template-246158d7780548f5b1bc22dfb93d8651_screen.jpg?ts=1619083519'} newsUrl={url} publishedAt={publishedAt} source={source} />
                            </div>
                        )}
                    </div>}
                </div>
            </InfiniteScroll>
        </>
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