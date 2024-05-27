import React from 'react'

const Modal = ({closeModal,children,modal_id}) => {
  return (
    <dialog id={modal_id} className="modal">
    <div className="modal-box">
        <form method="dialog">
            {/* if there is a button in the form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
            </button>
        </form>
        {children}
    </div>
</dialog>
  )
}

export default Modal