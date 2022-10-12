import React from 'react'

const Newsitem = (props) => {

    let { title, discription, image_url, news_url, author, date, source } = props
    return (
        <>
            <div>
                <div className="card my-3" >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        <span className=" badge rounded-pill bg-danger"> {source}</span>

                    </div>
                    <img src={image_url ? image_url : "	https://static.cryptobriefing.com/wp-content/uploa…Meets-Resistance-After-24-Rally-cover-768x403.png"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>

                        <p className="card-text">{discription}</p>
                        <p className="card-text"><small className="text-muted"> by {author ? author : "unknown"} on {new Date(date).toGMTString()}3 mins ago</small></p>

                        <a href={news_url} target="blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>

        </>
    )

}
export default Newsitem
