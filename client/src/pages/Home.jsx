import { useState } from 'react'

function Home(props) {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Run mutation');
  }

  return (
    <div className="list-group">
      <h1>Travel Log</h1>
      <form>
        <label for="location">Location</label>
        <input type="text" id="location" name="location" required />

        <label for="description">Description</label>
        <input type="text" id="description" name="description" required /> 

        <label for="temperature">Temperature</label>
        <input type="number" id="temperature" name="temperature" required />

        <input type="submit" value="Submit" />
        </form>
    </div>
  );
}

export default Home;