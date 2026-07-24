import getServerSession from 'next-auth';
import { Container, Row, Col } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import ContactCard from '@/components/ContactCard';
import { loggedInProtectedPage } from '@/lib/page-protection';

export default async function ListContactsPage() {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session as any);
  const owner = (session as any)?.user?.email || '';
  const contacts = await prisma.contact.findMany({
  where: {
    owner: owner,
  },
});

  return (
    <main>
      <Container className="py-3">
        <h2 className="text-center py-3 text-white">List Contacts</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={`Contact-${contact.id}`}>
              <ContactCard contact={contact} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}