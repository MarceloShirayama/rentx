// initializing list of users
let users = [
  {
    available: true,
    name: 'John',
    email: 'johnson@mail.com',
    age: 25,
    address: 'USA'
  },
  {
    available: true,
    name: 'Tom',
    email: 'tom@mail.com',
    age: 35,
    address: 'England'
  },
  {
    available: true,
    name: 'Mark',
    email: 'mark@mail.com',
    age: 28,
    address: 'England'
  },
  {
    available: false,
    name: 'Mark',
    email: 'mark@mail.com',
    age: 28,
    address: 'England'
  }
]

// filtering the users array and saving
// result back in users variable
users = users
  .filter((user) => user.available === true)
  .filter((user) => {
    if (user.name === 'Mark' || user.address === 'England') {
      return user
    }
    return null
  })

// logging out the result in console
console.log(users)
