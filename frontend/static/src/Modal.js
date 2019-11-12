import React from 'react';
import './Modal.css'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';

// import pagelines_brands from './pagelines-brands.svg';


class UserModal extends React.Component {
  render() {
    let branches = this.props.branches.map((branch, id) =>
      <Card key={id} className="m-2">
        {branch.cover ? (
          <div className="branch-img" style={{backgroundImage: 'url(' + branch.cover + ')'}} />
        ) : (
          <FontAwesomeIcon icon={faPagelines} className='default-branch-svg fa-7x' />
        )}
        <Card.Body>
          <Card.Title>{branch.title}</Card.Title>
        </Card.Body>
        <Card.Body className="">
          <Button>Export</Button>
          <Button onClick={() => this.props.handleBranchDelete(branch)}>Delete</Button>
        </Card.Body>
        <Card.Body className="">
        {/* <ListGroup className="list-group-flush">
          <ListGroupItem>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup> */}

        </Card.Body>
      </Card>)

    // console.log(this.props.branches)
    return (
      <Modal className="main" size="lg" show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${this.props.first_name}'s`} Branches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap">
            {(branches.length !== 0) ? (branches) : <h3>No branches found!</h3>}
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
    );
  }
}

export default UserModal