import './App.css';
import React, { useEffect, useState } from 'react';
import Food from './Food'

const LOCAL_STORAGE_FOOD_KEY = 'foodlist'

function FoodRegister() {

  const [barcode, setBarcode] = useState('')
  const [foodname, setFoodname] = useState('')
  const [units, setUnits] = useState('')
  const [minquantity, setMinquantity] = useState('')
  const [foodlist, setFoodlist] = useState([])

  const addFood = event => {
    const newfood = {barcode: barcode, foodname: foodname, units: units, minquantity: minquantity}
    setFoodlist(foodlist.concat(newfood))

    setBarcode('')
    setFoodname('')
    setUnits('')
    setMinquantity('')
    event.preventDefault()
  }

  const clearInputs = () => {
    setBarcode('')
    setFoodname('')
    setUnits('')
    setMinquantity('')
  }

  useEffect( () => {
    // setFoodlist(JSON.parse(localStorage.getItem(LOCAL_STORAGE_FOOD_KEY)))
    const data = localStorage.getItem(LOCAL_STORAGE_FOOD_KEY)
    if (data) {
      setFoodlist(JSON.parse(data))
    }
    console.log('First load: ', foodlist)
  }, [])

  useEffect( () => {
    console.log('Updated: ', foodlist)
    localStorage.setItem(LOCAL_STORAGE_FOOD_KEY, JSON.stringify(foodlist))
  }, [foodlist])

  function checkBarcode(inputBarcode) {
    let found = false;
    for (let i = 0; i < foodlist.length; i++) {
      if (foodlist[i].barcode === inputBarcode) {
        found = true;
        break;
      }
    }
    return found
  }

  return (
    <div>
      <h1>Food Registration Page</h1>
      <form>
        <div>
          <label>Bar Code: </label>
          <input
            type='number'
            required
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>
        <div>
          <label>Food Name: </label>
          <input
            type='text'
            required
            value={foodname}
            onChange={(e) => setFoodname(e.target.value)}
          />
        </div>
        <div>
          <label>Units: </label>
          <select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          >
            <option value=''></option>
            <option value='each'>Each</option>
            <option value='grams'>Grams</option>
            <option value='kilograms'>Kilograms</option>
            <option value='milliliters'>Milliliters</option>
            <option value='liters'>Liters</option>
            <option value='ounces'>Ounces</option>
            <option value='pounds'>Pounds</option>
          </select>
        </div>
        <div>
          <label>Restock Qty: </label>
          <input
            type='number'
            value={minquantity}
            onChange={(e) => setMinquantity(e.target.value)}
          />
          </div>
        <div>
          <button disabled={!barcode || !foodname || !units || checkBarcode(barcode)} onClick={addFood}>Register</button>
          <button onClick={clearInputs}>Cancel</button>
        </div>
        <div style={{color: 'red'}}>
          {checkBarcode(barcode)? 'Error: Bar Code # already exists!': ''}
        </div>
      </form>
    </div>
  )
}

export default FoodRegister;