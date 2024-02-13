import { useState } from 'react'
import { ADD_POST } from '../utils/mutations.js';
import { ALL_POSTS } from '../utils/queries.js';
import { useMutation, useQuery } from '@apollo/client';
import Map from '../components/Map.jsx';
import LoginPage from './loginPage.jsx';
import '../styles/HomePage.css';

function Home(props) {
  const [addPost, { error }] = useMutation(ADD_POST);
  const { loading, data } = useQuery(ALL_POSTS);
  const posts = data?.allPosts || [];
 

  const [formState, setFormState] = useState({
    location: '',
    description: '',
    temperature: ''
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
        <label forhtml="location">Location</label>
        <input prop="" type="text" id="location" name="location" value={formState.location} onChange={handleChange} required />

        <label forhtml="description">Description</label>
        <input prop="" type="text" id="description" name="description" value={formState.description} onChange={handleChange} required /> 

        <label forhtml="temperature">Temperature</label>
        <input prop="" type="number" id="temperature" name="temperature" value={formState.temperature} onChange={handleChange} required />

        <input prop="" type="submit" value="Submit" />
      </form>




  <div id='posts-section'>
      {posts.map((post) => (
        <div key={post._id} className="post-container">
          <h2>{post.location}</h2>
          <p>Description: {post.description}</p>
          <p>Temperature: {post.temperature}</p>
          <p>Latitude: {post.lat}</p>
          <p>Longitude: {post.lng}</p>
        </div>
      ))}
    </div>



    <div id='map' className="map-container">
      <h3 className="map-title">Map</h3>
      <Map posts={posts} />
    </div>


  </div>
  );
}

export default Home;