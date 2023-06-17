import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { Form, Button} from 'react-bootstrap';
import { searchHistoryAtom } from '@/store'
import { addToHistory } from '@/lib/userData';

const AdvancedSearch = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const onSubmit = async (data) => {
    let queryString = "searchBy=true";
    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }
    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }
    queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`;
    setSearchHistory(await addToHistory(queryString)) 
    router.push(`/artwork?${queryString}`);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
    <Form.Label htmlFor="q">Search Query:</Form.Label>
    <Form.Control type="text" placeholder="" {...register("q", { required: true })} className={errors.q ? "is-invalid" : ""} />
    {errors.q && <div className="invalid-feedback">This field is required</div>}
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label htmlFor="searchBy">Search By:</Form.Label>
        <Form.Control as="select" {...register("searchBy")}>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="description">Description</option>
        </Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label htmlFor="geoLocation">Geo Location:</Form.Label>
        <Form.Control type="text" placeholder="Enter location" {...register("geoLocation")} />
        <small className="text-muted"> Case Sensitive String</small>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label htmlFor="medium">Medium:</Form.Label>
        <Form.Control type="text" placeholder="Enter medium" {...register("medium")} />
        <small className="text-muted">Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator</small>
      </Form.Group>
      <Form.Group>
        <Form.Check type="checkbox" label="On View" {...register("isOnView")} />
      </Form.Group>
      <Form.Group>
        <Form.Check type="checkbox" label="Highlight" {...register("isHighlight")} />
      </Form.Group>
      <br />
      <Button variant="success" type="submit">Search</Button>
    </Form>
  );
};

export default AdvancedSearch;
