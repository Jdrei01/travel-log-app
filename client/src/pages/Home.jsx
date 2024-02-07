import { useState } from 'react'
import { ADD_POST } from '../utils/mutations.js';
import { ALL_POSTS } from '../utils/queries.js';
import { useMutation, useQuery } from '@apollo/client';

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
        <input type="text" id="location" name="location" value={formState.location} onChange={handleChange} required />

        <label for="description">Description</label>
        <input type="text" id="description" name="description" value={formState.description} onChange={handleChange} required /> 

        <label for="temperature">Temperature</label>
        <input type="number" id="temperature" name="temperature" value={formState.temperature} onChange={handleChange} required />

        <input type="submit" value="Submit" />
        </form>

      {posts.map((post) => {
        return (
          <div>
            <p>Location: {post.location}</p>
            <p>Description: {post.description}</p>
            <p>Temp: {post.temperature}</p>
          </div>
        )
        })}
    </div>
  );
}

export default Home;