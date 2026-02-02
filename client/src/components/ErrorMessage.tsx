function ErrorMessage({ error }) {
  return (
    <div className="m-auto w-2/3">
      <p className="text-center text-lg p-2 mt-4 border">
        There was an error. <strong>{error}</strong>
      </p>
    </div>
  );
}

export default ErrorMessage;
