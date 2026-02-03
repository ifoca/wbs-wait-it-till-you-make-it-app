function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="m-auto w-2/3">
      <p className="text-center text-lg p-2 mt-4 border capitalize">There was an error. {error}</p>
    </div>
  );
}

export default ErrorMessage;
