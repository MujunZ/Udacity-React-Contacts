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
  render() {
    return (
        
        <ol className='contact-list'>
          {this.props.contacts.map((contact) => (
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
      )
  }
}

export default ListContacts;