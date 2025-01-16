import React, { ReactElement } from 'react';
import './Modal.css'
import { ZodValidableForm } from '../Form/Zod/ZodValidableForm';

interface Props {
  
  title: string
  closeModal : (close:number) =>  void
  signInForm : ReactElement

}

function Modal({ title, closeModal, signInForm}:Props) {
  return (
    <div className="modal">
      <div className='centered-modal'>
      <div className='modal-header'>
        <span className="close" onClick={() => closeModal(0)}>×</span>
          <h3>{title}</h3>
      </div>
      <div className="modal-content">
          {signInForm}      
        </div>
        </div>
    </div>
  );
}

export default Modal;  
