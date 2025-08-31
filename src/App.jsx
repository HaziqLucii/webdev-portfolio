import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import SplitText from './TextAnimations/SplitText/SplitText';
import TextType from './TextAnimations/TextType/TextType';
import GlassSurface from './Components/GlassSurface/GlassSurface';
import SpotlightCard from './Components/SpotlightCard/SpotlightCard';
import Counter from './Components/Counter/Counter';
import DarkVeil from './Backgrounds/DarkVeil/DarkVeil';
import { projectsData, personalProjectsData } from './data/projects';
import { navItems } from './data/navigation';
import { skills } from './data/skills';
import { experiences } from './data/experiences';
import Lanyard from './Components/Lanyard/Lanyard';




export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative" style={{ overflowX: 'hidden', overflowY: 'visible' }}>
      {/* Dark Veil Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DarkVeil />
      </div>
      
      {/* Navigation Bar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <GlassSurface 
          width={550}
          height={60}
          borderRadius={30}
          className="backdrop-blur-md"
        >
          <div className="flex items-center justify-center gap-8 h-full px-6">
            {/* <p className='font-bold'>haziq.</p> */}
            {navItems.map((item, index) => {
              const IconComponent = item.iconComponent;
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
                >
                  <IconComponent size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </GlassSurface>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10 px-6" style={{ overflow: 'visible' }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full" style={{ overflow: 'visible' }}>
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <SplitText
                text="Ikhmal Haziq"
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4"
                splitType="chars"
                delay={100}
                duration={0.6}
                ease="power3.out"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-white">
                Fullstack Web Developer
              </h2>
            </div>

            <TextType 
              text={["Experienced in web and mobile development, DevOps, and geospatial systems.", "Passionate about delivering scalable and efficient solutions."]}
              className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed"
              typingSpeed={50}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
            />

            <div className="flex justify-center lg:justify-start gap-6 mt-12">
              <a href="mailto:ikhmalhaziq2907@gmail.com" className="text-2xl hover:text-gray-400 transition-colors">
                <FaEnvelope />
              </a>
              <a href="https://github.com/HaziqLucii" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-400 transition-colors">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/haziq-luffy" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-400 transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Right Side - Lanyard Component */}
          <div className="lg:flex justify-center items-center relative z-50" style={{ overflow: 'visible', height: '500px' }}>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Counter 
                endValue={2} 
                suffix="+" 
                className="text-4xl font-bold text-white mb-2 block"
                duration={1.5}
              />
              <p className="text-gray-400">Years Experience</p>
            </div>
            <div className="text-center">
              <Counter 
                endValue={5} 
                suffix="+" 
                className="text-4xl font-bold text-white mb-2 block"
                duration={1.5}
              />
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div className="text-center">
              <Counter 
                endValue={1}
                className="text-4xl font-bold text-white mb-2 block"
                duration={1.5}
              />
              <p className="text-gray-400">Team Leadership</p>
            </div>
            <div className="text-center">
              <Counter 
                endValue={2} 
                className="text-4xl font-bold text-white mb-2 block"
                duration={1.5}
              />
              <p className="text-gray-400">Certifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SplitText
            text="About Me"
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            splitType="chars"
            delay={100}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Experienced Fullstack Developer & Technical Lead with a strong background in web and mobile 
                development, DevOps, and geospatial systems. Passionate about delivering scalable and 
                efficient solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Holds a Certified Kubernetes Administrator (CKA) certification, showcasing strong 
                expertise in containerization and cloud orchestration. Adept at mentoring developers, 
                leading projects, and optimizing system performance.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div>
                  <h4 className="font-semibold text-white mb-2">Education</h4>
                  <p className="text-gray-300">Diploma in Cyber Forensics</p>
                  <p className="text-gray-400 text-sm">Cybernetics International College</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Location</h4>
                  <p className="text-gray-300">Ampang, Kuala Lumpur</p>
                  <p className="text-gray-400 text-sm">Malaysia</p>
                </div>
              </div>
            </div>

            <div>
              {experiences.map(exp => (
                <SpotlightCard key={exp.id} className="p-6 mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
                  <p className="text-white mb-1">{exp.company}</p>
                  <p className="text-gray-400 text-sm mb-3">{exp.period} • {exp.location}</p>
                  <p className="text-gray-300 text-sm">{exp.description}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SplitText
            text="Featured Projects"
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            splitType="chars"
            delay={100}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <SpotlightCard key={index} className="p-6 h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium px-3 py-1 bg-purple-600/20 rounded-full text-purple-300">
                    {project.label}
                  </span>
                  <span className="text-xs text-gray-400">{project.period}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">{project.description}</p>
                
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="space-y-1">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="text-white text-sm flex items-center">
                        <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Projects Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SplitText
            text="Personal Projects"
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            splitType="chars"
            delay={100}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {personalProjectsData.map((project, index) => (
              <SpotlightCard key={index} className="p-6 h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium px-3 py-1 bg-green-600/20 rounded-full text-green-300">
                    {project.label}
                  </span>
                  <span className="text-xs text-gray-400">{project.period}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">{project.description}</p>
                
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="space-y-1">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="text-white text-sm flex items-center">
                        <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SplitText
            text="Technical Skills"
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            splitType="chars"
            delay={100}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(skill => (
              <SpotlightCard key={skill.id} className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">{skill.name}</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {skill.items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors w-full h-20">
                      {item.icon ? (
                        <img 
                          src={item.icon} 
                          alt={item.name} 
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">{item.name.charAt(0)}</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-300 text-center leading-tight">{item.name}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SplitText
            text="Let's Work Together"
            className="text-4xl md:text-5xl font-bold mb-8"
            splitType="chars"
            delay={100}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
          
          <p className="text-xl text-gray-300 mb-12">
            Ready to bring your ideas to life with cutting-edge technology and proven expertise.
          </p>
          
          <a
            href="mailto:ikhmalhaziq2907@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105"
          >
            <FaEnvelope />
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative z-10 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            Built with React • Components from{' '}
            <a 
              href="https://reactbits.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              React Bits
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}
