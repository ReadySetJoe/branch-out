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

    // Reassociate limbs with their branches
    let branches = [...this.props.branches]
    branches.forEach(branch => { branch.limbs = [] });

    for (let i = 0; i < this.props.limbs.length; i++) {
      let l = this.props.limbs[i];
      for (let j = 0; j < branches.length; j++) {
        if (l.branch.id === branches[j].id) {
          branches[j].limbs.push(l)
        }
      }
    }
    // console.log(this.props.limbs)
    // console.log(branches)

    branches = branches.map((branch, id) =>
      <Card key={id} className="m-2">
        {branch.cover ? (
          <div className="branch-img" style={{ backgroundImage: 'url(' + branch.cover + ')' }} />
        ) : (
            <FontAwesomeIcon icon={faPagelines} className='default-branch-svg fa-7x' />
          )}
        <Card.Body>
          <Card.Title>{branch.title}</Card.Title>
        </Card.Body>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            {branch.limbs.map((limb, id) =>
              <ListGroupItem key={id} className="limb p-0 d-flex justify-content-between align-text-center">
                {/* <div className=""> */}
                  {/* <div>{id + 1}</div> */}
                  <div className="text-left"><a href={limb.song_url}>{limb.artist_name}</a></div>
                  <div className="text-right"><a target="_blank" rel="noopener noreferrer" href={limb.event_uri}>{limb.venue_name}</a></div>
                  <button className="btn-delete" onClick={() => {this.props.handleLimbDelete(limb)}}>x</button>
                {/* </div> */}
              </ListGroupItem>
            )}
          </ListGroup>
        </Card.Body>
        <Card.Body>
          <Button>Export</Button>
          <Button onClick={() => this.props.handleBranchDelete(branch)}>Delete</Button>
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