import React, {useState} from 'react';
import {Grid, Form, Button} from 'semantic-ui-react';

export default function EditCommentForm({comment, editComment}){

    console.log(comment)
    console.log(comment._id);

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
        editComment(comment._id, state);
    }

    return(
            <Grid.Row>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Form.Input
                            className="form-control"
                            name="commentContent"
                            value={state.commentContent}
                            placeholder={comment.commentContent}
                            onChange={handleChange}
                        />
                        <Button type="submit" className="btn">
                            Edit Comment
                        </Button>
                    </Form>
            </Grid.Row>
    )
}