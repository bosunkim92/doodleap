import React from 'react';
import { Image, Grid, Segment } from 'semantic-ui-react';
import EditProfileBioForm from "../EditProfileBioForm/EditProfileBioForm"

export default function ProfileBio({user, handleEditProfile}) {
    return (
        <Grid textAlign='center' column={1}>
            <Grid.Row>
                <Grid.Column style={{ minWidth: 150 }}>
                    <Image src={`${user.photoUrl.photoUrl ? user.photoUrl.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"}`} avatar size='small' />
                    <Segment vertical>
                        <h3>{user.username}</h3>
                    </Segment>
                </Grid.Column>
                <Grid.Column textAlign='center' style={{ minWidth: 150 }}>
                    <Segment>
                        <h3>Bio: {`${user.bio ? user.bio : 'No Bio Yet'}`}</h3>
                    </Segment>
                    <Segment>
                        <EditProfileBioForm user={user} handleEditProfile={handleEditProfile}/>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}