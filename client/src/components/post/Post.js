import React from 'react'
import Avatar from "../avatar/Avatar"
import './Post.scss'
import backgroundImage from '../../assets/picture.jpg'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { likeAndUnlikePost } from '../../redux/slices/postsSlice'
import CreatePost from '../createPost/CreatePost'
import { useNavigate} from "react-router-dom"
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'

function Post({post}) {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function handlePostLiked() {
        dispatch(showToast({
            type: TOAST_SUCCESS,
            message: "like or Unlike"
        }))
        dispatch(likeAndUnlikePost({
            postId: post._id
        }))
    }
  return (
    <div className="Post">
        <div className="heading" onClick={()=> navigate(`/profile/${post.owner._id}`)}>
            
            <Avatar src={post?.owner?.avatar?.url}/>
            <h4>{post?.owner?.name}</h4>
        </div>
        <div className="content">
            <img src={post?.image?.url} alt="bg" />
        </div>
        <div className="footer">
            <div className="like" onClick={handlePostLiked}>
                {post?.isLiked ? <AiFillHeart style={{color : 'red'}} className= "icon"/> : <AiOutlineHeart className="icon"/>}
                
                <h4>{`${post?.likesCount}`}</h4>
            </div>
            <p className="caption">{post?.caption}</p>
            <h6 className="time-ago">{post?.timeAgo}</h6>

        </div>
    </div>
  )
}

export default Post