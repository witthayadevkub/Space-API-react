import { useState, useEffect } from 'react'
import axios from 'axios'
// import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [inputID, setInputID] = useState()
  const [datafilter,setDatafilter] = useState([])

useEffect(() =>{
  axios.get('https://finalspaceapi.com/api/v0/location')
    .then(res =>{
      setData(res.data)
    })
},[])

function Filter(e){
  e.preventDefault()
  const filterdata = data.filter(item => item.id == inputID)
  setDatafilter(filterdata)
}

  return (
    <div className="App">
      <div>
        <h1>Space API</h1>
        <form>
            <input className="input" type="number" placeholder='Location ID' min="0" max="12" value={inputID} onChange={e => setInputID(e.target.value)}/>
            <button  onClick={Filter}>Search</button>
        </form>
      </div>
      {inputID ?<h3>{datafilter.map(item => (`${item.id}: ${item.name}`)  )}</h3>:<h3>Enter a location ID from 1 to 12</h3>}

      <div className='box'>
         {datafilter.map(item => (
           <div>
            <img src={item.img_url} alt={item.name}/>
            <h2>Name : {item.name}</h2>
            <h4>Type : {item.type}</h4>

            
             <div>
                {item.inhabitants.map((item,index)=>(
                <div>
                  <h5>{index+1}:{item}</h5>
                </div>
              ))}
               </div>

            
           </div>
         )  
         )}
      </div>
    </div>
  )
}

export default App
