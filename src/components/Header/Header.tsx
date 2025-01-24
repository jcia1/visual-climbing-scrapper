import React, { ReactElement, useEffect, useState } from 'react';
import './Header.css'; 
import Modal from '../Modal/Modal';
import { refInHeader } from '../../types';
import { LogInForm } from '../Form/Zod/LogIn/LogInForm';
import { SignInForm } from '../Form/Zod/SignIn/SignInForm';

interface Props {

  title : string,
  refs : refInHeader,
}

type keyToForm = {
  key: number,
  form: ReactElement
}

const formIndex: keyToForm []  = 
[
  {key:1, form: <SignInForm/>},
  {key:2, form: <LogInForm/>}
]

export const Header = ({title,refs}: Props) => {

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
            <li key = {0} className="first-item"><a>{title}</a></li>
            {
              refs.map((ref,index) => <li key={index+1} className="nav-item">< a href={"#home"+index} onClick={(e) => 
                {
                  e.preventDefault();
                  setRender(index);
                }}>{ref.modalTitle}</a>{ref.isModalOpen && 
                <Modal title = {ref.modalTitle} signInForm = {
                  formIndex.find(formToKey => formToKey.key === ref.key).form
                }
                closeModal={() => setRender(index)}/>}</li>)
            }
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
