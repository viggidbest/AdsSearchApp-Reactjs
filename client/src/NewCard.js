import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
function NewCard({item},{key}) {
    let url = item.imageUrl
   url = url.replace(/(file\/d\/)/i,"uc?export=view&id=")
   url=url.replace(/\/view?.*/i,"")
  return (

    <Card style={{ width: '18rem' }}>
      <Card.Body>
      <Card.Img variant="top" src={url} style={{ maxWidth: '18rem', maxHeight:"10rem" ,objectFit:'contain'}}  />
        <Card.Title>{item.headline}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
        <Card.Text>
        {item.Primarytext}
        </Card.Text>
        <Button variant="primary">{item.CTA}</Button>
      </Card.Body>
      
    </Card>
    

  
  )
}

export default NewCard