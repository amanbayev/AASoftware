import React, { Component } from 'react';

import { Grid, Button, Image } from 'semantic-ui-react';

const teeth = [
  '/top_tooth1.png',
  '/top_tooth2.png',
  '/top_tooth3.png',
  '/top_tooth4.png',
  '/top_tooth5.png',
  '/top_tooth6.png',
  '/top_tooth7.png',
  '/top_tooth8.png',

  '/right_top_tooth8.png',
  '/right_top_tooth7.png',
  '/right_top_tooth6.png',
  '/right_top_tooth5.png',
  '/right_top_tooth4.png',
  '/right_top_tooth3.png',
  '/right_top_tooth2.png',
  '/right_top_tooth1.png',

  '/left_tooth8.png',
  '/left_tooth7.png',
  '/left_tooth6.png',
  '/left_tooth5.png',
  '/left_tooth4.png',
  '/left_tooth3.png',
  '/left_tooth2.png',
  '/left_tooth1.png',

  '/tooth1.png',
  '/tooth2.png',
  '/tooth3.png',
  '/tooth4.png',
  '/tooth5.png',
  '/tooth6.png',
  '/tooth7.png',
  '/tooth8.png',
];

const posNumbers = [
  18,
  17,
  16,
  15,
  14,
  13,
  12,
  11,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  48,
  47,
  46,
  45,
  44,
  43,
  42,
  41,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
];

class ToothInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let bottom;
    let top;
    if (this.props.position < 16) bottom = 0;
    else top = 0;

    let teethRow = (
      <Grid.Row
        style={{
          height: '112px',
          width: '24px',
          position: 'relative',
        }}
      >
        <Image
          style={{
            bottom,
            top,
            left: 0,
            position: 'absolute',
          }}
          src={teeth[this.props.position]}
        />
      </Grid.Row>
    );

    let numbersRow = (
      <Grid.Row
        style={{
          paddingTop: '8px',
          paddingBottom: '8px',
        }}
      >
        <center>
          <h5>{posNumbers[this.props.position]}</h5>
        </center>
      </Grid.Row>
    );

    if (this.props.position < 16) {
      return (
        <Button color="red" style={{ padding: '8px' }}>
          <Grid.Column>
            {teethRow}
            {numbersRow}
          </Grid.Column>
        </Button>
      );
    } else {
      return (
        <Button basic style={{ padding: '8px' }}>
          <Grid.Column>
            {numbersRow}
            {teethRow}
          </Grid.Column>
        </Button>
      );
    }
  }
}

export default ToothInfo;
