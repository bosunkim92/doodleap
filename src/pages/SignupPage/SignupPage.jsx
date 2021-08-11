import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import userService from '../../utils/userService';
import { useHistory } from 'react-router-dom';
import {Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

export default function SignUpPage(props){

    const [error, setError] = useState('')
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: ''
    })

    const history = useHistory()

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await userService.signup(state);
            props.handleSignUpOrLogin()
            history.push('/')
        } catch(err) {
            setError(err.message)
        }
    }
 
    return (

        <Grid textAlign='center' style={{height:'100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 300 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Sign Up
                </Header>
                <Form autoComplete='off' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="username"
                            placeholder='User Name'
                            value={state.username}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            name="email"
                            type="email"
                            placeholder='email'
                            value={state.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            name='password'
                            type='password'
                            placeholder='password'
                            value={state.password}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            name='passwordConf'
                            type='password'
                            placeholder='Confirm Password'
                            value={state.passwordConf}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            type='submit'
                            className='btn'
                        >Sign Up</Button>
                    </Segment>
                    {error ? <ErrorMessage error={error}/> : null}
                </Form>
            </Grid.Column>
        </Grid>        

      );   
    
}
