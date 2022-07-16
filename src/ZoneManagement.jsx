import './App.css';
import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_ZONE_KEY = 'zonelist'

const Colors = [
  { label: '', value: '' },
  { label: 'Aquamarine', value: 'Aquamarine' },
  { label: 'Gold', value: 'Gold' },
  { label: 'Light Cyan', value: 'LightCyan' },
  { label: 'Pale Green', value: 'PaleGreen' },
  { label: 'Powder Blue', value: 'PowderBlue' },
  { label: 'Salmon', value: 'Salmon' },
]

function ZoneManagement() {

  const [zonename, setZonename] = useState('')
  const [zonecolor, setZonecolor] = useState('')
  const [zonelist, setZonelist] = useState([])

  const addZone = event => {
    const newZone = {zonename: zonename, zonecolor: zonecolor}
    setZonelist(zonelist.concat(newZone))

    setZonename('')
    setZonecolor('')
    event.preventDefault()
  }

  useEffect( () => {
    const data = localStorage.getItem(LOCAL_STORAGE_ZONE_KEY)
    if (data) {
      setZonelist(JSON.parse(data))
    }
    console.log('First load: ', zonelist)
  }, [])

  useEffect( () => {
    console.log('Updated: ', zonelist)
    localStorage.setItem(LOCAL_STORAGE_ZONE_KEY, JSON.stringify(zonelist))
  }, [zonelist])

  function checkColor(chosenColor) {
    let found = false;
    for (let i = 0; i < zonelist.length; i++) {
      if (zonelist[i].zonecolor === chosenColor) {
        found = true;
        break;
      }
    }
    return found
  }

  return (
    <div>
      <h1>Zone Management Page</h1>
      <form>
        <div>
          <label>Storage Name: </label>
          <input
            type='text'
            required
            value={zonename}
            onChange={ (e) => setZonename(e.target.value) }
          />
        </div>
        <div>
          <label>Pick Color: </label>
          <select
            value={zonecolor}
            onChange={ (e) => setZonecolor(e.target.value) }
            >
              {Colors.map((color, index) =>
                <option key={index} value={color.value}>{color.label}</option>
              )}
          </select>
        </div>
        <div>
          <button disabled={!zonename || !zonecolor || checkColor(zonecolor)} onClick={addZone}>Add</button>
          <button>Cancel</button>
        </div>
      </form>
      <div className='container'>
        {zonelist.map((zone, index) =>
          <div className='zonebox' style={{backgroundColor: zone.zonecolor}} key={index}>
            {zone.zonename}<br/>
            <button
              onClick={ () => setZonelist(zonelist.filter(copyitem => copyitem.zonename !== zone.zonename)) }
              >remove</button>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default ZoneManagement;
