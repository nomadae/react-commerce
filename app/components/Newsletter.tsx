import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export function Newsletter() {
  return (
    <Container fluid className="bg-primary text-white py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <h3 className="fw-bold mb-3">¡No te pierdas nuestras ofertas!</h3>
            <p className="mb-4">
              Suscríbete y recibe las mejores promociones directamente en tu correo
            </p>
            <Form className="d-flex flex-column flex-sm-row gap-2">
              <Form.Control
                type="email"
                placeholder="Tu correo electrónico"
                size="lg"
                className="flex-grow-1"
              />
              <Button variant="light" size="lg" type="submit" className="btn-ripple">
                Suscribirme
              </Button>
            </Form>
            <Form.Text className="text-white-50 mt-3 d-block">
              Al suscribirte aceptas nuestra política de privacidad
            </Form.Text>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
