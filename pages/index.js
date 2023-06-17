/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name:Kayden Nguyen Student ID: 122582208 Date: 04/02/2023
*
*  Vercel App (Deployed) Link: https://web-422-a6-tan.vercel.app/
*
********************************************************************************/ 


import { Container, Row, Col, Image } from 'react-bootstrap';

export default function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <p>The Metropolitan Museum of Art of New York City, colloquially "the Met", is the largest art museum in the United States. With 7.06 million visitors to its three locations in 2016, it was the third most visited art museum in the world. Its permanent collection contains over two million works, divided among seventeen curatorial departments. The main building, on the eastern edge of Central Park along Museum Mile in Manhattan's Upper East Side is by area one of the world's largest art galleries. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.</p>
        </Col>
        <Col md={6}>
          <p>The Metropolitan Museum of Art was founded in 1870 for the purposes of opening a museum to exhibit and maintain art works and encouraging the study of the fine arts. It is the largest museum in the Western Hemisphere, and the world's second largest art museum in terms of gallery space. Its permanent collection contains over two million works, divided among seventeen curatorial departments. The main building, on the eastern edge of Central Park along Museum Mile in Manhattan's Upper East Side is by area one of the world's largest art galleries. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Learn more about the Metropolitan Museum of Art on Wikipedia</a>
        </Col>
      </Row>
    </Container>
  );
};

