import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts.js';
import CreateContact from './CreateContact.js';
import * as ContactsAPI from "./utils/ContactsAPI.js";

class App extends Component {
  state = {
    contacts:[]
  };

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts });
    })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter( c => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact);
  }

  createContact(newContact){
    ContactsAPI.create(newContact).then(newContact => {
      this.setState( state => ({
        contacts: state.contacts.concat([ newContact ])
      }))
    })
  }

  render() {
    return (
      <div>
      <Route exact path='/' render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}/>
      <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact = {(newContact) => {
              this.createContact(newContact);
              history.push("/");
            }}
          />
        )}/>
      </div> 
    );
  }
}

export default App;
