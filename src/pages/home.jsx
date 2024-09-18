import React from 'react';
import { Card, Button } from 'react-bootstrap';
import data from '../category.json';  // Import JSON data
import './home.css';
import { Link } from 'react-router-dom';
// Function to import all images from the 'images' folder
const importAll = (r) => {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

// Update the regex to match image file types you want to support
const images = importAll(require.context('../images', false, /\.(png|jpe?g|jfif)$/));

export default function Home() {
  return (
    <div className='cards'>
      {data.map((item, index) => (
        <Card key={index} className='card'>
          <Card.Img 
            className='cardimg' 
            variant="top" 
            src={images[item.img]} 
            alt={item.name}
          />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              <Link to={"/items"}><Button className='button'>View more</Button></Link>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
