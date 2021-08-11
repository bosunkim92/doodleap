import React, {useState} from 'react';
import { Card, Icon, Image, Grid, Segment, Dimmer, Loader } from "semantic-ui-react";
import {Link} from 'react-router-dom';
import Comment from '../Comment/Comment';
import PostContent from "../PostContent/PostContent"
import "./PostCard.css";


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
    loading,
    contentLoading,
    handleAddComment,
    editComment,
    deleteComment,
}) {
    const [showEditForm, setShowEditForm] = useState(false);
    const liked = post.likes.findIndex(like => like.username === user.username)

    const clickHandlerLike = liked > -1 ? () => removeLike(post.likes[liked]._id) : () => addLike(post._id)
    const likeColor = liked > -1 ? 'red' : 'grey'


    const inspired = post.inspiring.findIndex(inspiring => inspiring.username === user.username)

    const clickHandlerInspiring = inspired > -1 ? () => removeInspiring(post.inspiring[inspired]._id) : () => addInspiring(post._id)
    const inspiringColor = inspired > -1 ? 'red' : 'grey'

    function handleEditClick() {
        showEditForm === false ? setShowEditForm(() => true) : setShowEditForm(() => false);
    }
    
    function handleDeleteClick() {
        deletePost(post._id);
    }



    return (
        <>

        <Card key={post._id} className="post_feed_card">

            {isProfile ? (
                ""
            ) : (
                <>
                    <Card.Content textAlign="left">
                        
                    <Link to={`/username/${post.user.username}`}>
                        <Image
                            floated='left'
                            size='large'
                            avatar
                            src={post.user.photoUrl[0].photoUrl}
                            />
                        <Card.Header className="username" floated="right">{post.user.username}</Card.Header>
                    </Link>
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
                    <Image className="postImgNContent" src={`${post.photoUrl}`} wrapped ui={false}/>
                    {
                        contentLoading ? (
                        <Segment>
                            <Dimmer active inverted>
                                <Loader size='small'>Loading</Loader>
                            </Dimmer>
                            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png"/>
                        </Segment>
                        ):(
                            <PostContent post={post} showEditForm={showEditForm} editPost={editPost}/>
                        )
                    }
                </>
            ) : (
                <Link to={`/posts/${post._id}`}>
                <div className="postImgNContent">
                    <div>
                        <Image  src={`${post.photoUrl}`} wrapped ui={true}/>
                        <PostContent post={post}/>

                    </div>
                </div>
                </Link>
            )}


            <Card.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={3} textAlign={'left'}>
                                <Link to={`/posts/${post._id}`}><Icon name={"comments outline"} size="large" color='grey'/></Link>
                            </Grid.Column>
                            <Grid.Column width={13} textAlign={'right'}>
                                <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandlerLike} />
                                {post.likes.length} Likes
                                <Icon name={"idea"} size="large" color={inspiringColor} onClick={clickHandlerInspiring} />
                                {post.inspiring.length} Inspiring
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            </Card.Content>


            {isPostView ? (

                    <Comment post={post} user={user} loading={loading} handleAddComment={handleAddComment} editComment={editComment} deleteComment={deleteComment}/>

            ) : ("")}

        </Card>
        </>
    )
}