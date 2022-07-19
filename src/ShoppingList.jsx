import './App.css';
import React, { useEffect, useState } from 'react';

const LOCAL_STORAGE_FOOD_KEY = 'foodlist'
const LOCAL_STORAGE_STOCK_KEY = 'inventorylist'

function ShoppingList() {

  const [inventorylist, setInventorylist] = useState([])
  const [foodlist, setFoodlist] = useState([])

  useEffect( () => { 
    const data = localStorage.getItem(LOCAL_STORAGE_STOCK_KEY)
    if (data) {
      setInventorylist(JSON.parse(data))
    }
    const data2 = localStorage.getItem(LOCAL_STORAGE_FOOD_KEY)
    if (data2) {
      setFoodlist(JSON.parse(data2))
    }

  }, [])

  function resultList() {
    let result = filterResult()
    let newresult = []

    for (let i = 0; i < result.length; i++) {
      const fn = result[i].foodname
      const bc = result[i].barcode
      const un = result[i].units
      const mq = parseInt(result[i].minquantity, 10)
      let total = 0

      for (let j = 0; j < inventorylist.length; j++) {
        if (inventorylist[j].barcode === bc) {
          total = total + parseInt(inventorylist[j].quantity, 10)
        }
      }
      if (total <  mq) {
        const newItem = {foodname: fn, barcode: bc, units: un, minquantity: mq, stock: total}
        newresult.push(newItem)
      }

    }
    return newresult
  }

  function filterResult() {
    let copyfoodlist = foodlist
    let result = copyfoodlist.filter(item => item.minquantity > 0)
    let result2 = []

    for (let i = 0; i < result.length; i++) {
      let found = false
      for (let j = 0; j < inventorylist.length; j++) {
        if (result[i].barcode === inventorylist[j].barcode) {
          found = true
        }
      }
      if (found) {
        result2.push(result[i])
      }
    }
    return result2
  }

  return (
    <div>
      <h1>Shopping List Page</h1>
      <div>
        {resultList().map( (item, index) => 
        <div key={index} className='shoppinglist'>
          <>Food: {item.foodname}<br/> 
          Total stock: {item.stock}<br/>
          Min. quantity: {item.minquantity}</>
        </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingList;
