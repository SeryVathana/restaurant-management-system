import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";

function TestPage() {
  const postition = { lat: 22.54992, lng: 0 };
  return (
    <div>
      {" "}
      <APIProvider apiKey={"AIzaSyAgpJW3GHyLvXjpVdEL_pbjYlJCcvz5Q5g"}>
        <Map style={{ width: "100vw", height: "100vh" }} defaultCenter={postition} defaultZoom={3} gestureHandling={"greedy"} disableDefaultUI={true}>
          <AdvancedMarker position={postition}></AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
}

export default TestPage;
