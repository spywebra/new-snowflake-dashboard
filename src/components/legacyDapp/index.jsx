/**
 * Displays a legacy dapp in a modal
 * NOTE: Legacy - Legacy dapps were created based on the previous front-end
 * The goal is now to move dapps from the front-end to their own website
 * Meanwhile, legacy dapps are still hosted here
 */

import React, {
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import SnowflakeContext from '../../contexts/snowflakeContext';

import {
  Status,
} from '../../legacy/Mainnet/0xc8697fDA750DE0d9eFb5782bBd620E7128CD09Cd/index';


function LegacyDapp(props) {
  const user = useContext(SnowflakeContext);

  const {
    ein,
  } = user;

  const {
    id,
    title,
    isOpen,
    toggle,
  } = props;

  function displayDapp() {
 
    return <Status ein={ein} />;
  }

  if (ein) {
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          {title}
        </ModalHeader>
        <ModalBody>
          {displayDapp()}
        </ModalBody>
      </Modal>
    );
  }

  return null;
}

LegacyDapp.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default LegacyDapp;
