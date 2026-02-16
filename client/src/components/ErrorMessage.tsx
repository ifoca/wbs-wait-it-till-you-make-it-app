function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="flex-1 m-auto mt-10 mb-4 w-4/5">
      <p className="text-center text-lg p-4 bg-base-300 text-neutral-content rounded-box">
        There was an error. {error}
      </p>
    </div>
  );
}

export default ErrorMessage;
