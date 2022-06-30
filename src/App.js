import React from "react";
import "./styles.css";

export default class App extends React.Component {
  state = {
    users: [
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Jon Snow",
        email: "jonsnow@winterfell.com"
      },
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Ned Stark",
        email: "nedstark@winterfell.com"
      },
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Frodo Baggins",
        email: "frodo@bagend.com"
      }
    ],
    newUserName: "",
    newUserEmail: "",
    userBeingEdited: null,
    modifiedUserName: "",
    modifiedEmail: ""
  };

  renderAddUser() {
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="User name"
          value={this.state.newUserName}
          onChange={this.updateFormField}
          name="newUserName"
        />
        <input
          type="text"
          placeholder="User email"
          value={this.state.newUserEmail}
          onChange={this.updateFormField}
          name="newUserEmail"
        />
        <button onClick={this.addUser}>Add</button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="App">
        {this.state.users.map((user) => {
          return (
            <React.Fragment key={user._id}>

              {!this.state.userBeingEdited || this.state.userBeingEdited._id !== user._id? 
              
              <div class="box">
                <h3>{user.name}</h3>
                <h4>{user.email}</h4>
                <button
                  onClick={() => {
                    this.beginEdit(user);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    this.deleteUser(user);
                  }}
                >
                  Delete
                </button>
              </div>

              :
              
              <div class="box">
                <input type='text' placeholder="User" name='modifiedUserName' value={this.state.modifiedUserName} onChange={this.updateFormField}/>
                <input type='text' placeholder="Email" name='modifiedEmail' value={this.state.modifiedEmail} onChange={this.updateFormField}/>
                <button onClick={this.updateUser}>Update</button>
              </div>
            
              }

              
            </React.Fragment>
          );
        })}
        {this.renderAddUser()}
      </div>
    );
  }

  updateFormField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addUser = () => {
    let newUser = {
      _id: Math.floor(Math.random() * 10000),
      name: this.state.newUserName,
      email: this.state.newUserEmail
    };

    let cloned = [...this.state.users, newUser];

    this.setState({
      users: cloned
    });
  };

  beginEdit = (user) => {
      this.setState({
        userBeingEdited: user,
        modifiedUserName: user.name,
        modifiedEmail: user.email
      })
  };

  updateUser = () => {

    let index = this.state.users.findIndex(user => user._id === this.state.userBeingEdited._id)

    let clonedUser = {...this.state.userBeingEdited, name:this.state.modifiedUserName , email: this.state.modifiedEmail} 

    this.setState({
      users: [...this.state.users.slice(0, index), clonedUser, ...this.state.users.slice(index + 1)],
      userBeingEdited: null
    })
  }

  deleteUser = (user) => {};
}
