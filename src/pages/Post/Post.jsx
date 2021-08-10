import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PostCard from "../../components/PostCard/PostCard";
import NavBar from "../../components/NavBar/NavBar";
import * as postsAPI from '../../utils/postsAPI';
import * as likesAPI from '../../utils/likesAPI';
import * as inspiringAPI from '../../utils/inspiringAPI';
import * as commentsAPI from '../../utils/commentsAPI';
import {Grid, Segment, Dimmer, Image, Loader} from "semantic-ui-react";
import {useHistory} from "react-router-dom";


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
            console.log(err, " an error has occoured while getting posts");
        }
    }
    

    async function addLike(postId) {
        console.log(postId);
        try {
          const data = await likesAPI.create(postId);
          console.log(data, " this is from addLike");
          getPost();
        } catch (err) {
          console.log(err);
        }
      }
    
    async function removeLike(likeID) {
        try {
            const data = await likesAPI.removeLike(likeID);
            getPost();
        } catch (err) {
            console.log(err);
        }
    }

    async function addInspiring(postId) {
        console.log(postId);
        try {
          const data = await inspiringAPI.create(postId);
          console.log(data, " this is from addInspiring");
          getPost();
        } catch (err) {
          console.log(err);
        }
      }
    
    async function removeInspiring(inspiringID) {
        try {
            const data = await inspiringAPI.removeInspiring(inspiringID);
            getPost();
        } catch (err) {
            console.log(err);
        }
    }


    async function editPost(postId, state) {
      console.log(postId);
      console.log(state.content);
      try {
          setContentLoading(true);
          const data = await postsAPI.updatePost(postId, state);
          setContentLoading(false);
          setLoading(true);
          setLoading(false);
          getPost();
      } catch(err) {
          console.log(err)
      }
    }

    async function deletePost(postId) {
        try {
            const data = await postsAPI.deletePost(postId);
            console.log(data, " this is from deleting post");
            history.push('/art_feed');
        } catch(err) {
            console.log(err)
        }
    }

    async function handleAddComment(postId, input) {
      console.log(postId);
      setLoading(true);
      const data = await commentsAPI.create(postId, input);
      console.log(data)
      setLoading(()=>false);
  }



  async function editComment(commentId, input) {
    console.log(commentId);
    console.log(input);
    try {
        setLoading(true);
        const data = await commentsAPI.editComment(commentId, input);
        setLoading(false);
        console.log(data, " this is from editing Comment");
    } catch(err) {
        console.log(err)
    }
  }

  async function deleteComment(commentId) {
      try {
          setLoading(true);
          const data = await commentsAPI.deleteComment(commentId);
          setLoading(false);
          console.log(data, " this is from deleting post");
      } catch(err) {
          console.log(err)
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
        <Grid textAlign="center" style={{ marginTop: 15, height: '90vh'}}>
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

        </Grid>
      )}
      </>
    )
}