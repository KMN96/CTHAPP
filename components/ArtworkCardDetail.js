import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import React from 'react';


const ArtworkCardDetail = ({ objectID }) => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
  const [showAdded, setShowAdded] = useState(objectID ? favouritesList?.includes(objectID) : false);

  useEffect(() => {
    setShowAdded(objectID ? favouritesList?.includes(objectID) : false);
  }, [favouritesList, objectID]);

  const favouritesClicked = async () => 
  {
    if (showAdded) 
    {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } 
    else 
    {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };

  if (error) 
  {
    return <React.Error statusCode={404} />;
  }

  if (!data) 
  {
    return null;
  }

  const { title, artistDisplayName, creditLine, dimensions, medium, primaryImage, artistWikidata_URL } = data;

  return (
    <Card style={{ width: '50rem' }}>
      {primaryImage && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          <div>Medium: {medium || 'N/A'}</div>
          <br />
          <div>Artist: {artistDisplayName || 'N/A'}</div>
          {artistWikidata_URL && (
            <div>
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                wiki
              </a>
            </div>
          )}
          <div>Credit Line: {creditLine || 'N/A'}</div>
          <div>Dimensions: {dimensions || 'N/A'}</div>
          <br/>
          <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
