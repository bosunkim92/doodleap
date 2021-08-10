import React, {useState} from 'react';
import {Grid, Form, Button} from 'semantic-ui-react';

export default function AddCommentForm({post, handleAddComment}){

    console.log(post)
    console.log(post._id);

    const [state, setState] = useState({
        commentContent: "",
    });

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        handleAddComment(post._id, state);
    }

    return(
            <Grid.Row>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Form.TextArea
                            className="form-control"
                            name="commentContent"
                            value={state.commentContent}
                            placeholder="Type your comment here"
                            onChange={handleChange}
                        />
                        <Button type="submit" className="btn">
                            Add Comment
                        </Button>
                    </Form>
            </Grid.Row>
    )
}