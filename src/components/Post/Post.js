import React, { useEffect, useState } from 'react';
import './Post.css'
import {db} from '../../firebase'
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar'
import ClearIcon from '@material-ui/icons/Clear';

function Post({username, user, caption, imageUrl, postId}) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => { //listen to a specific post to avoid full refresh
                setComments(snapshot.docs.map((doc) => doc.data()))
        })
    } 
        return () => {
            unsubscribe()
        }
    },[postId])

    const postComment = (event) => {
        event.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }

    const deletePost = () => {
        db.collection("posts").doc(`${postId}`).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <div className='post'>
            <div className='post-header'>
                <Avatar
                    className='post-avatar'
                    alt={username}
                    src=''
                />
                <h3>{username}</h3>
                {
                user && postId && user.displayName == username ? (<button className='post-delete' onClick={deletePost}><ClearIcon /></button>) : ('')
            }
            </div>
            

            <img 
                className='post-image'
                src={imageUrl}
                alt='dog'
            /> 
           
            <h4 className='post-text'><strong>{username}</strong> {caption}</h4>
            
            
            <div className='post-comments'>
                {comments.map((comment) => {
                   return(
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                   ) 
                })}
            </div>

            {user && (
                <form className='post-comment-box'>
                <input
                    className='post-input'
                    type='text'
                    placeholder='Post a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} 
                />
                <button 
                    className='post-submit'
                    disabled={!comment}
                    type='submit'
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
            )}
            
        </div>
    )
}

export default Post