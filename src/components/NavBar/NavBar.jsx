import React from "react";
import { Segment, Header, Image, Icon } from "semantic-ui-react";
import {Link} from "react-router-dom";

export default function NavBar({user, handleLogout}){
    return (
        <Segment clearing>
            <Header as="h2" floated="right">
                <Link to="" onClick={handleLogout}><Icon name="log out" /></Link>
            </Header>
            <Header as="h2" floated="left">
                <Link to={`/username/${user.username}`}><Image src={user.photoUrl[0].photoUrl} avatar /></Link>
                <Link to="/"><Icon name="home" /></Link>
                <Link to="/art_feed"><Icon name="paint brush" /></Link>
            </Header>
        </Segment>
    )
}