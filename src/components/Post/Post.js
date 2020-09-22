import React from 'react';
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({username, caption, imageUrl}) {
    return (
        <div className='post'>
            <div className='post-header'>
                <Avatar
                    className='post-avatar'
                    alt='AaronLeon'
                    src='https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/28795034_1823727337638416_3423159191987027968_o.jpg?_nc_cat=106&_nc_sid=19026a&_nc_ohc=Bb1kobhrRuIAX9L7O0o&_nc_ht=scontent-lga3-1.xx&oh=60a3b6c4926a27f8036018620ee2ac36&oe=5F8D2D4C'
                />
                <h3>{username}</h3>
            </div>
            
            {/* header -> avatar + usaername */}
            <img 
                className='post-image'
                src={imageUrl}
                alt='dog'
            /> 
            {/* image */}
            <h4 className='post-text'><strong>{username}</strong>{caption}</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post