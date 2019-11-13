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
          <Card.Title><h3 className="m-0">{branch.title}</h3></Card.Title>
        </Card.Body>
        <Card.Body className="py-0">
          <ListGroup className="list-group-flush">
            <ListGroupItem className="limb p-0 d-flex justify-content-between">
              <div className="text-left font-weight-bolder">Artist</div>
              <div className="text-right font-weight-bolder">Venue/Tickets</div>
            </ListGroupItem>
            {branch.limbs.length === 0 ? (<h5>No branch limbs found :( Either this branch has no limbs, and can be deleted, or try reloading the page to see the newest entries!</h5>) : (
              branch.limbs.map((limb, id) =>
                <ListGroupItem key={id} className="limb p-0 d-flex justify-content-between align-text-center">
                  {/* <div className=""> */}
                  {/* <div>{id + 1}</div> */}
                  <div className="text-left"><a href={limb.song_url}>{limb.artist_name}</a></div>
                  <div className="text-right"><a target="_blank" rel="noopener noreferrer" href={limb.event_uri}>{limb.venue_name}</a></div>
                  <button className="btn-delete" onClick={() => { this.props.handleLimbDelete(limb); }}>x</button>
                  {/* </div> */}
                </ListGroupItem>
              )
            )}
          </ListGroup>
        </Card.Body>
        {/* <Card.Body> */}
        <Button className="mt-0 mb-2 mx-auto" onClick={() => this.props.handleBranchDelete(branch)}>Delete Branch</Button>
        {/* </Card.Body> */}

      </Card>)

    // console.log(this.props.branches)
    return (
      <Modal className="main" size="lg" show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${this.props.first_name}'s`} Branches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap align-items-baseline justify-content-around">
            {(branches.length !== 0) ? (branches) : <h3>No branches found!</h3>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UserModal