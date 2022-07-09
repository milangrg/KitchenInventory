import './App.css';
import React from 'react';
import Food from './Food'

// 1. class creation - does not call render() yet
// 2. mounting - initial render()
// 3. setState() - triggers render()
// 4. props changed - triggers render()
// 5. unmounting - removes elements created by render()

const LOCAL_STORAGE_FOOD_KEY = 'foods'

class FoodRegister extends React.PureComponent {

  // state = {
  //   foods: [{foodName: 'Cooking oil', barcode: 123123123, unit: 'ml', minQty: 500},
  //     {foodName: 'Sardines', barcode: 5656565, unit: 'forEach', minQty: 2},
  //   ]
  // }

  state = {
    foods: [
      'Chocolate chip cookie',
      'Cranberry orange scone',
      'Salmon',
      'Broccoli',
      'Soy sauce',
      'Char Kway teow',
      'Rice'
    ]
  }

  componentDidMount() {
    console.log('did mount')
    this.setState({
      foods: JSON.parse(localStorage.getItem(LOCAL_STORAGE_FOOD_KEY))
    })
  }

  componentWillUnmount() {
    console.log('will unmount')
  }

  addItem = () => {
    const newFoods = [...this.state.foods, this.state.newItemName]
    this.setState({
      foods: newFoods,
      newItemName: ''
    })
    localStorage.setItem(LOCAL_STORAGE_FOOD_KEY, JSON.stringify(newFoods))
  }

  newItemNameChanged = event => {
    this.setState({
      newItemName: event.target.value
    })
  }

  setItemName = (newName, index) => {
    const foodsCopy = [...this.state.foods]
    foodsCopy.splice(index, 1, newName)
    this.setState({
      foods: foodsCopy
    })
    localStorage.setItem(LOCAL_STORAGE_FOOD_KEY, JSON.stringify(foodsCopy))
  }

  render() {
    return (
      <div>
        <h1>Food Registration Page</h1>
        {
          this.state.foods.map((foodName, index) => 
            <Food 
              key={index}
              // key={value} 
              foodName={foodName}
              index={index}
              setItemName={this.setItemName} />
          )
        }
        <label>
          New food:
          <input 
            type="text" 
            onChange={this.newItemNameChanged}
            value={this.state.newItemName}
          />
        </label>
        <button onClick={this.addItem}>Add</button>
      </div>
    );
  }
}

export default FoodRegister;
