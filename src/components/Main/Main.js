import React from 'react';
import './Main.css';
import { Header } from "../Header/Header";
import { Promo } from '../Promo/Promo';
import { AboutProject } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { AboutMe } from '../AboutMe/AboutMe';
import { Portfolio } from '../Portfolio/Portfolio'
import { Footer } from "../Footer/Footer"
import { HeaderAuth } from '../HeaderAuth/HeaderAuth';


export function Main() {

  const jwt = localStorage.getItem("jwt");
  console.log("jwt", jwt)
  return (
    <div className='content'>
      {jwt ? <HeaderAuth/> : <Header/>}
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </div>
  )
}
