import React from 'react';
import { Card } from 'semantic-ui-react';
import EditPostForm from "../EditPostForm/EditPostForm";
import './PostContent.css';

export default function PostContent({post, showEditForm, editPost}){
    return (
        <>
        {showEditForm === true ? (

            <EditPostForm post={post} editPost={editPost}/>

        ) : (
            <Card.Content className="postContent">
                <Card.Description>{post.content}</Card.Description>
            </Card.Content>
        )}
        </>
    )
}