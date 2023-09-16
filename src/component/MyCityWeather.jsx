import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const MyCityWeather = (props) => {
  const params = useParams();
  const [weather, setWeather] = useState(null);
  const [foreCast, setForeCast] = useState(null);
  const sliceParamsLat = params.citylanlon.slice(0, 10);
  console.log(sliceParamsLat);
  const sliceParamsLon = params.citylanlon.slice(11, 21);
  console.log(sliceParamsLon);
  const getWeather = async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          sliceParamsLat +
          "&lon=" +
          sliceParamsLon +
          "&appid=a774c54ac0b76058b4e70c27466aa218"
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        console.log(data);
      } else {
        alert("Error fetching Results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getForeCast = async () => {
    try {
      const responseForeCast = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          sliceParamsLat +
          "&lon=" +
          sliceParamsLon +
          "&appid=a774c54ac0b76058b4e70c27466aa218"
      );
      if (responseForeCast.ok) {
        const foreCast = await responseForeCast.json();
        setForeCast(foreCast);
        console.log(foreCast);
      } else {
        alert("Error fetching Results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
    getForeCast();
  }, []);

  return (
    <Container
      fluid
      className=" m-0 py-5"
      style={{
        backgroundImage: "url(https://images6.alphacoders.com/846/846724.jpg)",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Row>
        {weather !== null ? (
          <>
            <Col xs={"12"}>
              <h3 className="text-center text-white " style={{ fontSize: "40px" }}>
                {weather.name}
              </h3>
            </Col>
            <Col xs={"12"}>
              <h1
                className="text-center m-0 text-white "
                style={{ fontSize: "140px", paddingLeft: "10px", fontWeight: "300" }}
              >
                {(weather.main.temp - 273).toFixed()}°
              </h1>
            </Col>
            <Col xs={"12"}>
              <p className="text-center text-white  fs-2 m-0">{weather.weather[0].description}</p>
            </Col>
            <Col xs={"12"}>
              <p className="text-center text-white  fs-2">
                H:{(weather.main.temp_max - 273).toFixed()}° | L:{(weather.main.temp_min - 273).toFixed()}°
              </p>
            </Col>{" "}
          </>
        ) : (
          <div></div>
        )}
      </Row>
      <Row className="justify-content-between" style={{ background: "rgba(51, 170, 51, .1)", marginTop: "200px" }}>
        <Col xs={"10"} className="text-white m-auto">
          <div className="d-flex overflow-scroll p-4">
            {foreCast !== null ? (
              foreCast.list.map((list, i) => (
                <div
                  key={i}
                  className="text-center  "
                  style={{
                    marginInline: "20px",
                    border: " solid white 1px",
                    width: "100px",
                    height: "150px",
                    borderRadius: "50px",
                    padding: "15px",
                    backgroundColor: "rgb(141 134 134 / 50%)",
                  }}
                >
                  <p style={{ fontWeight: "600" }}>{list.dt_txt.slice(11, 16)}</p>
                  <div>
                    <img
                      src={`http://openweathermap.org/img/w/${list.weather[0].icon}.png`}
                      alt="weather-img
                  "
                    />
                  </div>
                  {/* <div>
                    <img src="http://openweathermap.org/img/w/02d.png" alt="weather-icon" />
                  </div> */}
                  <p style={{ fontWeight: "600", fontSize: "20px" }}>{(list.main.temp - 273).toFixed()}°</p>
                </div>
              ))
            ) : (
              <div>Non ci sono previsioni</div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default MyCityWeather;
