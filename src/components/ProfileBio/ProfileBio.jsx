import React from 'react';
import { Image, Grid, Segment } from 'semantic-ui-react';
import EditProfileBioForm from "../EditProfileBioForm/EditProfileBioForm";
import UserProfileBio from "../UserProfileBio/UserProfileBio";

export default function ProfileBio({profileUser, user, editProfile, loading}) {
    return (

        <Grid textAlign='center' key={profileUser._id} column={1}>
            <Grid.Row>
                <Grid.Column style={{ minWidth: 150 }}>
                    <Image src={`${profileUser.photoUrl[0].photoUrl}`} avatar size='small' />
                    <Segment vertical>
                        <h3>{profileUser.username}</h3>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign='center' style={{ minWidth: 150 }}>
                    <Segment>
                        <UserProfileBio profileUser={profileUser} key={profileUser._id} loading={loading} />
                    </Segment>
                        {
                            user.username === profileUser.username ? (
                                <EditProfileBioForm user={user} editProfile={editProfile} />
                            ) : null
                        }
                </Grid.Column>

            </Grid.Row>
        </Grid>

    )
}