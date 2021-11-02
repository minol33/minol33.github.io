import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';

  function Jumbotron() {
    return (
      <div className="jumbotron">
        <h1>20% Season Off</h1>
        <p>this is a simple hero unit, a simple jumbotron</p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </div>
    )
  }