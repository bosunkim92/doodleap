import React, {useState} from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import {Button, Form, Grid, Segment} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom';

export default function EditProfileBioForm({user, handleEditProfile}){

    const [error, setError] = useState('')
    const [selectedFile, setSelectedFile] = useState("")
    const [state, setState] = useState({
        bio: "",
    });

    const history = useHistory()

    function handleFileInput(e){
        setSelectedFile(e.target.files[0]);
    }
    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    function handleSubmit(e){
        e.preventDefault();

        try{
            const formData = new FormData();
            formData.append("photo", selectedFile);
            formData.append("bio", state.bio);
            handleEditProfile(formData);
            history.push('/')
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }
        
    }

    return (
        <Grid textAlign="center" style={{ height:'100vh' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 300 }}>
                <Segment stacked>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Form.TextArea
                            className="form-control"
                            name="bio"
                            value={state.bio}
                            placeholder="Tell us about you!"
                            onChange={handleChange}
                        />
                        <Form.Field>
                            <Form.Input
                                className="form-control"
                                type="file"
                                name="photo"
                                placeholder="upload your profile picture"
                                onChange={handleFileInput}
                            />
                        </Form.Field>
                        <Button type="submit" className='btn'>
                            Update Profile
                        </Button>
                        {error ? <ErrorMessage error={error} /> : null}
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )

}