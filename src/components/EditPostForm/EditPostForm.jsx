import React, {useState} from "react";
import {Form, Button, Card} from 'semantic-ui-react';

export default function EditPostForm({post, editPost}){
    const [state, setState] = useState({
        content: "",
    });

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        try {
            editPost(post._id, state);
        } catch(err) {

        }
    }

    return (
        <Card.Description>
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Input
                    className="form-control"
                    name="content"
                    value={state.content}
                    placeholder={post.content}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" className='btn'>
                    Edit Post
                </Button>
            </Form>
        </Card.Description>
    )
}