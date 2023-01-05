import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from '../context/App/appContext';
import axios from 'axios';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  post: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1rem',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  postInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1rem',
  },
  postedBy: {
    fontSize: '0.8rem',
    color: '#777',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },

  replies: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    padding: '0rem 5rem',
  },

  reply: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1rem',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '0.5rem',
  },

  replyBtn: {
    width: '15%',
    display: 'flex',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e5e5e5',
    },
  },
}));

function Post({ post }) {
  const classes = useStyles();
  console.log(post);
  const [addReply, setAddReply] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);
  const [replies, setReplies] = useState(post.replies);
  const { user, token } = useAppContext();
  const [loading, setLoading] = useState(() => false);

  const addReplayHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAddReply(false);
    const reply = e.target[0].value;
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/post/${post._id}`,
        { reply, username: user.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setReplies([
        ...replies,
        { user: { id: user._id, name: user.username }, reply },
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <main className={classes.main}>
        {loading && <Loading />}
        <div className={classes.post}>
          <Avatar>{post.user.name.charAt(0).toUpperCase()}</Avatar>
          <div className={classes.postInfo}>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                cursor: 'pointer',
              }}
              onClick={() => setOpenReplies(!openReplies)}
            >
              {post.title}
            </h3>
            <div className={classes.postedBy}>
              {`By: ${post.user.name} on: ${post.date.substring(0, 10)}`}
            </div>
            <p>{post.text}</p>
          </div>
        </div>
        {!loading && (
          <div className={classes.replies}>
            {openReplies && (
              <>
                {replies.length > 0 &&
                  replies.map((reply) => (
                    <div className={classes.reply} key={reply?._id}>
                      <Avatar>
                        {reply?.user?.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <div className={classes.postInfo}>
                        <h3>{reply?.user.name}</h3>
                        <p>{reply?.reply}</p>
                      </div>
                    </div>
                  ))}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  {!addReply && (
                    <button
                      className={classes.replyBtn}
                      onClick={() => setAddReply(!addReply)}
                    >
                      Add Reply
                    </button>
                  )}
                </div>
                {addReply && (
                  <form
                    onSubmit={addReplayHandler}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '100%',
                    }}
                  >
                    <textarea
                      name='reply'
                      id='reply'
                      cols='40'
                      rows='5'
                      placeholder='Add your reply'
                      required
                    ></textarea>

                    <button type='submit' className={classes.replyBtn}>
                      Reply
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default Post;
