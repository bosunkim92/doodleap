import React from 'react';
import { Image, Grid, Segment } from 'semantic-ui-react';

export default function ProfileBio({user}) {

    // profile page will have user's posts and bio info;
    // if the user is the profile owner, then the page will show buttons for edit profile and post, as well as delete posts.
     
    return (
        <Grid textAlign='center' column={2}>
            <Grid.Row>
                <Grid.Column>
                    <Image src={`${user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"}`} avatar size='small' />
                </Grid.Column>
                <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
                    <Segment vertical>
                        <h3>{user.username}</h3>
                    </Segment>
                    <Segment>
                        <span>Bio: {`${user.bio ? user.bio : 'No Bio Yet'}`}</span>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default ProfileBio;