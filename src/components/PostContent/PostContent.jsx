import React from 'react';
import { Card } from 'semantic-ui-react';
import EditPostForm from "../EditPostForm/EditPostForm";

export default function PostContent({post, loading, showEditForm, editPost}){
    return (
        <>
        {showEditForm === true ? (

            <EditPostForm post={post} editPost={editPost}/>

        ) : (
            <Card.Content>
                <Card.Description>{post.content}</Card.Description>
            </Card.Content>
        )}
        </>
    )
}