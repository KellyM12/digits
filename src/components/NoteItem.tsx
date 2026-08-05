'use client';

import { Note } from '@prisma/client';
import { ListGroup } from 'react-bootstrap';

interface NoteProps {
  note: Note;
}

/* Renders a single Contact . See ContactCard.tsx. */
const NoteItem = ( { note } : NoteProps) => (
  <ListGroup.Item>
    <p className="fw-lighter">{note.createdAt.toLocaleDateString('en-US')}</p>
    <p>{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
