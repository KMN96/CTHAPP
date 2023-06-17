import React from 'react';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { searchHistoryAtom } from '@/store';
import { removeFromHistory } from '@/lib/userData';
import styles from '../styles/History.module.css';

const History = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null;

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };


  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  return (
    <div className="container mt-4">
      {parsedHistory.length === 0 && (
        <Card>
          <Card.Body>
            <Card.Title>No search history</Card.Title>
            <Card.Text>Try searching for some artwork</Card.Text>
          </Card.Body>
        </Card>
      )}
      {parsedHistory.length > 0 && (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <React.Fragment key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </React.Fragment>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default History;
