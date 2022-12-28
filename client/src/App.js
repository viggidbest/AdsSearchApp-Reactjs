import './App.css';
import Button  from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import NewCard from './NewCard';
import axios from "axios"
function App() {
  const [data,setData]= useState()
  const [searchterm ,setSearchTerm]= useState({
    term:""
})
  function handleChange(event){
      setSearchTerm(event.target.value)
      
  }

  function handleSubmit(event){
    event.preventDefault()
    
    axios.get("http://localhost:3001/test",{params:{'search':searchterm}}).then(res =>setData(res.data)).catch(err =>console.log(err))
  }
  return (
    <div className="App" style={{width:"90%", margin:"auto auto" , textAlign:"center"}}>
      <h1>Search AD</h1>
      <Form>
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="Type Term" onChange={handleChange}/>

      </Form.Group>

      <Button style={{width:"100%"}} variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    <br/>
    <CardGroup>
    {data  && data.map((item,i) => {

      return <NewCard item={item} key={i}/>
    })}
   </CardGroup>
    </div>
  );
}

export default App;
