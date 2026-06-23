import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMui,
  SiTailwindcss,
  SiNextdotjs,
  SiExpo,
} from "react-icons/si";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaJs,
  FaReact,
  FaGithub,
  FaNodeJs,
  FaFigma,
  FaTripadvisor,
} from "react-icons/fa";
export const myProjects = [
  {
    id: 1,
    projectTitle: "Waset Travel",
    category: ["Tourism", "website"],
    imgPaths: ["/images/fgh.jpeg", "/images/fd.jpeg", "/images/fgh.jpeg"],
    features: [
      "Responsive Design",
      "User Authentication",
      "Payment Integration",
    ],
    technologies: [
      { name: "React", icon: <SiReact color="#61dafb" size={24} /> },
      { name: "Node.js", icon: <SiNodedotjs color="#68a063" size={24} /> },
      { name: "CSS3", icon: <FaCss3Alt color="#1572B6" size={24} /> },
      { name: "HTML5", icon: <FaHtml5 color="#E34F26" size={24} /> },
      {
        name: "Tailwind_CSS",
        icon: <SiTailwindcss color="#38BDF8" size={24} />,
      },
      { name: "JavaScript", icon: <FaJs color="#F7DF1E" size={24} /> },
      { name: "Next_js", icon: <SiNextdotjs color="#000000" size={24} /> },
      {
        name: "Tripadvisor",
        icon: <FaTripadvisor color="#34E0A1" size={24} />,
      },
    ],
    starsCount: 5,
    commentsCount: 12,
    isSold: true,
    liveUrl: "https://wasettravel.com/en",
    date: "2026-06-20",
  },
  {
    id: 2,
    projectTitle: "Basttet Travel",
    category: ["Tourism", "website"],
    imgPaths: [
      "/images/gf.jpeg",
      "/images/jkh.jpeg",
      "/images/WhatsApp Image 2026-06-22 at 12.47.05 AM.jpeg",
    ],
    features: [
      "Responsive Design",
      "User Authentication",
      "Payment Integration",
    ],
    technologies: [
      { name: "React", icon: <SiReact color="#61dafb" size={24} /> },
      { name: "Node.js", icon: <SiNodedotjs color="#68a063" size={24} /> },
      { name: "CSS3", icon: <FaCss3Alt color="#1572B6" size={24} /> },
      { name: "HTML5", icon: <FaHtml5 color="#E34F26" size={24} /> },
      {
        name: "Tailwind_CSS",
        icon: <SiTailwindcss color="#38BDF8" size={24} />,
      },
      { name: "JavaScript", icon: <FaJs color="#F7DF1E" size={24} /> },
      { name: "Next_js", icon: <SiNextdotjs color="#000000" size={24} /> },
      {
        name: "Tripadvisor",
        icon: <FaTripadvisor color="#34E0A1" size={24} />,
      },
    ],
    starsCount: 5,
    commentsCount: 12,
    isSold: true,
    liveUrl: "https://basttettravel.com/en",
    date: "2026-06-25",
  },
 
];

// صور حسب الثيم
export const images = {
  dark: ["/images/mohamedAbou.webp", "/images/MohamedAbu.webp"],
  light: ["/images/MyPic.webp", "/images/Mypic2.webp"],
};
