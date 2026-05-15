import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/context/AuthContext';

export default function AuthCallback() {
  const { handleRedirectCallback, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      navigate('/cuenta', { replace: true });
      return;
    }

    handleRedirectCallback()
      .then(() => {
        navigate('/cuenta', { replace: true });
      })
      .catch(() => {
        navigate('/login?error=callback', { replace: true });
      });
  }, [isLoading, isAuthenticated, handleRedirectCallback, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500">Procesando autenticación...</p>
      </div>
    </div>
  );
}
