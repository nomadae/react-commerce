interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <h2 className="text-lg font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-600 mb-4">{message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
