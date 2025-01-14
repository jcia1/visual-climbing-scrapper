import React, { ReactElement, useEffect, useState } from 'react';
import './Header.css'; 
import Modal from '../Modal/Modal';
import { refInHeader } from '../../types';

interface Props {

  title : string,
  refs : refInHeader,
  signInForm: ReactElement
}

export const Header = ({title,refs,signInForm}: Props) => {

  const [render, setRender] =  useState<number>(undefined)

  useEffect (() => {

    if(render != undefined) {

        if(!refs[render].isModalOpen)

          refs[render].setIsModalOpen(true)
        else 
          refs[render].setIsModalOpen(false)

        setRender(undefined)
      }
    }, [render]
    
  )

  return (
    <header>
      <div>
        <nav>
          <ul className="nav-list">
            <li className="first-item"><a>{title}</a></li>
            {
              refs.map((ref,index) => <li className="nav-item">< a href="#home" onClick={(e) => 
                {
                  e.preventDefault();
                  setRender(index);
                }}>{ref.modalTitle}</a>{ref.isModalOpen && <Modal signInForm = {signInForm} closeModal={() => setRender(index)}/>}</li>)
            }
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
