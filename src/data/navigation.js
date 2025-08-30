import { FaHome, FaUser, FaProjectDiagram, FaCode } from 'react-icons/fa';

// Navigation utility function
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Navigation items configuration
export const navItems = [
  { 
    iconComponent: FaHome,
    label: 'Home', 
    sectionId: 'home',
    onClick: () => scrollToSection('home')
  },
  { 
    iconComponent: FaUser,
    label: 'About', 
    sectionId: 'about',
    onClick: () => scrollToSection('about')
  },
  { 
    iconComponent: FaProjectDiagram,
    label: 'Projects', 
    sectionId: 'projects',
    onClick: () => scrollToSection('projects')
  },
  { 
    iconComponent: FaCode,
    label: 'Skills', 
    sectionId: 'skills',
    onClick: () => scrollToSection('skills')
  },
];