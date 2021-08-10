import React, {useState, useEffect} from 'react';
import {Grid, Loader, Segment, Dimmer, Image} from 'semantic-ui-react';
import userService from "../../utils/userService";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import NavBar from "../../components/NavBar/NavBar";
import {useParams} from "react-router-dom";
import * as likesAPI from "../../utils/likesAPI";
import * as inspiringAPI from "../../utils/inspiringAPI";


    // profile page will have user's posts and bio info;
    // if the user is the profile owner, then the page will show buttons for edit profile and post, as well as delete posts.

export default function ProfilePage({ user, handleLogout, handleProfileUpdate }) {
    const [posts, setPosts] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const {username} = useParams();
 
    async function getProfile() {
        try{
            const data = await userService.getProfile(username);
            console.log(data, " data");

            setPosts(() => [...data.posts]);
            setProfileUser(() => data.user);
            setLoading(() => false);
        } catch (err) {
            console.log(err);
            setError("No profile");
        }
    }

    async function addLike(postId) {
        console.log(postId);
        try {
          const data = await likesAPI.create(postId);
          console.log(data, " this is from addLike");
          getProfile();
        } catch (err) {
          console.log(err);
        }
      }
    
    async function removeLike(likeID) {
        try {
            const data = await likesAPI.removeLike(likeID);
            getProfile();
        } catch (err) {
            console.log(err);
        }
    }


    async function addInspiring(postId) {
        console.log(postId);
        try {
          const data = await inspiringAPI.create(postId);
          console.log(data, " this is from addInspiring");
          getProfile();
        } catch (err) {
          console.log(err);
        }
      }
    
    async function removeInspiring(inspiringID) {
        try {
            const data = await inspiringAPI.removeInspiring(inspiringID);
            getProfile();
        } catch (err) {
            console.log(err);
        }
    }

    async function editProfile(user, data){
        try{
            setLoading(true);
            await userService.updateProfile(user, data);
            setLoading(false);
            handleProfileUpdate();
        } catch(err) {
            console.log(err);
        }
    }


    useEffect(()=> {
        getProfile();
    }, []);

    if (error) {
        return (
            <h1>{error}</h1>
        )
    }

    if (loading) {
        return (
          <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Loader size="large" active>
                Loading
              </Loader>
            </Grid.Column>
          </Grid>
        );
      }

    return (
        <>
        <NavBar user={user} handleLogout={handleLogout}/>
        { loading ? ("") :(
            <Grid key={profileUser._id}> 
                    <Grid.Row>
                        <Grid.Column>

                            <ProfileBio profileUser={profileUser} key={profileUser._id} user={user} editProfile={editProfile} loading={loading}/>

                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 300 }}>
                            <PostFeed
                                isProfile={true}
                                posts={posts}
                                numPhotosCol={3}
                                addLike={addLike}
                                removeLike={removeLike}
                                addInspiring={addInspiring}
                                removeInspiring={removeInspiring}
                                user={user}
                            />
                        </Grid.Column>
                    </Grid.Row> 
            </Grid>
        )}
        </>
    )
}