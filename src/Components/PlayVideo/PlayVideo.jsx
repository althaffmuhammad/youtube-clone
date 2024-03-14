import './PlayVideo.css'
import like from'../../assets/like.png'
import dislike from'../../assets/dislike.png'
import share from'../../assets/share.png'
import save from'../../assets/save.png'
import jack from'../../assets/jack.png'
import { useEffect, useState } from 'react'
import { API_KEY, value_converter } from './../../Data';
import { useParams } from 'react-router-dom'
import moment from 'moment'

const PlayVideo = () => {

    const {videoId} =useParams()

    const [apiData,setApiData]=useState(null)
    const [channelData,setChannelData]=useState(null)
    const [commentDta,setCommentData]=useState([])

    const fetchVideoData=async()=>{
        const videoDetails_url=` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url).then(res=>res.json()).then(data =>setApiData(data.items[0]))
    }
    const fetchOtherData=async()=>{
        //fetch channel data
        const channelData_url=` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch(channelData_url).then(res=>res.json()).then(data =>setChannelData(data.items[0]))

        //fetch comment data
        const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
        await fetch(comment_url).then(res=>res.json()).then(data =>setCommentData(data.items))
        
    }

        useEffect(()=>{
            fetchVideoData()
        },[videoId])
        useEffect(()=>{
            fetchOtherData()
        },[apiData])
  return (
    <div className='play-video'>
        {/* <video src={videol} controls autoPlay muted></video> */}
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"title here"}</h3>
        <div className="play-video-info">
            <p>{value_converter(apiData?apiData.statistics.viewCount:"16k")} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():"2 days ago"}</p>
            <div>
                <span><img src={like} alt="" />{value_converter(apiData?apiData.statistics.likeCount:125)}</span>
                <span><img src={dislike} alt="" /></span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr/>
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:jack} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:"channel name"}</p>
                <span>{value_converter(channelData?channelData.statistics.subscriberCount:"1m")} subscribers</span>
            </div>
            <button>subscribers</button>
        </div>
        <div className="vid-des">
            <p>{apiData?apiData.snippet.description.slice(0,290):"description"}</p>
            <hr />
                <h4>{value_converter(apiData?apiData.statistics.commentCount:130)} comment</h4>
                {commentDta.map((item,index)=>{
                    return(
                        <div  className="comment" key={index}>
                                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                                <div>
                                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                    <div className="comment-action">
                                        <img src={like} alt="" />
                                        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                        <img src={dislike} alt="" />
                                    </div>
                                </div>
                        </div>
                    )
                })}
        </div>
    </div>
  )
}

export default PlayVideo