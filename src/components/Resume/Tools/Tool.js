/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';

const Tool = ({ data, last }) => (
  <li className="tool-container">
    {(data.link
        && <a href={data.link} target="_blank" rel="noreferrer">
             <p className="tool-name">{data.toolName}</p>
           </a>)
      || (!data.link
        && <p className="tool-name">{data.toolName}</p>)}
    {!last && <div className="tool-dot"><p className="tool-name"> &#8226;</p></div>}
  </li>
);

Tool.propTypes = {
  data: PropTypes.shape({
    toolName: PropTypes.string.isRequired,
    link: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  }).isRequired,
  last: PropTypes.bool,
};

Tool.defaultProps = {
  last: false,
};

export default Tool;
