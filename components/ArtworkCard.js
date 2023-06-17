import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import Router from 'next/router';

const ArtworkCard = ({ objectID }) => {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) 
  {
    return <Error statusCode={404} />;
  }

  if (!data) 
  {
    return null;
  }

  const { title, objectDate, classification, medium, primaryImageSmall } = data;

  return (
    <Card style={{ width: '17rem' }}>
      {primaryImageSmall ? (
        <Card.Img variant="top" src={primaryImageSmall} />
      ) : (
        <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]" />
      )}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          <div>Object Date: {objectDate || 'N/A'}</div>
          <div>Classification: {classification || 'N/A'}</div>
          <div>Medium: {medium || 'N/A'}</div>
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
        <Button as="a" variant="success" onClick={() => Router.push(`/artwork/${objectID}`)}>
            ID: ({objectID})
        </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;
