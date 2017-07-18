import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = (query) => {
    this.setState({ query: "" })
  }

  render() {
    const { contacts, onDeleteContact, onAddContact } = this.props;
    const { query } = this.state;
    let showingContacts;

    if (query) {
      const match = new RegExp(escapeRegExp(query),"i")
      showingContacts = contacts.filter((contact) => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy("name"));

    return (
        <div className="list-contacts">
          <div className="list-contacts-top">
            <input type="text"
                   className="search-contacts"
                   placeholder="Search Contacts"
                   value={query}
                   onChange={(event) => this.updateQuery(event.target.value)}
            />
            <a
                href="#create"
                className="add-contact"
                onClick={() => onAddContact()}
                >Add Contact Here</a>
          </div>
          {showingContacts.length !== contacts.length && (
              <div className="showing-contacts">
                <span>Showing {showingContacts.length} of {contacts.length} contacts.</span>
                <button onClick = {this.clearQuery}>Show All</button>
              </div>
            )}
          <ol className='contact-list'>
            {showingContacts.map((contact) => (
              <li key={contact.id} className="contact-list-item">
                <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}/>
                <div className='contact-details'>
                  <div>{contact.name}</div>
                  <div>{contact.email}</div>
                </div>
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                  Remove
              </button>
              </li>
              ))}
          </ol>
        </div>
      )
  }
}

export default ListContacts;