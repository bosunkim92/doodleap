import React, {useEffect, useState} from 'react'
import { Grid } from 'semantic-ui-react';
import PostFeed from "../../components/PostFeed/PostFeed"
import * as postsAPI from '../../utils/postsAPI'
import AddPostForm from "../../components/AddPostForm/AddPostForm";

export default function ArtFeedPage({user}) {
    //ArtFeed page will have sections of the art for sketch, paint, pixel art, drawings
    //May implement anchor url location.href
    //hovering button that contains anchor tag might work
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleAddPost(post) {
        setLoading(true)
        const data = await postsAPI.create(post);
        console.log(data.post, " This is new post", data, " data var");
        setPosts((posts) => [data.post, ...posts]);
        setLoading(false);
    }

    async function getPosts() {
        try {
            const data= await postsAPI.getAll();
            setPosts([...data.posts]); 
        } catch (err) {
            console.log(err, " an error has occoured while getting posts");
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <h2>PageHeader will be here</h2>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 300 }}>
                    <AddPostForm handleAddPost={handleAddPost}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 300 }}>
                    <PostFeed
                        posts={posts}
                        numPhotosCol={1}
                        loading={loading}
                        isProfile={false}
                        user={user}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}