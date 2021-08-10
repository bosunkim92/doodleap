import React from "react";
import {Grid, Segment, Dimmer, Image, Loader} from "semantic-ui-react";

export default function UserProfileBio({profileUser, loading}) {
    return (
        <Grid key={profileUser._id} textAlign="center">
        {loading ? (
            <Segment>
                <Dimmer active inverted>
                    <Loader size='small'>Loading</Loader>
                </Dimmer>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png"/>
            </Segment>
        ) : (
            <h3>Bio: {`${profileUser.bio ? profileUser.bio : 'No Bio Yet'}`}</h3>
        )}
        </Grid>
    )
}