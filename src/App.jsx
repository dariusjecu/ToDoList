import React, {useState, useEffect} from 'react';
import {FiTrash2} from "react-icons/fi"

function App() {

  const event = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const date = event.toLocaleDateString('en-US', options).split(" ")
  const dayName = date[0]
  const month = date[1]
  const day = date[2].slice(0, date[2].length-1)

  const [array, setArray] = useState([])
  const [checked, setChecked] = useState([])

  function AddItem(){
    const input = document.getElementById("input").value
    if(input != "")
      {
        setArray(val => {
          return [...val, input]
        })
        setChecked(val => {
          return [...val, false]
        })
      }
    document.getElementById("input").value = ""
    if(document.body.offsetHeight > 640)
      document.getElementsByClassName("background-left")[0].style.height = `${document.body.offsetHeight + 435}px`
  }

  function Remove(event){
    const target = event.currentTarget.parentNode.parentNode.getAttribute("index")
    let aux = array.map(val => val)
    aux.splice(target, 1)
    setArray(aux)
    aux = checked.map(val => val)
    aux.splice(target, 1)
    setChecked(aux)

    if(document.body.offsetHeight > 640)
      document.getElementsByClassName("background-left")[0].style.height = `${document.body.offsetHeight + 435}px`
    else
      document.getElementsByClassName("background-left")[0].style.height = `100%`
  }

  function Change(event){
    const target = event.currentTarget.parentNode.parentNode.getAttribute("index")
    setChecked(val => val.map((el, index) => {
      console.log(el)
      if(index == target)
        return !el
      else
        return el
    }))
    console.log(checked)
  }

  useEffect(() => {
      console.log(JSON.parse(localStorage.getItem("array")))
      console.log(JSON.parse(localStorage.getItem("checked")))
      setArray(JSON.parse(localStorage.getItem("array")))
      setChecked(JSON.parse(localStorage.getItem("checked")))
      console.log(array)
  }, [])
  

    localStorage.setItem("array", JSON.stringify(array))
    localStorage.setItem("checked", JSON.stringify(checked))
      

  const Element = array.map((val, i) => {
                return (
                  <div key={i} index={i}>
                    <div className='item'>
                        <input type="checkbox" checked={checked[i]} onChange={Change}/>
                        <h2 style={checked[i] == true ? {textDecoration: "line-through 2px"} : {textDecoration: "none"}}>{val}</h2>
                        <FiTrash2 onClick={Remove} className='icon'/>
                    </div>
                    <div className='bar'></div>
                  </div>
                  
                )
  })

  const Empty = <div className='empty'>
                  <h2>List is empty!</h2>
                  <div className='bar'></div>
                </div>

  return (
    <div>
      <div className='background-left'></div>
      <div className='container'>
        <h1>{`${dayName} ${month} ${day}`}</h1>
        <div className='list'> 
          {array.length == 0 ? Empty : Element}
          <div className='add-item'>
            <input id='input' type="text"/>
            <button className='add-button' onClick={AddItem}>+</button>
          </div>
        </div>
        <h3>Copyright 2022 My App</h3>
      </div>
    </div>
  )
}

export default App
