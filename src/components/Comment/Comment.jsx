import React from 'react';
import {Grid, Segment, Dimmer, Image, Loader} from 'semantic-ui-react';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import CommentLine from '../CommentLine/CommentLine';


export default function Comment({ post, loading, handleAddComment, editComment, deleteComment}) {



    return (
        <Grid textAlign="center" key={post._id}>
            {loading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='small'>Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png"/>
                </Segment>
            ) : null }

            {post.comments.map((comment)=>{
                return(
                    <CommentLine comment={comment} key={comment._id} post={post} loading={loading} editComment={editComment} deleteComment={deleteComment}/>
                    );
            })}

            <AddCommentForm post={post} handleAddComment={handleAddComment}/>
        </Grid>



    )
}