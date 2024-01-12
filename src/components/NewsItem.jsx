import React from 'react'

export default function NewsItem(props) {
    let { title, description, imageUrl, newsUrl, publishedAt, source } = props;
    return (
        <div className='mx-2 my-2'>
            <div className="card mx-auto">
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ zIndex: '1', left: '85%' }}>{source.name}</span>
                    <h5 className="card-title">{title}</h5>
                    <p className='text-secondary'>Last updated : {new Date(publishedAt).toGMTString()}</p>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">Read more</a>
                </div>
            </div>
        </div>
    )
}

