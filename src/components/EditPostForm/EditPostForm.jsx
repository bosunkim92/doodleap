import React, {useState} from "react";
import {Grid, Form, Button, Segment, Card} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';

export default function EditPostForm({post, editPost}){
    const [state, setState] = useState({
        content: "",
    });

    const history = useHistory();

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(e.target);
        console.log(state);
        try {
            editPost(post._id, state);
        } catch(err) {
            console.log(err)
        }
    }



        // const formData = new FormData();
        // formData.append("photo", selectedFile);
        // formData.append("content", state.content);
        // props.handleAddPost(formData);
        // try{
        //     await userService.signup(state);
        //     props.handleSignUpOrLogin()
        //     history.push('/')
        // } catch(err) {
        //     console.log('handleSubmit error has occured');
        //     console.log(err.message)
        //     setError(err.message)
        // }



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