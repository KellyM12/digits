import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { Contact } from '@prisma/client';
import  ContactCardAdmin from '@/components/ContactCardAdmin';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const contacts: Contact[] = await prisma.contact.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>List Contacts Admin</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
              <Col key={contact.firstName + contact.lastName}>
                <ContactCardAdmin contact ={contact} />
              </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;