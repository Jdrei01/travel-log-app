import { useState, useEffect } from "react";
import { useSelector} from "react"; 


const Profile = () => {
    const token = useSelector((state) => state.auth.value)
    const [profile, setProfile] = useState([])
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const response = await api.call(endpoints.me, {}, token)
            setProfile(response.results.profile)
            setPosts(response.results.posts)
            setIsLoading(false)
        }
        getData()

    }, [token])

    function deleteListItem(_id) {
        setPosts(posts.filter(post => post._id !== _id))
    }

    function updateListItem(post) {
        const updatedPosts = posts.map((p) => {
            if (post._id === p._id) {
                return post
            } else {
                return p
            }
        })
        setPosts(updatedPosts)

    }

    return (
        <>
            {!isLoading &&
                <div className="profile-page">
                    <div id='posts-section'>
                        <PostList
                            posts={posts}
                            onDelete={deleteListItem}
                            onEdit={updateListItem}
                        />
                    </div>
                    <div id='profile-section'>
                        <Image className='profile-picture' fluid src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                        <h4>{profile.firstName + " " + profile.lastName}</h4>
                        <p>Bio</p>
                        <Link to={'/create-post'} className='create-post-link'>New Post</Link >
                    </div>
                </div>

            }
        </>

    )
}
export default withLayout(Profile)