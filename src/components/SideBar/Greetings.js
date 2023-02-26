import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const messages = [
  'Hi.',
  'Hello.',
  'Hola.',
  'Good morning.',
  'Or afternoon.',
  'Or evening.',
  'Or maybe night.',
  'Whatever time of day,',
  'Enjoy looking at my site.',
  'Thanks for stopping by,',
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
    };
  }, [delay]);
};

const Greetings = ({ loopMessage }) => {
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
    <span>{message} I am glad you&apos;re here!<br /></span>
  );
};

Greetings.defaultProps = {
  loopMessage: false,
};

Greetings.propTypes = {
  loopMessage: PropTypes.bool,
};

export default Greetings;
