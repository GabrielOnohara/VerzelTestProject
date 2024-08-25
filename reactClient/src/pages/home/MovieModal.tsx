import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const MovieModal = ({ showModal, changeModal }) => {
  return (
    <Modal
      show={showModal}
      onHide={() => changeModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => changeModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

MovieModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  changeModal: PropTypes.func.isRequired,
};

export default MovieModal;
