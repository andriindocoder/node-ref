import React from 'react';
import {Container, Row} from 'reactstrap';
import Header from './Components/Header';
import LiveVisitors from './Components/LiveVisitors';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Row>
          <LiveVisitors />
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
