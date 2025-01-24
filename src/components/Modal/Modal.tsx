import React, { ReactElement } from 'react';
import './Modal.css';
import { useGlobalContext } from '../../context/global.context';

interface Props {
  
  title: string
  closeModal : (close:number) =>  void
  signInForm : ReactElement

}

function Modal({ title, closeModal, signInForm}:Props) {

  const {value} = useGlobalContext() 

  return (
    <div className="modal">
      <div className='centered-modal'>
      <div className='modal-header'>
        <span className="close" onClick={() => closeModal(0)}>×</span>
          <h3>{title}</h3>
      </div>
      <div className="modal-content">
          {value === "" ? signInForm : "Ya está usted logado: " + value}      
        </div>
        </div>
    </div>
  );
}

export default Modal;  
