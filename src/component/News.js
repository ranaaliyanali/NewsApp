import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News =(props)=> {

  const [articles,setArticles ] = useState([])
  const [loading,setLoading ] = useState(true)
  const [page,setPage ] = useState(1)
  const [totalArticles,setTotalArticles ] = useState(0)
 const capital_first = (str)=>{;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const newupdate = async ()=>{ 
    props.setProgress(10);
    let  url_1 = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.page_size}`
  
  setLoading(true)
  let data = await fetch(url_1);
  props.setProgress(30);
  let parsedata =await data.json()
  props.setProgress(70);
 setArticles(parsedata.articles)
 setTotalArticles(parsedata.totalResults)
 setLoading(false)
 
 props.setProgress(100);
}
useEffect(()=>{
  
  document.title= `${capital_first(props.category)}- News Headline`
  newupdate();
  
},[]
)



// const handleNext = async ()=>{
  
//           setPage(page+1)
//           newupdate()
//   }

//  const handleprevious= async()=>{

//           setPage(page-1)
//            newupdate()
//  }
 const fetchMoreData = async () => {
   
      
      let  url_1 = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.page_size}`
      setPage(page+1)
      let data = await fetch(url_1);
      let parsedata =await data.json()
   
     setArticles(articles.concat(parsedata.articles))
     setTotalArticles(parsedata.totalResults)
   
};
 
    return (
     <>
         <h2 className=" text-center " style={{margin: '35px 0px', marginTop: '90PX'}}>Top {capital_first(props.category)} HeadLine  </h2>
         {loading&&<Spinner/>}
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalArticles}
          loader={<Spinner/>}
        >
      <div className="container">
          <div className='row' >
          { articles.map((element)=>{return <div className='col-md-4 ' key={element.url}>
           <Newsitem  title={element.title} discription={element.description} image_url={element.urlToImage} news_url={element.url}
           author = {element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
           })} 
          </div> 
      </div>
      </InfiniteScroll>         
          {/* <div className='container d-flex justify-content-between'>
                <button type="button" disabled={page<=1} className="btn btn-dark " onClick={handleprevious}> &larr;Previous</button>
                <button type="button" disabled={page >= Math.ceil(totalArticles/props.page_size)}  className="btn btn-dark " onClick={handleNext}>  Next &rarr;</button>
           </div> */}
    </>
          
         
        
    )
  
}

News. propTypes = {
  country: PropTypes.string,
  categeory:PropTypes.string,
  page_size: PropTypes.number,
}
News. defaultProps = {
  country:'in',
  page_size:8,
  categeory:'general'
}

export default News