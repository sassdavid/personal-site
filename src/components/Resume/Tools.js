import React from 'react';
import PropTypes from 'prop-types';
import Tool from './Tools/Tool';

const getRows = (tools) => tools.sort((a, b) => {
  let ret = 0;
  if (a.toolName > b.toolName) ret = 1;
  else if (a.toolName < b.toolName) ret = -1;
  else if (a.link > b.link) ret = 1;
  else if (a.link < b.link) ret = -1;
  return ret;
}).map((tool, idx) => (
  <Tool data={tool}
        key={tool.toolName}
        last={idx === tools.length - 1} />
));

const Tools = ({ data }) => (
  <div className="tools">
    <div className="link-to" id="tools" />
    <div className="title">
      <h3>
        Throughout my career,
        I have leveraged a wide range of tools and technologies to help me succeed in my work.
      </h3>
    </div>
    <ul className="tool-list">
      {getRows(data)}
    </ul>
  </div>
);

Tools.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    toolName: PropTypes.string,
    link: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  })),
};

Tools.defaultProps = {
  data: [],
};

export default Tools;
