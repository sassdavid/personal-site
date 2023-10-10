import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import ContactIcons from '../components/Contact/ContactIcons';

const Contact = () => (
  <Main
    title="Contact"
    description="Contact David Sass via email @ david.sass14@gmail.com"
  >
    <article className="post" id="contact">
      <header>
        <div className="title">
          <h2><Link to="/contact">Contact</Link></h2>
        </div>
      </header>
      <div className="email-at">
        <p>Feel free to get in touch. You can emailll me at: </p>
        <p><a href="mailto:david.sass14@gmail.com">david.sass14@gmail.com</a></p>
      </div>
      <ContactIcons />
    </article>
  </Main>
);

export default Contact;
