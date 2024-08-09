// src/App.js
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import BaseballForm from './components/BaseballForm';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    // Parse CSV file
    Papa.parse('/final_file_for_lev.csv', {
      download: true,
      header: true,
      complete: (result) => {
        console.log('Parsed CSV Data:', result.data);
        setData(result.data);
      }
    });
  }, []);

  const calculateDifficulty = (outsInInning, baserunner) => {
    let difficulty = 0;
    if (baserunner === '000' && outsInInning === '0') difficulty = 20.110;
    else if (baserunner === '000' && outsInInning === '1') difficulty = 10.731;
    else if (baserunner === '000' && outsInInning === '2') difficulty = 4.110;
    else if (baserunner === '100' && outsInInning === '0') difficulty = 36.544;
    else if (baserunner === '100' && outsInInning === '1') difficulty = 21.462;
    else if (baserunner === '100' && outsInInning === '2') difficulty = 8.661;
    else if (baserunner === '010' && outsInInning === '0') difficulty = 45.332;
    else if (baserunner === '010' && outsInInning === '1') difficulty = 28.180;
    else if (baserunner === '010' && outsInInning === '2') difficulty = 13.012;
    else if (baserunner === '001' && outsInInning === '0') difficulty = 53.739;
    else if (baserunner === '001' && outsInInning === '1') difficulty = 41.149;
    else if (baserunner === '001' && outsInInning === '2') difficulty = 15.927;
    else if (baserunner === '110' && outsInInning === '0') difficulty = 60.625;
    else if (baserunner === '110' && outsInInning === '1') difficulty = 38.107;
    else if (baserunner === '110' && outsInInning === '2') difficulty = 18.590;
    else if (baserunner === '101' && outsInInning === '0') difficulty = 74.060;
    else if (baserunner === '101' && outsInInning === '1') difficulty = 48.460;
    else if (baserunner === '101' && outsInInning === '2') difficulty = 21.124;
    else if (baserunner === '011' && outsInInning === '0') difficulty = 84.706;
    else if (baserunner === '011' && outsInInning === '1') difficulty = 58.724;
    else if (baserunner === '011' && outsInInning === '2') difficulty = 23.152;
    else if (baserunner === '111' && outsInInning === '0') difficulty = 100;
    else if (baserunner === '111' && outsInInning === '1') difficulty = 63.709;
    else if (baserunner === '111' && outsInInning === '2') difficulty = 32.404;
    return difficulty;
  };

  const calculateExpectedPitchesLeft = (pitchCount, inningCount, difficulty, hitterNumber, confidence, fragility) => {
    const coefficients = {
      pitchesInGame: -0.731067,
      pitchesInInning: -0.140858,
      difficulty: -0.062566,
      hitter1: 0.710064,
      hitter2: 1.183681,
      hitter4: 0.937051,
      hitter7: -1.788551,
      intercept: 73.102316,
    };

    const { pitchesInGame, pitchesInInning, difficulty: diffCoef, hitter1, hitter2, hitter4, hitter7, intercept } = coefficients;

    let xplg = intercept
      + pitchCount * pitchesInGame
      + inningCount * pitchesInInning
      + difficulty * diffCoef
      + (hitterNumber === 1 ? hitter1 : 0)
      + (hitterNumber === 2 ? hitter2 : 0)
      + (hitterNumber === 4 ? hitter4 : 0)
      + (hitterNumber === 7 ? hitter7 : 0);

    // Adjusting xplg based on confidence
    const conf = parseInt(confidence, 10);
    if (conf === 1) xplg -= 10;
    else if (conf === 2) xplg -= 5;
    else if (conf === 4) xplg += 5;
    else if (conf === 5) xplg += 10;

    // Adjusting xplg based on fragility
    const frag = parseInt(fragility, 10);
    if (frag === 1) xplg += 10;
    else if (frag === 2) xplg += 5;
    else if (frag === 4) xplg -= 5;
    else if (frag === 5) xplg -= 10;

    return xplg;
  };

  const calculateExpectedPitchesLeftInInning = (inningCount, difficulty, hitterNumber) => {
    const coefficients = {
      pitchesInInning: -0.490764,
      difficulty:0.144967,
      hitter1: 1.240506,
      intercept: 10.580229,
    };

    const { pitchesInInning, difficulty: diffCoef, hitter1, intercept } = coefficients;

    const xpli = intercept
      + inningCount * pitchesInInning
      + difficulty * diffCoef
      + (hitterNumber === 1 ? hitter1 : 0);

    return xpli;
  };

  const handleFormSubmit = (userInput) => {
    setSubmittedData(userInput);
    const { pitchCount, inningCount, outsInInning, hitterNumber, confidence, fragility} = userInput;
    const calculatedDifficulty = calculateDifficulty(outsInInning, userInput.baserunner);
    setDifficulty(calculatedDifficulty);

    const xplg = calculateExpectedPitchesLeft(pitchCount, inningCount, calculatedDifficulty, hitterNumber, confidence, fragility);
    const xpli = calculateExpectedPitchesLeftInInning(inningCount, calculatedDifficulty, hitterNumber);

    const difference = xplg - xpli;

    const newRecommendation = difference < 0 ? 'Recommendation: Pull the pitcher' : 'Recommendation: Keep the pitcher in';
    setRecommendation(newRecommendation);
  };

  return (
    <div className="App">
      <BaseballForm onSubmit={handleFormSubmit} />
      {submittedData && (
        <div className="submitted-data">
          <h3>Submitted Data:</h3>
          <p><strong>Pitches Thrown:</strong> {submittedData.pitchCount}</p>
          <p><strong>Pitches in Inning:</strong> {submittedData.inningCount}</p>
          <p><strong>Outs in Inning:</strong> {submittedData.outsInInning}</p>
          <p><strong>Baserunner Situation:</strong> {submittedData.baserunner}</p>
          <p><strong>Hitter Number:</strong> {submittedData.hitterNumber}</p>
          <p><strong>Pitcher Confidence:</strong> {submittedData.confidence}</p>
          <p><strong>Pitcher Fragility:</strong> {submittedData.fragility}</p>
        </div>
      )}
      {recommendation && (
        <div className="results">
          <h3>{recommendation}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
