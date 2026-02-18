import { useAuthState } from '../contexts';

function LoadingMessage() {
  const { isWakingUp } = useAuthState();

  return (
    <>
      <div className="flex-1 mt-10 flex flex-col items-center gap-4">
        <div>
          <span className="loading loading-spinner loading-xl p-4 m-4"></span>
        </div>
        <div>{isWakingUp && <p>Waking up the server...</p>}</div>
      </div>
    </>
  );
}

export default LoadingMessage;
