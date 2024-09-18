import React from 'react'
import { Card,Button } from 'react-bootstrap';
// import { Card, CardContent, Typography } from '@mui/material';
import butterfly1 from"../images/butterfly1.jfif"
import butterfly2 from"../images/butterfly2.jfif"
import butterfly3 from"../images/butterfly3.jfif"
import butterfly4 from"../images/butterfly4.jfif"
import './home.css'
export default function home() {
  return (
    <div className='cards'>
        
        <Card className='card' style={{  }}>
      <Card.Img className='cardimg' variant="top" src={butterfly1}/>
      <Card.Body>
        <Card.Title>BUTTERFLY</Card.Title>
        <Card.Text>
          <Button className='button'>View more</Button>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='card' style={{  }}>
      <Card.Img className='cardimg' variant="top" src={butterfly2}/>
      <Card.Body>
        <Card.Title>BUTTERFLY</Card.Title>
        <Card.Text>
          <Button className='button'>View more</Button>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='card' style={{  }}>
      <Card.Img className='cardimg' variant="top" src={butterfly3}/>
      <Card.Body>
        <Card.Title>BUTTERFLY</Card.Title>
        <Card.Text>
          <Button className='button' >View more</Button>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='card' style={{  }}>
      <Card.Img className='cardimg' variant="top" src={butterfly4}/>
      <Card.Body>
        <Card.Title>BUTTERFLY</Card.Title>
        <Card.Text>
          <Button className='button'>View more</Button>
        </Card.Text>
      </Card.Body>
    </Card>
    
    <Card className='card' style={{  }}>
      <Card.Img className='cardimg' variant="top" src={butterfly4}/>
      <Card.Body>
        <Card.Title>BUTTERFLY</Card.Title>
        <Card.Text>
          <Button className='button'>View more</Button>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='card' style={{  }}>
      <Card.Img className='cardimg' variant="top" src={butterfly4}/>
      <Card.Body>
        <Card.Title>BUTTERFLY</Card.Title>
        <Card.Text>
          <Button className='button'>View more</Button>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='card' style={{  }}>
      <Card.Img className='cardimg' variant="top" src={butterfly4}/>
      <Card.Body>
        <Card.Title>BUTTERFLY</Card.Title>
        <Card.Text>
          <Button className='button'>View more</Button>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='card' style={{  }}>
      <Card.Img className='cardimg' variant="top" src={butterfly4}/>
      <Card.Body>
        <Card.Title>BUTTERFLY</Card.Title>
        <Card.Text>
          <Button className='button'>View more</Button>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}
