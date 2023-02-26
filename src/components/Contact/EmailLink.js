import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const validateText = (text) => {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))$/;
  return re.test(text) || text.length === 0;
};

const messages = [
  'hi',
  'hello',
  'hola',
  'you-can-email-me-at-literally-anything! Really',
  'well, not anything. But most things',
  'like-this',
  'or-this',
  'but not this :(  ',
  'you.can.also.email.me.with.specific.topics.like',
  'just-saying-hi',
  'please-work-for-us',
  'help',
  'admin',
  'or-I-really-like-your-website',
  'thanks',
];

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay) {
      const id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }
    return () => {
    }; // pass linter
  }, [delay]);
};

const EmailLink = ({ loopMessage }) => {
  const hold = 50;
  const delay = 50;

  const [idx, updateIter] = useState(0);
  const [message, updateMessage] = useState(messages[idx]);
  const [char, updateChar] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useInterval(() => {
    let newIdx = idx;
    let newChar = char;
    if (char - hold >= messages[idx].length) {
      newIdx += 1;
      newChar = 0;
    }
    if (newIdx === messages.length) {
      if (loopMessage) {
        updateIter(0);
        updateChar(0);
      } else {
        setIsActive(false);
      }
    } else {
      updateMessage(messages[newIdx].slice(0, newChar));
      updateIter(newIdx);
      updateChar(newChar + 1);
    }
  }, isActive ? delay : null);

  return (
    <div className="inline-container"
         style={validateText(message) ? {} : { color: 'red' }}
         onMouseEnter={() => setIsActive(false)}
         onMouseLeave={() => (idx < messages.length) && setIsActive(true)}>
      <a href={validateText(message) ? 'mailto:david.sass14@gmail.com' : ''}>
        <span>{message}</span>
        <span>@gmail.com</span>
      </a>
    </div>
  );
};

EmailLink.defaultProps = {
  loopMessage: false,
};

EmailLink.propTypes = {
  loopMessage: PropTypes.bool,
};

export default EmailLink;
