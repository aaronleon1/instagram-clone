import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './components/Post/Post'
import {db, auth} from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './components/ImageUpload/ImageUpload'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);


  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) { 
        //user has logged in
        console.log(authUser)
        setUser(authUser) //uses cookie tracking to keep a persistent state

      }
      else{
        //user has logged out 
        setUser(null)
      }
    })
    return () => {
      //perform cleanup to avoid duplicates
      unsubscribe()
    }
  }, [user, username])

  useEffect(()=>{
    //access firebase posts collection
    db.collection('posts').onSnapshot(snapshot => {
      //Take a snapshot of the posts collection after the addition of every post
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])
  
  const signUp = (event) =>{
    event.preventDefault() //Prevent form default

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    }) //firebase user authentication from email and password state
    .catch((error) => alert(error.message))
    
    setOpen(false)
  }
  
  const signIn = (event) =>{
    event.preventDefault()

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }
  

  return (
    <div className="App">
      

      <ImageUpload />

       <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app-signup'>
            <center>
              <img 
                className='app-headerImage'
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='instragam logo'
              />
            </center>
            <Input
                placeholder='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type='submit' onClick={signUp}>Sign Up</Button>
            </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app-signup'>
            <center>
              <img 
                className='app-headerImage'
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='instragam logo'
              />
            </center>
              <Input
                placeholder='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type='submit' onClick={signIn}>Sign In</Button>
            </form>
        </div>
      </Modal>

      <div className='app-header'>
        <img 
          className='app-headerImage'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='instragam logo'
        />
      </div>

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className='login-container'>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      
      {
        posts.map(({id, post}) =>{
          return <Post key ={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          }
        )
      }

      {/* Header */}
      {/* Posts */}
    </div>
  );
}

export default App;
