function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="m-auto mt-4 mb-4 w-4/5">
      <p className="text-center text-lg p-4 bg-base-300 text-neutral-content rounded-box">
        There was an error. {error}
      </p>
    </div>
  );
}

export default ErrorMessage;
