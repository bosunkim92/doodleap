import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PostCard from "../../components/PostCard/PostCard";
import * as postsAPI from '../../utils/postsAPI';
import * as likesAPI from '../../utils/likesAPI';
import * as inspiringAPI from '../../utils/inspiringAPI';
import {Grid} from "semantic-ui-react";
import {useHistory} from "react-router-dom";


export default function Post({ user }) {

    const [post, setPost] = useState([]);
    const postId = useParams().id;
    const [loading, setLoading] = useState(true);


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
          const data = await postsAPI.updatePost(postId, state);
          console.log(data, " this is from editing Post");
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

    useEffect(() => {
        getPost();
    }, [loading]);

    return (
      <>
      {loading ? (""):(
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
          />

        </Grid>
      )}
      </>
    )
}