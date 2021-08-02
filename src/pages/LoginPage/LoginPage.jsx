import React, { useState } from 'react';
import './LoginPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from '../../utils/userService';
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import { useHistory } from 'react-router';

export default function LoginPage(props){
    const [error, setError] = useState("");
    const [state, setState] = useState({
        email:"",
        password: "",
    });

    const history = useHistory();

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await userService.login(state);
            props.handleSignUpOrLogin();
            history.push('/');
        } catch(err) {
            setError(err.message);
        }
    }

    return (
      <> 
        <Grid textAlign='center' style={{height:'100vh'}} verticalAlign="middle">
            <Grid.Column style={{maxWidth: 300}}>
                <Header as='h2' color="#a30f4d" textAlign='center'>
                    Log-In to Your Account
                </Header>
                <Form autoComplete='off' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            type='email'
                            name='email'
                            placeholder='email'
                            value={state.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            type='password'
                            name='password'
                            placeholder='password'
                            value={state.password}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            color='#a30f4d'
                            fluid
                            size='large'
                            type='submit'
                            className='btn'
                        >LogIn</Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to='/signup'>Sign Up</Link>
                </Message>
                {error ? <ErrorMessage error={error} /> : null}
            </Grid.Column>
        </Grid>
      </>
      );
}

