import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { ALL_POSTS } from "../utils/queries";

const GET_USER_DATA = gql`
  query GetUser {
    user {
      id
      firstName
      lastName
      posts {
        id
        title
        content
      }
    }
  }
`;

function Profile() {
    const { loading, error, data } = useQuery(ALL_POSTS);
    const [profile, setProfile] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!loading && data) {
            setProfile(data.user);
            setPosts(data.user.posts);
        }
    }, [loading, data]);

    function deleteListItem(postId) {
        setPosts(posts.filter(post => post.id !== postId));
    }

    function updateListItem(updatedPost) {
        setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="profile-page">
            <div id="posts-section">
                {posts.map(post => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button onClick={() => deleteListItem(post.id)}>Delete</button>
                        <button onClick={() => updateListItem({ ...post, content: "Updated content" })}>
                            Update
                        </button>
                    </div>
                ))}
            </div>
            <div id="profile-section">
                <img className="profile-picture" src="https://cdn.example.com/profile-picture.png" alt="Profile" />
                <h4>{profile.firstName} {profile.lastName}</h4>
                <p>Bio</p>
                <a href="/create-post" className="create-post-link">New Post</a>
            </div>
        </div>
    );
}

export default Profile;
