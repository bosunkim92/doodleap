import React from "react";
import { Segment, Header, Image, Icon, Grid } from "semantic-ui-react";
import {Link} from "react-router-dom";
import './NavBar.css'

export default function NavBar({user, handleLogout}){
    return (

        <Segment clearing>
            <Header>
            <Grid>
                <Link to="/"><h1 className="Logo">DOODLEAP</h1></Link>
            </Grid>

            </Header>
            <Header as="h2" floated="left">
                <Link to={`/username/${user.username}`}><Image src={user.photoUrl[0].photoUrl} avatar /></Link>
                <Link to="/art_feed"><Icon name="paint brush" /></Link>
            </Header>
            <Header as="h2" floated="right">
                <Link to="" onClick={handleLogout}><Icon name="log out" /></Link>
            </Header>
        </Segment>

    )
}