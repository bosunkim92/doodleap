import React, {useState} from 'react';
import { Card, Icon, Image, Button } from "semantic-ui-react";
import {Link} from 'react-router-dom';
import * as postsAPI from "../../utils/postsAPI";
import EditPostForm from "../EditPostForm/EditPostForm";

export default function PostCard({
    post,
    isProfile,
    addLike,
    removeLike,
    addInspiring,
    removeInspiring,
    isPostView,
    user,
    editPost,
    deletePost,
}) {

    const [showEditForm, setShowEditForm] = useState(false);
    const liked = post.likes.findIndex(like => like.username === user.username)

    const clickHandlerLike = liked > -1 ? () => removeLike(post.likes[liked]._id) : () => addLike(post._id)
    const likeColor = liked > -1 ? 'red' : 'grey'


    const inspired = post.inspiring.findIndex(inspiring => inspiring.username === user.username)

    const clickHandlerInspiring = inspired > -1 ? () => removeInspiring(post.inspiring[inspired]._id) : () => addInspiring(post._id)
    const inspiringColor = inspired > -1 ? 'red' : 'grey'

    function handleEditClick() {
        console.log('this will be edit function')
        showEditForm === false ? setShowEditForm(() => true) : setShowEditForm(() => false);
    }
    
    function handleDeleteClick() {
        deletePost(post._id);
    }

    return (


        <Card key={post._id}>
            {isProfile ? (
                ""
            ) : (
                <>
                    <Card.Content textAlign="left">
                        <Image
                            floated='left'
                            size='large'
                            avatar
                            src={post.user.photoUrl[0].photoUrl}
                            />
                        <Card.Header floated="right">{post.user.username}</Card.Header>
                    
                    
                    
                            {isPostView ? (
                                <>
                                {user.username === post.user.username ? (
                                    <Card.Content textAlign="right">
                                        <Icon floated="right" name={'edit outline'} color="black" onClick={handleEditClick}/>
                                        <span>&nbsp;</span>
                                        <Icon floated="right" name={'delete'} color="black" onClick={handleDeleteClick}/>
                                    </Card.Content>
                                ) : ("")
                                }
                                </>
                            ) : ("")
                            }
                    
                    
                    
                    </Card.Content>



                </>
            )}
            {isPostView ? (
                <>
                <Image src={`${post.photoUrl}`} wrapped ui={false}/>

                {showEditForm === false ? (

                    <Card.Content>
                        <Card.Description>{post.content}</Card.Description>
                    </Card.Content>

                ) : (
                    <EditPostForm post={post} editPost={editPost}/>
                )}




                </>
            ) : (
            <Link to={`/posts/${post._id}`}>

                <Image src={`${post.photoUrl}`} wrapped ui={true}/>
                <Card.Content>
                    <Card.Description>{post.content}</Card.Description>
                </Card.Content>

            </Link>
            )}

            <Card.Content extra textAlign={"right"}>
                <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandlerLike} />
                {post.likes.length} Likes
                <Icon name={"idea"} size="large" color={inspiringColor} onClick={clickHandlerInspiring} />
                {post.inspiring.length} Inspiring
            </Card.Content>
            {isPostView ? (

            <Card.Content>
                <h3>Comment </h3>
            </Card.Content>


            ) : ("")}
        </Card>

    )
}