import React, {useState} from "react";
import {Grid, Icon} from 'semantic-ui-react';
import EditCommentForm from '../EditCommentForm/EditCommentForm';


export default function CommentLine({comment, post, user, loading, editComment, deleteComment}){
    const [showEditCommentForm, setShowEditCommentForm] = useState(false);
    
    function handleDeleteClick(){
        deleteComment(comment._id);
    }
    
    function handleEditClick(){
        showEditCommentForm === false ? setShowEditCommentForm(() => true) : setShowEditCommentForm(() => false);
    }

    return (
        <Grid.Row key={comment._id}>
            <Grid.Column width={3}>
                {comment.username}
            </Grid.Column>
                {
                    showEditCommentForm === true ? (
                        <EditCommentForm comment={comment} editComment={editComment} />
                    ) : (

                        <Grid.Column width={10}>
                            {comment.commentContent}
                        </Grid.Column>
                    )
                }

            {
                user.username === comment.username ? (
                    <Grid.Column width={3}>
                        <Icon floated="right" size="small" name={'edit outline'} color="black" onClick={handleEditClick} />


                        <span>&nbsp;</span>
                        <Icon floated="right" size="small" name={'delete'} color="black" onClick={handleDeleteClick}/>

                    </Grid.Column>
                ) : null
            }


        </Grid.Row>
    )
}