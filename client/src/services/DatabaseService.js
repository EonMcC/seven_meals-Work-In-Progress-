const mealsURL = 'http://localhost:3000/api/meals/'
const weeksURL = 'http://localhost:3000/api/weeks/'
const inventoriesURL = 'http://localhost:3000/api/inventories/'

export default {
  // Get Alls
  getAllMeals() {
    return fetch(mealsURL)
      .then(res => res.json())
  },
  getAllWeeks() {
    return fetch(weeksURL)
      .then(res => res.json())
  },
  getAllInventories() {
    return fetch(inventoriesURL)
      .then(res => res.json())
  },
  //Get One by ID
  getMeal(id){
    return fetch(mealsURL + id, {
      method: "SHOW",
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
  },
  getWeek(id){
    return fetch(weeksURL + id, {
      method: "SHOW",
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
  },
  getInventory(id){
    return fetch(inventoriesURL + id, {
      method: "SHOW",
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
  },
  // Add to DB
  addMeal(data) {
    return fetch(mealsURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
  },
  addWeek(data) {
    return fetch(weeksURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
  },
  addInventory(data) {
    return fetch(inventoriesURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
  },
  // Update DB
  updateMeal(data) {
    return fetch(mealsURL + data._id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json'}
    })
      .then(res => res.json())
  },
  updateWeek(data) {
    return fetch(weeksURL + data._id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json'}
    })
      .then(res => res.json())
  },
  updateInventory(data) {
    return fetch(inventoriesURL + data._id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json'}
    })
      .then(res => res.json())
  }
}
