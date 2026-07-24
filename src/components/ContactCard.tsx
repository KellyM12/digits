'use client';

import { Card, Image } from 'react-bootstrap';

interface ContactProps {
  contact: {
    //id: number;
    firstName: string;
    lastName: string;
    address: string;
    description: string;
    image: string;
  };
}

export default function ContactCard({ contact }: ContactProps) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-transparent border-0 pt-3 text-center">
        <Image 
          src={contact.image} 
          alt={`${contact.firstName} ${contact.lastName}`} 
          width={75} 
          height={75} 
          roundedCircle 
        />
      </Card.Header>
      <Card.Body className="d-flex flex-column text-center">
        <Card.Title className="fw-bold">
          {contact.firstName} {contact.lastName}
        </Card.Title>
        <Card.Subtitle className="mb-3 text-muted small">
          {contact.address}
        </Card.Subtitle>
        <Card.Text className="text-secondary small flex-grow-1">
          {contact.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}