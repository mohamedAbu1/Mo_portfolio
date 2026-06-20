import styled from "styled-components";

/* ===========================
   Header Design
=========================== */
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 2.4rem;
  margin-top: 1.2rem;

  nav {
    background-color: var(--bgHeader);
    padding: 0.77rem 1.6rem;
    border-radius: 55px;
    box-shadow: 1px 1px 40px #2323242a;
  }

  ul {
    display: flex;
    gap: 16px;

    li a {
      color: var(--title);
      opacity: 0.9;
      font-size: 0.88rem;
      font-weight: 500;

      &:hover {
        color: var(--blue);
        opacity: 1;
        font-size: 0.9rem;
      }
    }
  }

  button {
    font-size: 1.2rem;

    &.menu {
      display: none;
    }
  }

  @media (max-width: 700px) {
    nav {
      display: none;
    }
    button.menu {
      display: block;
    }
  }
`;

/* ===========================
   Button & Icon
=========================== */
export const IconButton = styled.button`
  background-color: var(--bgHeader);
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 50%;
  justify-content: center;
  text-align: center;
  color: var(--subtitle);
  border: 1px solid rgba(244, 165, 96, 0.249);
  transition: 0.2s;
  box-shadow: 1px 1px 40px rgba(35, 35, 36, 0.165);

  &:hover {
    color: var(--title);
    border: 1px solid rgb(244, 165, 96);
  }

  &.icon-sun {
    color: rgb(255, 165, 0);
  }

  &.icon-close {
    font-size: 1.5rem;
    color: var(--subtitle);
    transition: 0.3s;

    &:hover {
      font-size: 1.7rem;
      color: crimson;
      rotate: 180deg;
    }
  }
`;

/* ===========================
   Modal (Pop up)
=========================== */
export const Modal = styled.ul`
  animation: mymove 0.77s 1;
  width: 75%;
  margin-inline: auto;
  margin-top: 2rem;
  border-radius: 1rem;
  padding: 1rem 2rem;
  background-color: var(--secondary);

  li {
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.77rem;
    padding-top: 0.5rem;

    &:first-child {
      text-align: right;
      border: none;
      padding-bottom: 0;
      padding-top: 0.2rem;
      margin-bottom: -1rem;
    }

    &:last-child {
      border: none;
    }

    a {
      font-size: 1rem;
    }
  }

  @keyframes mymove {
    0% {
      scale: 0;
    }
    60% {
      scale: 1.2;
    }
    100% {
      scale: 1;
    }
  }
`;

export const FixedOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 11;
  background-color: rgba(40, 40, 48, 0.91);
  backdrop-filter: blur(4px);
`;

/* ===========================
   Footer Design
=========================== */
export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.9rem;

  ul {
    display: flex;
    gap: 1rem;

    a {
      color: var(--subtitle);
      font-size: 0.9rem;
      font-weight: 400;

      &:hover {
        color: var(--blue);
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }

  p {
    color: rgb(113 113 122);
  }

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 2rem;
  }
`;
