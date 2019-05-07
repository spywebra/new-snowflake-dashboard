import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  PopoverBody,
} from 'reactstrap';

function Tooltip(props) {
  const {
    isOpen,
    toggle,
    content,
    target,
  } = props;

  return (
    <Popover
      className="on-top"
      target={target}
      trigger="hover"
      placement="top"
      isOpen={isOpen}
      toggle={toggle}
    >
      <PopoverBody>
        {content}
      </PopoverBody>
    </Popover>
  );
}

Tooltip.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Tooltip;