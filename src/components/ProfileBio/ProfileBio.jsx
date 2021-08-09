import React, {useState, useEffect} from 'react';
import { Image, Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import EditProfileBioForm from "../EditProfileBioForm/EditProfileBioForm"

export default function ProfileBio({user}) {
    console.log(user)
    console.log(' this is user from the profilebio.js')



    return (
            <Grid textAlign='center' column={1}>
            <Grid.Row>
                <Grid.Column style={{ minWidth: 150 }}>
                    <Image src={`${user.photoUrl[0].photoUrl}`} avatar size='small' />
                    <Segment vertical>
                        <h3>{user.username}</h3>
                    </Segment>
                </Grid.Column>
                <Grid.Column textAlign='center' style={{ minWidth: 150 }}>
                    <Segment>
                        <h3>Bio: {`${user.bio ? user.bio : 'No Bio Yet'}`}</h3>
                    </Segment>
                    <Segment>
                        <EditProfileBioForm user={user}/>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}