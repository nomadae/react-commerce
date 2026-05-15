import { Container, Alert, Button } from 'react-bootstrap';

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Container className="py-5">
      <Alert variant="danger" className="text-center">
        <Alert.Heading>Error</Alert.Heading>
        <p>{message}</p>
        <Button variant="outline-danger" onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      </Alert>
    </Container>
  );
}
