import { ErrorMessage } from '../components';

function ErrorPage() {
  return (
    <>
      <div className="m-auto">
        <ErrorMessage error={'Page not found.'} />
      </div>
    </>
  );
}

export default ErrorPage;
