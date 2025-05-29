import { useNavigate } from 'react-router-dom';

function Modal({ children }) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..');
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-50"
        onClick={closeHandler}
      />
      <dialog
        open
        className="z-50 border-none rounded-md shadow-lg p-0 overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
      >
        {children}
      </dialog>
    </>
  );
}

export default Modal;
