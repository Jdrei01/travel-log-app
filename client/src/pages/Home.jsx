import { useState } from 'react'
import { ADD_POST } from '../utils/mutations.js';
import { ALL_POSTS } from '../utils/queries.js';
import { useMutation, useQuery } from '@apollo/client';
import MapComponent from './map.jsx';
import LoginPage from './loginPage.jsx';

function Home(props) {
  const [addPost, { error }] = useMutation(ADD_POST);
  const { loading, data } = useQuery(ALL_POSTS);
  const posts = data?.allPosts || [];
 

  const [formState, setFormState] = useState({
    location: '',
    description: '',
    temperature: null
  })

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormState({
      ...formState, 
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.table(formState);

    const newPost = {
      location: formState.location,
      description: formState.description,
      temperature: formState.temperature,
    };

    setPosts([...posts, newPost]);

    setFormState({
      location: '',
      description: '',
      temperature: '',
    });

    await addPost({
      variables: {
        ...formState,
        temperature: parseInt(formState.temperature)
      }
    });

    console.log('All done');
    window.location.reload();
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="list-group">
      <h1>Travel Log</h1>

      <form onSubmit={handleSubmit}>
        <label for="location">Location</label>
        <input prop="" type="text" id="location" name="location" value={formState.location} onChange={handleChange} required />

        <label for="description">Description</label>
        <input prop="" type="text" id="description" name="description" value={formState.description} onChange={handleChange} required /> 

        <label for="temperature">Temperature</label>
        <input prop="" type="number" id="temperature" name="temperature" value={formState.temperature} onChange={handleChange} required />

        <input prop="" type="submit" value="Submit" />
        </form>

      {posts.map((post) => {
        var keyStyle = {
          fontSize: "18px"
        }
        var valueStyle = {
          fontSize: "16px",
          color: "maroon"
        }
        var tempStyle = {
          fontSize: "16px",
          color: "orange"
        }
        var descStyle = {
          fontSize: "16px",
          color: "green"
        }
        return (
          <div>
            <p style={keyStyle}>Location:<span style={valueStyle}>{post.location},    </span>
            Description:<span style={descStyle}>{post.description},    </span>
            Temp:<span  style={tempStyle}>{post.temperature}    </span>
            {/* <span>Lat: {post.lat}</span>
            <span>Lng: {post.lng}</span> */}
            </p>
          </div>
        )
        })}

       <div>
    <div>
      <h3>Map</h3>
      <MapComponent posts={posts} />
    </div>
  </div>

    </div>
  );
}

export default Home;