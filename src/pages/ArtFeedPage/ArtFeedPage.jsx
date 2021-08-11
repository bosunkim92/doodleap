import React, {useEffect, useState} from 'react'
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostFeed from "../../components/PostFeed/PostFeed"
import NavBar from "../../components/NavBar/NavBar"
import { Grid } from 'semantic-ui-react';
import * as postsAPI from '../../utils/postsAPI';
import * as likesAPI from '../../utils/likesAPI';
import * as inspiringAPI from '../../utils/inspiringAPI';
import "./ArtFeedPage.css"

export default function ArtFeedPage({user, handleLogout}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleAddPost(post) {
        setLoading(true)
        const data = await postsAPI.create(post);
        setPosts((posts) => [data.post, ...posts]);
        setLoading(false);
    }

    async function getPosts() {
        try {
            const data= await postsAPI.getAll();
            setPosts([...data.posts]); 
        } catch (err) {

        }
    }

    async function addLike(postId) {
        try {
          const data = await likesAPI.create(postId);
          getPosts();
        } catch (err) {

        }
      }
    
    async function removeLike(likeID) {
        try {
            const data = await likesAPI.removeLike(likeID);
            getPosts();
        } catch (err) {

        }
    }

    async function addInspiring(postId) {
        try {
          const data = await inspiringAPI.create(postId);
          getPosts();
        } catch (err) {

        }
      }
    
    async function removeInspiring(inspiringID) {
        try {
            const data = await inspiringAPI.removeInspiring(inspiringID);
            getPosts();
        } catch (err) {

        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
    <>
        <NavBar user={user} handleLogout={handleLogout} />
        <Grid centered>
            <Grid.Row>
                <Grid.Column className="art_feed_cards">
                    <AddPostForm handleAddPost={handleAddPost}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column className="art_feed_cards">
                    <PostFeed
                        posts={posts}
                        numPhotosCol={1}
                        loading={loading}
                        isProfile={false}
                        addLike={addLike}
                        removeLike={removeLike}
                        addInspiring={addInspiring}
                        removeInspiring={removeInspiring}
                        isPostView={false}
                        user={user}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </>
    )
}