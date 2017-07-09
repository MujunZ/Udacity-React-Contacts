import React, { Component } from 'react';

function ListContacts (props) {
  return (
    <ol className='contact-list'>
      {props.contacts.map((contact) => (
        <li key={contact.id} className="contact-list-item">
          <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}/>
          <div className='contact-details'>
            <div>{contact.name}</div>
            <div>{contact.email}</div>
          </div>
        <button className='contact-remove'>
		</button>
		</li>
		))}
      </ol>
  );
}

export default ListContacts;