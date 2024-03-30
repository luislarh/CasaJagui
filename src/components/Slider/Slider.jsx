import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

function Slider() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "sliders"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setImages(list);
    }, (error) => {
      console.log(error);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
          <img
            className='d-block'
            width="100%"
            height="550px"
            src={image.img} // Suponiendo que la URL de la imagen está almacenada en la propiedad 'img'
            alt={image.name} // Suponiendo que el nombre de la imagen está almacenado en la propiedad 'name'
          />
          <Carousel.Caption>
            <h3>{image.name}</h3>
            <p>Descripción de la imagen</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}


export default Slider;
