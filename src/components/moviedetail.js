import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {saveReview} from "../actions/movieActions";
import {connect} from 'react-redux';
import {Button, Card, Dropdown, DropdownButton, Form, ListGroup, ListGroupItem} from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.title));
        }
    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageURL} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actorName}</b> {actor.characterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.rating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.reviewer}</b>&nbsp; {review.review}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}
                    </Card.Body>

                    <Card.Body>
                        <Form.Group controlId="reviewer">
                            <Form.Label>Reviewer Name</Form.Label>
                            <Form.Control type="reviewer" placeholder="Enter reviewer name" />
                        </Form.Group>
                        <Form.Group controlId="quote">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control type="quote" placeholder="Enter comment" />
                        </Form.Group>

                        <div id="container">
                            <div id="1" className="star">1</div>
                            <div id="2" className="star">2</div>
                            <div id="3" className="star">3</div>
                            <div id="4" className="star">4</div>
                            <div id="5" className="star">5</div>
                        </div>

                        <div>
                            <Form.Label>              </Form.Label>
                        </div>
                        <Button onClick={saveReview}>Save Review</Button>
                    </Card.Body>

                </Card>
            )
        }

        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

