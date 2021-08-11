import React from 'react';
import {Card, Loader, Grid, Dimmer, Segment, Image} from 'semantic-ui-react';
import PostCard from "../PostCard/PostCard";

export default function PostFeed({
    posts,
    numPhotosCol,
    isProfile,
    loading,
    addLike,
    removeLike,
    addInspiring,
    removeInspiring,
    isPostView,
    user
}) {
    return (

        <Card.Group itemsPerRow={numPhotosCol} stackable>
            {loading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='small'>Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png"/>
                </Segment>
            ) : null}
            {posts.map((post)=>{
                return(
                    <PostCard 
                        post={post}
                        key={post._id}
                        isProfile={isProfile}
                        addLike={addLike}
                        removeLike={removeLike}
                        addInspiring={addInspiring}
                        removeInspiring={removeInspiring}
                        user={user}
                        isPostView={isPostView}
                    />
                );
            })}
        </Card.Group>

    );
}