// src/components/BaseballForm.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './BaseballForm.css';
import baseballImage from './baseball.png';
import snellImage from './blake_snell.png';

const BaseballForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    pitchCount: '',
    inningCount: '',
    outsInInning: '',
    base1: 'No',
    confidence: '3',
    fragility: '3',
    base2: 'No',
    base3: 'No',
    hitterNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const baserunner = `${formData.base1 === 'Occupied' ? '1' : '0'}${formData.base2 === 'Occupied' ? '1' : '0'}${formData.base3 === 'Occupied' ? '1' : '0'}`;
    const formDataWithBaserunner = {
      ...formData,
      baserunner
    };
    onSubmit(formDataWithBaserunner);
  };

  return (
    <Container className="baseball-form-container">
      <h1 className="form-title">
        Snell Tool
        <img src={baseballImage} alt="Baseball" className="baseball-image" />
      </h1>
      <Form.Label className='app-Desc'>
      Providing recommendations for when to pull a starting pitcher based on situational and qualitative factors.  
      </Form.Label>
      
      <Form onSubmit={handleSubmit} className="mt-4">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPitchCount">
            <Form.Label className="form-label">Pitches Thrown</Form.Label>
            <Form.Control
              type="number"
              name="pitchCount"
              value={formData.pitchCount}
              onChange={handleChange}
              placeholder="Enter pitches thrown"
              className="form-control"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formInningCount">
            <Form.Label className="form-label">Pitches in Inning</Form.Label>
            <Form.Control
              type="number"
              name="inningCount"
              value={formData.inningCount}
              onChange={handleChange}
              placeholder="Enter pitches in inning"
              className="form-control"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formOutsInInning">
            <Form.Label className="form-label">Outs in Inning</Form.Label>
            <Form.Control
              type="number"
              name="outsInInning"
              value={formData.outsInInning}
              onChange={handleChange}
              placeholder="Enter number of outs in inning"
              className="form-control"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBase1">
            <Form.Label className="form-label">Base 1</Form.Label>
            <Form.Control
              as="select"
              name="base1"
              value={formData.base1}
              onChange={handleChange}
              className="form-control"
            >
              <option>Unoccupied</option>
              <option>Occupied</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formBase2">
            <Form.Label className="form-label">Base 2</Form.Label>
            <Form.Control
              as="select"
              name="base2"
              value={formData.base2}
              onChange={handleChange}
              className="form-control"
            >
              <option>Unoccupied</option>
              <option>Occupied</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formBase3">
            <Form.Label className="form-label">Base 3</Form.Label>
            <Form.Control
              as="select"
              name="base3"
              value={formData.base3}
              onChange={handleChange}
              className="form-control"
            >
              <option>Unoccupied</option>
              <option>Occupied</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formHitterNumber">
            <Form.Label className="form-label">Hitter Number</Form.Label>
            <Form.Control
              type="number"
              name="hitterNumber"
              value={formData.hitterNumber}
              onChange={handleChange}
              placeholder="Enter current position in the batting order (1-9)"
              className="form-control"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formConfidence">
            <Form.Label className="form-label">Pitcher Confidence</Form.Label>
            <Form.Label className='form-confidence'>
            How confident the staff is in the pitcher - based off of recent form, how the pitcher is currently pitching, and the situation of the team’s relief pitching
          </Form.Label>
            <Form.Control
              as="select"
              name="confidence"
              value={formData.confidence}
              onChange={handleChange}
              className="form-control"
            >
              <option value="1">1 - Extremely Unconfident</option>
              <option value="2">2 - Relativly Unconfident</option>
              <option value="3">3 - Neutral</option>
              <option value="4">4 - Relativly Confident </option>
              <option value="5">5 - Extremely Confident</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formFragility">
            <Form.Label className="form-label">Pitcher Fragility</Form.Label>
            <Form.Label className="form-confidence">
              How worried the staff is about the pitcher’s health - based on expected durability, past injuries suffered, and how concerned the staff is with preserving the pitcher’s health
            </Form.Label>
            <Form.Control
              as="select"
              name="fragility"
              value={formData.fragility}
              onChange={handleChange}
              className="form-control"
            >
              <option value="1">1 - Extremely Healthy</option>
              <option value="2">2 - Relativly Healthy</option>
              <option value="3">3 - Neutral</option>
              <option value="4">4 - Relativly Fragile</option>
              <option value="5">5 - Very Fragile</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit" className="w-100 submit-button">
          Submit
        </Button>
        <img src={snellImage} alt="Snell" className="snell-image"/>
        <p className="names">2024 SMT Data Challenge</p>
        <Form.Label className='submitting'>*After submitting, scroll to view results*</Form.Label>
      </Form>
    </Container>
  );
};

export default BaseballForm;
