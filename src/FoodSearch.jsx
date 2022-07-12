import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LOCAL_STORAGE_FOOD_KEY = 'foodlist'

function FoodSearch() {

  const foodlist = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FOOD_KEY))

  const [querytext, setQuerytext] = useState('')
  const [queryresult, setQueryresult] = useState([])

  useEffect( () => {
    let results = []
    for (let i = 0; i < foodlist.length; i++) {
      if (querytext != '' && (foodlist[i].barcode === querytext || foodlist[i].foodname.toLowerCase().includes(querytext.toLowerCase()))) {
        results.push(foodlist[i])
      }
    }
    setQueryresult(results)
  }, [querytext])

  return (
    <div>
      <h1>Food Search Page</h1>
      <div>
        <label>
          Enter food name or bar code number to search<br />
          <input
            type='text'
            value={querytext}
            onChange={ (e) => setQuerytext(e.target.value) } 
          />
        </label>
        <div>
          {queryresult.length != 0 &&
            <div className='text'>{queryresult.length} result(s) found...</div>
          }
          {queryresult &&
            queryresult.map((item, index) =>
            <div key={index} className='foodbox'>
              {item.foodname} ({item.units})<br/>
              <Link to={`/quantitymanagement/${item.foodname}`}
                state={{ barcode: item.barcode }}
                >
                <button type="button">Manage</button>
              </Link>
            </div>
          )}
          </div>
      </div>
    </div>
  );
}

export default FoodSearch;
