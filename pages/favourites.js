import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "../components/ArtworkCard";

const Favourites = () => {
  const [favouritesList] = useAtom(favouritesAtom);

  if(!favouritesList) return null;

  return (
    <div className="container my-4">
      <h2 className="mb-4">My Art Favourites</h2>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <h4>Nothing Here</h4>
          Try adding some new artwork to the list.
        </Card>
      )}
    </div>
  );
};

export default Favourites;
