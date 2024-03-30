import './Recommended.css'
import { value_converter } from '../../Data'
import { useEffect, useState } from 'react'
import { API_KEY } from '../../Data'
import { Link } from 'react-router-dom'

//eslint-disable-next-line
const Recommended = ({categoryId}) => {
  
  const[apiData,setApiData]=useState([])

  const fetchData=async()=>{
    const relatedVideo_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
    await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items))
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="recommended">
      {apiData.map((item,index)=>{
        return(
      <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <div className="video-info">
          <h4>{item.snippet.title}</h4>
          <p>{item.snippet.channelTitle}</p>
          <p>{value_converter(item.statistics.viewCount)} views</p>
        </div>
      </Link>
        )
      })}
    </div>
  )
}

export default Recommended