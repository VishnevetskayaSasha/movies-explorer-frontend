import React from "react";
import { useNavigate } from 'react-router-dom';
import "./NotFound.css";

export function NotFound () {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <p className="not-found__error">404</p>
      <p className="not-found__text">Страница не найдена</p>
      <button onClick={() => navigate(-1)} className="not-found__button">Назад</button>
    </section>
  )
}