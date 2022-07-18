import './App.css';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";

const LOCAL_STORAGE_ZONE_KEY = 'zonelist'
const LOCAL_STORAGE_STOCK_KEY = 'inventorylist'

function QuantityManagement(props) {

  const zonelist = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ZONE_KEY))

  const { food } = useParams()

  const location = useLocation()
  const { barcode }  = location.state
  console.log(barcode)

  const [foodstocklist, setFoodstocklist] = useState([]) // current food {location, qty}
  const [selectedzone, setSelectedzone] = useState('') // current location
  const [quantity, setQuantity] = useState(0) // current qty
  const [tempqty, setTempqty] = useState(0) // current qty

  // initial load
  useEffect( () => {
    const data = localStorage.getItem(LOCAL_STORAGE_STOCK_KEY) // all foods
    if (data) {
      setFoodstocklist(JSON.parse(data))
    }
  }, [])

  // for saving
  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_STOCK_KEY, JSON.stringify(foodstocklist))
  }, [foodstocklist])

  const addZone = event => {
    let found = false;
    let copyfoodstocklist = foodstocklist
    for (let i = 0; i < foodstocklist.length; i++) {
      if (copyfoodstocklist[i].barcode === barcode && copyfoodstocklist[i].location === selectedzone) { // same zone found
        copyfoodstocklist[i].quantity = parseInt(copyfoodstocklist[i].quantity, 10) + parseInt(quantity, 10)
        found = true
        setFoodstocklist(copyfoodstocklist)
        break
      }
    }

    if (!found) { // not found or empty list
      const newItem = {barcode: barcode, location: selectedzone, quantity: quantity}
      setFoodstocklist(foodstocklist.concat(newItem)) // save update
    }

    setSelectedzone('')
    setQuantity(0)
    event.preventDefault()
  }

  function findColor(zoneloc) {
    let color = ''
    zonelist.forEach( (zone) => {
      if (zone.zonename === zoneloc) {
        color = zone.zonecolor
      }
    })
    return color
  }

  function checkZone(zoneloc) {
    let resultzone = ''
    let found = false
    zonelist.forEach( (zone) => {
      if (zone.zonename === zoneloc) {
        resultzone = zone.zonename
        found = true
      }
    })
    if (!found) {
      resultzone = 'unassigned'
      return resultzone
    }
    return resultzone
  }

  function resultList() {
    let result = []
    for (let i = 0; i < foodstocklist.length; i++) {
      if (foodstocklist[i].barcode === barcode) {
        result.push(foodstocklist[i])
      }
    }
    return result
  }

  return (
    <div>
      <h1>Quantity Management Page</h1>
      <h2>{food}</h2>
      <form>
        <div>
        <label>New Zone: </label>
          <select
            type='text'
            value={selectedzone}
            onChange={(e) => setSelectedzone(e.target.value)} 
            >
            {zonelist.map((zone, index) =>
              <option key={index} value={zone.zonename}>{zone.zonename}</option>
            )}
          </select>
        </div>
        <div>
        <label>Quantity: </label>
        <input
          style={{ width: '100px'}}
          type='number'
          min='0'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)} 
        />
        </div>
        <div><button disabled={!selectedzone} onClick={addZone}>Add</button></div>
      </form>
      <div>
        {foodstocklist &&
          resultList().map( (item, index) =>
          <div className='foodbox' style={{backgroundColor: findColor(item.location), color: 'black'}} key={index}>
            {checkZone(item.location)}  (Stock: {item.quantity})<br/>
            <input
              type='number'
              min='0'
              defaultValue={tempqty}
              onChange={ (e) => setTempqty(e.target.value) }
              />
            <button>Update</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuantityManagement;