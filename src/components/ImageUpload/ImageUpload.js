import React, { useState } from 'react';
import {Button} from '@material-ui/core'


function ImageUpload(){

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

    }

    return(
        <div>
            {/* we want */}
      {/* caption input */}
      {/* file picker */}
      {/* post button */}
            <input type='text' placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type='file' onChange={changeHandler} />
            <Button onClick={uploadHandler}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload