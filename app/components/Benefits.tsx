import { Container, Row, Col } from 'react-bootstrap';
import { Truck, Shield, ArrowRepeat, Headset } from 'react-bootstrap-icons';

export function Benefits() {
  return (
    <Container className="py-5">
      <Row xs={1} md={2} lg={4} className="g-4">
        <Col>
          <div className="text-center">
            <Truck size={48} className="text-primary mb-3" />
            <h5 className="fw-bold">Envío Gratis</h5>
            <p className="text-muted">En compras sobre $50.000</p>
          </div>
        </Col>
        <Col>
          <div className="text-center">
            <Shield size={48} className="text-primary mb-3" />
            <h5 className="fw-bold">Pago Seguro</h5>
            <p className="text-muted">Tus datos protegidos</p>
          </div>
        </Col>
        <Col>
          <div className="text-center">
            <ArrowRepeat size={48} className="text-primary mb-3" />
            <h5 className="fw-bold">30 Días de Cambio</h5>
            <p className="text-muted">Devolución sin costo</p>
          </div>
        </Col>
        <Col>
          <div className="text-center">
            <Headset size={48} className="text-primary mb-3" />
            <h5 className="fw-bold">Soporte 24/7</h5>
            <p className="text-muted">Ayuda en línea siempre</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
