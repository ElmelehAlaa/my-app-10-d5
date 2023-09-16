import { useState } from "react";
import { Col, Container, Row, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainSearch = (props) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" + query + "&limit=10&appid=a774c54ac0b76058b4e70c27466aa218"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCities(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      fluid
      style={{ backgroundImage: "url(https://images6.alphacoders.com/846/846724.jpg)", height: "100vh" }}
    >
      <Row>
        <h1 style={{ fontSize: "60px", fontWeight: "700" }} className="text-white text-center py-5 ">
          Meteo
        </h1>
        <Col xs="12">
          <Form onSubmit={handleSubmit}>
            <Form.Control type="search" value={query} onChange={handleChange} placeholder="type and press Enter" />
          </Form>
        </Col>
        {cities.length > 0 ? (
          cities.map((city, i) => (
            <Col xs={"12"} key={i}>
              <ListGroup>
                <ListGroup.Item>
                  <Link to={`/${city.lat}/${city.lon}`}>{city.name}</Link>
                  {city.state}, {city.country}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          ))
        ) : (
          <h3 className="text-white">Cerca la citta'</h3>
        )}
      </Row>
    </Container>
  );
};

export default MainSearch;
