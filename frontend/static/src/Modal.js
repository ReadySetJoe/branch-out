import React from 'react';
import './Modal.css'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class UserModal extends React.Component {

  render() {
    let branches = this.props.branches.map((branch, id) =>
    <div key={id}>
      {id}
    </div>)

    // console.log(this.props.branches)
    return (
      <>
        <Modal className="main" show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              {branches}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.props.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );  
  }
}

export default UserModal