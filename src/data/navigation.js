import { FaHome, FaUser, FaProjectDiagram, FaTerminal, FaBell, FaCalendarAlt, FaWindowMaximize, FaCode, FaEnvelope } from 'react-icons/fa';

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
    iconComponent: FaTerminal,
    label: 'haro',
    sectionId: 'haro',
    onClick: () => scrollToSection('haro')
  },
  {
    iconComponent: FaBell,
    label: 'sampai',
    sectionId: 'sampai',
    onClick: () => scrollToSection('sampai')
  },
  {
    iconComponent: FaCalendarAlt,
    label: 'jadual',
    sectionId: 'jadual',
    onClick: () => scrollToSection('jadual')
  },
  {
    iconComponent: FaWindowMaximize,
    label: 'kuroshima',
    sectionId: 'kuroshima',
    onClick: () => scrollToSection('kuroshima')
  },
  {
    iconComponent: FaCode,
    label: 'Skills',
    sectionId: 'skills',
    onClick: () => scrollToSection('skills')
  },
  {
    iconComponent: FaEnvelope,
    label: 'Contact',
    sectionId: 'contact',
    onClick: () => scrollToSection('contact')
  },
];