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
      
    </div>
  );
}

export default Home;