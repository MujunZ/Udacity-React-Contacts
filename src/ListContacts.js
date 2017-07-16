import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  render() {
    let showingContacts;
    if (this.state.query) {
      showingContacts = this.props.contacts.filter((contact)=>
        contact.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
    } else {
      showingContacts = this.props.contacts;
    }

    return (
        <div className="list-contacts">
          <div className="list-contacts-top">
            <input type="text"
                  className="search-contacts"
                  placeholder="Search Contacts"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
          <ol className='contact-list'>
            {showingContacts.map((contact) => (
              <li key={contact.id} className="contact-list-item">
                <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}/>
                <div className='contact-details'>
                  <div>{contact.name}</div>
                  <div>{contact.email}</div>
                </div>
              <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
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