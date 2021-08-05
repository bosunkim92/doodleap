import React, { useState } from "react";

import { Button, Form, Grid, Segment } from "semantic-ui-react";

export default function AddPostForm(props) {
    const [selectedFile, setSelectedFile] = useState("");
    const [state, setState] = useState({
        content: "",
    });

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", selectedFile);
        formData.append("content", state.content);
        props.handleAddPost(formData);
    }

    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 300 }}>
                <Segment>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Form.Input
                            className="form-control"
                            name="content"
                            value={state.content}
                            placeholder="Details"
                            onChange={handleChange}
                            required
                            />
                        <Form.Input
                            className="form-control"
                            type="file"
                            name="photo"
                            placeholder="upload image"
                            onChange={handleFileInput}
                            />
                        <Button type="submit" className="btn">
                            Add Post
                        </Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}