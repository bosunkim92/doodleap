import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PostCard from "../../components/PostCard/PostCard";
import NavBar from "../../components/NavBar/NavBar";
import * as postsAPI from '../../utils/postsAPI';
import * as likesAPI from '../../utils/likesAPI';
import * as inspiringAPI from '../../utils/inspiringAPI';
import * as commentsAPI from '../../utils/commentsAPI';
import {Card, Grid} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import './Post.css';


export default function Post({ user, handleLogout }) {

  const [post, setPost] = useState([]);
  const postId = useParams().id;
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);


  const history = useHistory();

  async function getPost() {
    try {
          const data= await postsAPI.getOne(postId);

          setPost(data.post);
          setLoading(() => false);
        } catch (err) {

      }
  }
  

  async function addLike(postId) {
      try {
        const data = await likesAPI.create(postId);
        getPost();
      } catch (err) {

      }
    }
  
  async function removeLike(likeID) {
      try {
          const data = await likesAPI.removeLike(likeID);
          getPost();
      } catch (err) {

      }
  }

  async function addInspiring(postId) {
      try {
        const data = await inspiringAPI.create(postId);
        getPost();
      } catch (err) {

      }
    }
  
  async function removeInspiring(inspiringID) {
      try {
          const data = await inspiringAPI.removeInspiring(inspiringID);
          getPost();
      } catch (err) {

      }
  }

  async function editPost(postId, state) {
    try {
        setContentLoading(true);
        const data = await postsAPI.updatePost(postId, state);
        setContentLoading(false);
        setLoading(true);
        setLoading(false);
        getPost();
    } catch(err) {

    }
  }

  async function deletePost(postId) {
      try {
          const data = await postsAPI.deletePost(postId);
          history.push('/art_feed');
      } catch(err) {

      }
  }

  async function handleAddComment(postId, input) {
    setLoading(true);
    const data = await commentsAPI.create(postId, input);
    setLoading(()=>false);
  }

  async function editComment(commentId, input) {
    try {
        setLoading(true);
        const data = await commentsAPI.editComment(commentId, input);
        setLoading(false);
    } catch(err) {

    }
  }

  async function deleteComment(commentId) {
      try {
          setLoading(true);
          const data = await commentsAPI.deleteComment(commentId);
          setLoading(false);
      } catch(err) {

      }
  }

  useEffect(() => {
      getPost();
  }, [loading]);

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout}/>
      {loading ? (
        ""
      ):(
        <Grid centered>
          <div>
            <Grid.Column className="post_feed_card">
              <Card.Group itemsPerRow={1}>
                  <PostCard
                  post={post}
                  key={post._id}
                  addLike={addLike}
                  removeLike={removeLike}
                  addInspiring={addInspiring}
                  removeInspiring={removeInspiring}
                  user={user}
                  isPostView={true}
                  editPost={editPost}
                  deletePost={deletePost}
                  loading={loading}
                  contentLoading={contentLoading}
                  handleAddComment={handleAddComment}
                  editComment={editComment}
                  deleteComment={deleteComment}
                  />

              </Card.Group>

            </Grid.Column>

          </div>
        </Grid>
      )}
    </>
  )
}