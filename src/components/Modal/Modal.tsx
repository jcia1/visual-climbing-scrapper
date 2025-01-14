import React, { ReactElement } from 'react';
import './Modal.css'
import { ZodValidableForm } from '../Form/Zod/ZodValidableForm';

interface Props {
  
  closeModal : (close:number) =>  void
  signInForm : ReactElement

}

function Modal({ closeModal, signInForm}:Props) {
  return (
    <div className="modal">
      <div className='centered-modal'>
      <div className='modal-header'>
        <span className="close" onClick={() => closeModal(0)}>×</span>
          <h3>Sign in</h3>
      </div>
      <div className="modal-content">
          {signInForm}      
        </div>
        </div>
    </div>
  );
}

export default Modal;  
