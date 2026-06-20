import styled from "styled-components";
import { motion } from "framer-motion";

/* ===========================
   Hero Section
=========================== */
export const HeroSection = styled.section`
  margin-top: 3rem;
  display: flex;
  background-color: ${(props) => props.bg}; // خلفية من الثيم
`;

export const Title = styled(motion.h1)`
  font-size: 2.85rem;
  line-height: 3.3rem;
  margin: 24px 0;
  color: ${(props) => props.color}; // لون العنوان من الثيم
`;

export const SubTitle = styled.p`
  font-size: 0.9rem;
  line-height: 1.65rem;
  margin-bottom: 32px;
  color: ${(props) => props.color}; // لون النص الثانوي من الثيم
`;

export const IconVerified = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  color: ${(props) => props.color}; // لون الأيقونة من الثيم
`;

export const AllIcons = styled.div`
  display: flex;
  font-size: 1.3rem;
  gap: 1.5rem;
  color: ${(props) => props.color};

  .icon:hover {
    font-size: 1.4rem;
    transition: 0.3s;
    cursor: pointer;
    color: ${(props) => props.hoverColor};
  }
`;
/* ===========================
   About Section
=========================== */

export const AboutSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 3rem 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const AboutText = styled.div`
  flex: 1;

  h1 {
    font-size: 2.6rem;
    color: var(--title);
    margin-bottom: 1.2rem;
  }

  p {
    font-size: 1.15rem;
    line-height: 1.9rem;
    color: var(--subtitle);
    max-width: 600px;
  }
`;

export const AboutImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const AboutImage = styled(motion.img)`
  width: 350px;
  height: 550px;
  border-radius: 15px;
  object-fit: cover;
  border: 2px solid darkorange;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.2);
`;

/* ===========================
   Main Section
=========================== */
export const MainFlex = styled.main`
  display: flex;
  gap: 2.64rem;
  align-items: start;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 2.64rem;
    align-items: center;
  }
`;

export const LeftButtons = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    background-color: rgba(36, 37, 46, 1);
    width: 11rem;
    padding: 0.75rem 0;
    text-align: center;
    font-size: 1.05rem;
    text-transform: capitalize;
    opacity: 0.5;
    border-radius: 5px;
    transition: 0.3s;

    &:hover {
      opacity: 1;
    }

    &.active {
      opacity: 1;
      font-weight: bold;
      letter-spacing: 0.6px;
      padding: 0.8rem 0;
      border: 1px solid var(--blue);
    }
  }

  .light & button.active {
    border: 1px solid #000;
  }

  @media (max-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;

    button {
      width: 7rem;
      padding: 0.8rem 0;
      font-size: 0.9rem;
    }
  }
`;

export const RightCards = styled.section`
  flex-grow: 1;
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  column-gap: 16px;
  row-gap: 2rem;
`;

export const Card = styled.div`
  box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.16),
    1px 1px 1px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(93, 188, 252, 0.3);
  border-radius: 5px;
  transition: 0.3s;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05)
  );

  &:hover {
    border: 1px solid var(--blue);
    rotate: 1deg;
    scale: 1.01;
    cursor: pointer;
  }

  img {
    border-radius: 5px;
  }

  .box {
    padding: 1rem 0.4rem;

    .title {
      color: var(--title);
      text-transform: capitalize;
    }

    .sub-title {
      color: var(--subtitle);
      font-size: 0.8rem;
      margin-top: 0.7rem;
      margin-bottom: 1.1rem;
    }

    .icons {
      justify-content: space-between;
    }

    .icon-github,
    .icon-link {
      font-size: 1.2rem;
      color: var(--subtitle);

      &:hover {
        font-size: 1.25rem;
        color: var(--icon-hover);
        cursor: pointer;
      }
    }

    a.link {
      font-size: 0.9rem;
      color: var(--blue);
      margin-right: 12px;
    }
  }

  .light &,
  .light &:hover {
    border: none;
  }
`;

/* ===========================
   Contact Section
=========================== */
export const ContactUs = styled.section`
  .icon-envelope {
    color: var(--subtitle);
    margin-right: 1rem;
    font-size: 1.8rem;
  }

  .title {
    font-size: 2.1rem;
    color: var(--title);
    margin-bottom: 1rem;
  }

  .sub-title {
    color: var(--subtitle);
    margin-bottom: 2rem;
    line-height: 1.65rem;
  }

  label {
    color: var(--subtitle);
  }

  #email,
  #message {
    all: unset;
    background-color: rgba(63, 63, 70, 0.15);
    border: 1px solid rgb(63 63 70);
    width: 16rem;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    border-radius: 5px;
    transition: 0.3s;
    font-size: 1.1rem;

    &:focus,
    &:hover {
      border: 1px solid rgb(45 212 191);
    }
  }

  .light & #email,
  .light & #message {
    background-color: rgba(255, 255, 255, 0.162);
    border: 1px solid rgba(128, 128, 128, 0.451);
    box-shadow: 1px 1px 1px rgba(73, 73, 75, 0.105);
    color: #232324;

    &:focus,
    &:hover {
      border: 1px solid rgb(78, 80, 80);
    }
  }

  #message {
    min-height: 9rem;
    resize: vertical;
  }

  .submit {
    background-color: rgba(36, 37, 46, 1);
    padding: 0.75rem 2rem;
    text-align: center;
    font-size: 1.05rem;
    text-transform: capitalize;
    border-radius: 5px;
    transition: 0.3s;
    margin-top: 1.8rem;
    border: 1px solid rgb(63 63 70);

    &:hover {
      scale: 0.97;
    }
  }

  @media (max-width: 1250px) {
    .contact-animation {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .animation {
      display: none;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 85%;

      div.flex {
        flex-direction: column;
        align-items: start;
      }
    }

    #email,
    #message {
      width: 100%;
      margin-left: 0;
      padding: 0.7rem 0;
      margin-top: 1rem;
    }

    .submit {
      width: 30%;
      align-self: center;
    }
  }
`;
