const api = 'http://localhost:3000';

export async function addDistant(data) {
    return fetch(`${api}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(result => result.json())
    .catch(error => {
      console.error(error);
      return false;
    }); 
  }
  
  export async function removeDistant(todo) {
    return fetch(`${api}/todos/${todo.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(result => result.json())
    .catch(error => {
      console.error(error);
      return false;
    });
  }
  
  export async function updateDistant(data) {
    return fetch(`${api}/todos/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(result => result.json())
    .catch(error => {
      console.error(error);
      return false;
    }); 
  }

export async function getAllDistant() {
    return fetch(`${api}/todos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        res => res.json() 
    ).catch(error => {
        console.error(error);
        return false;
    });
}

/*
export async function removeDistantTodo(data) {
    return fetch(`${api}/todos/${data.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        res => res.json()
    ).catch(error => {
        console.error(Object.entries(error) > 0 && error.hasOwnProperty('message') ? error.message : 'CORS error');
        return false;
    });
}*/
