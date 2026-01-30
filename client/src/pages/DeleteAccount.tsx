const DeleteAccount = () => {
  /* TO DO: 
  - check if the user is already logged in
    - if not, redirect to homepage since they won't 
    be able to delete account if not logged in
  */
  return (
    <div className="p-4">
      <form className="flex flex-col gap-8 items-center m-4 p-4">
        <input
          id="confirmDelete"
          type="text"
          placeholder="Type DELETE to confirm"
          className="p-2 border"
          required
        ></input>
        <button className="btn p-4 bg-red-600 hover:bg-red-700 text-white" type="submit">
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
