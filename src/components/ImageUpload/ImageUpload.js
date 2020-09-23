import React, { useState } from 'react';
import {Button} from '@material-ui/core'
import {storage, db} from '../../firebase'
import firebase from 'firebase'
import './ImageUpload.css'

function ImageUpload({username}){

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)

    const changeHandler = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]) //protects against multi image uploads
        }
    }

    const uploadHandler = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //progress - keep giving snapshots as progress continues
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                console.log(error) //too long for alert
            },
            () => {
                //complete function
                storage.ref('images').child(image.name).getDownloadURL()
                .then(url => {
                    db.collection('posts').add({
                        //sort by recent posts
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    })
                    setProgress(0)
                    setCaption('')
                    setImage(null)
                })
            }
        )
    }

    return(
        <div className='image-upload'>
            <progress className='image-upload-progress' value={progress} max='100' />
            <input type='text' placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type='file' onChange={changeHandler} />
            <Button onClick={uploadHandler}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload