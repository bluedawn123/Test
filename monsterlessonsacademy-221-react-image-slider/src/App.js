import ImageSlider from "./ImageSlider";
const App = () => {
  const slides = [
    { url: "http://localhost:3001/image-1.jpg", title: "beach" },
    { url: "http://localhost:3001/image-2.jpg", title: "boat" },
    { url: "http://localhost:3001/image-3.jpg", title: "forest" },
    { url: "http://localhost:3001/image-4.jpg", title: "city" },
    { url: "http://localhost:3001/image-5.jpg", title: "italy" },
  ];
  const containerStyles = {
    width: "600px",
    height: "400px",
    margin: "0 auto",
    background : "aqua",
  };
  return (
    <div>
      <h1>Hello monsterlessons</h1>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default App;
