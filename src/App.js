import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers] = useState([]);

  useEffect(()=>{
   fetch('http://localhost:5000/user')
   .then(res => res.json())
   .then(data => setUsers(data));

  },[])

  const handleAddUser =event =>{
    event.preventDefault();
    const name =event.target.name.value;
    const email =event.target.email.value;
    console.log(name,email);
    const user = {name,email};


    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then((data) => {
      
      const newUser=[...users,data];
      setUsers(newUser);
      console.log('Success:', data);
    })
  }


  

  return (
    <div className="App">
      <h1>My own data {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name'  required/>
        <input type="text" name='email' placeholder='Email' required/>
        <input type="submit" value="Add Me" />
        {/* <input type="password" placeholder='password' /> */}
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}> {user.id}. {user.name}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
