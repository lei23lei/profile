"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      setScrollY(window.scrollY);

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(index);
        }
      });

      // Animate elements on scroll
      const animateElements = document.querySelectorAll(".animate-on-scroll");
      animateElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("animate-in");
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Start typing animation after a delay
    setTimeout(() => setIsTyping(true), 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(`section-${index}`);
    if (section) {
      const navHeight = 64; // Height of the fixed navigation bar
      const elementPosition = section.offsetTop - navHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-xl floating-element"
          style={{
            top: "10%",
            left: "80%",
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-xl floating-element"
          style={{
            top: "60%",
            left: "10%",
            transform: `translate(${mousePosition.x * -0.01}px, ${
              mousePosition.y * -0.01
            }px)`,
          }}
        />
        <div
          className="absolute w-48 h-48 bg-green-500/10 rounded-full blur-xl floating-element"
          style={{
            top: "30%",
            left: "5%",
            transform: `translate(${mousePosition.x * 0.015}px, ${
              mousePosition.y * 0.015
            }px)`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 animate-slide-in-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white animate-glitch">
              Portfolio
            </div>
            <div className="hidden sm:flex space-x-4 lg:space-x-8">
              {["About", "Experience", "Projects", "Skills"].map(
                (item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(index)}
                    className={`text-xs sm:text-sm font-medium transition-all py-5 duration-300 hover-lift ${
                      activeSection === index
                        ? "text-blue-600 dark:text-blue-400 animate-neon-glow"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
            {/* Mobile Navigation */}
            <div className="sm:hidden flex space-x-1">
              {["About", "Experience", "Projects", "Skills"].map(
                (item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(index)}
                    className={`text-xs font-medium px-2 py-1 rounded transition-all duration-300 ${
                      activeSection === index
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {item.slice(0, 4)}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Section 1: Self Introduction */}
      <section
        id="section-0"
        className="section min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20 relative"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-20 h-20 border-2 border-blue-500 animate-wiggle" />
          <div className="absolute top-40 right-32 w-16 h-16 bg-purple-500 rounded-full animate-heartbeat" />
          <div className="absolute bottom-32 left-40 w-12 h-12 bg-green-500 animate-morphing" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-pink-500 rotate-45 animate-sparkle" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="mb-6 sm:mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse-glow hover-glow">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center animate-morphing hover-scale">
                  <span className="text-2xl sm:text-4xl animate-wiggle">
                    👨‍💻
                  </span>
                </div>
              </div>
              {/* Sparkle effects around avatar */}
              <div className="relative hidden sm:block">
                <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-sparkle" />
                <div
                  className="absolute -top-4 right-4 w-1 h-1 bg-blue-400 rounded-full animate-sparkle"
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className="absolute bottom-0 -left-4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-sparkle"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-slide-up leading-tight">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                John Doe
              </span>
            </h1>

            <div className="h-12 sm:h-16 mb-6 sm:mb-8">
              {isTyping && (
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 animate-typewriter inline-block px-2">
                  Full Stack Developer & UI/UX Designer
                </p>
              )}
            </div>

            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 animate-fade-in-delay hover:animate-rainbow px-4 sm:px-0">
              Passionate about creating beautiful, functional, and user-friendly
              applications. I love turning complex problems into simple,
              beautiful, and intuitive designs.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 animate-bounce-in px-4 sm:px-0">
              <button
                onClick={() => scrollToSection(1)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-110 hover-glow animate-heartbeat"
                onMouseEnter={(e) =>
                  (e.target as HTMLElement).classList.add("animate-shake")
                }
                onMouseLeave={(e) =>
                  (e.target as HTMLElement).classList.remove("animate-shake")
                }
              >
                View My Work
              </button>
              <button className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 hover-lift">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Work Experience */}
      <section
        id="section-1"
        className="section min-h-screen flex items-center bg-white dark:bg-gray-900 py-20 relative scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 animate-slide-in-left hover:animate-glitch">
              Work Experience
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 animate-slide-in-right px-4 sm:px-0">
              My professional journey and achievements
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                title: "Senior Full Stack Developer",
                company: "Tech Corp Inc.",
                period: "2022 - Present",
                description:
                  "Lead development of scalable web applications using React, Node.js, and cloud technologies.",
              },
              {
                title: "Frontend Developer",
                company: "Digital Agency",
                period: "2020 - 2022",
                description:
                  "Built responsive web applications and collaborated with design teams to implement pixel-perfect UIs.",
              },
              {
                title: "Junior Developer",
                company: "StartUp Labs",
                period: "2019 - 2020",
                description:
                  "Developed mobile-first applications and gained experience in agile development methodologies.",
              },
            ].map((job, index) => (
              <div
                key={index}
                className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 animate-on-scroll stagger-${
                  index + 1
                } hover-lift hover-glow transition-all duration-500 transform`}
                style={{
                  transform: `translateX(${
                    scrollY * 0.05 * (index % 2 === 0 ? 1 : -1)
                  }px)`,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white hover:animate-rainbow">
                      {job.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base animate-heartbeat">
                      {job.company}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                      {job.description}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-4 md:mt-0">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover-scale animate-wiggle">
                      {job.period}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Projects */}
      <section
        id="section-2"
        className="section min-h-screen flex items-center bg-gray-50 dark:bg-gray-800 py-20 relative scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 animate-slide-in-left hover:animate-neon-glow">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 animate-slide-in-right px-4 sm:px-0">
              Some of my recent work and side projects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
                tech: ["React", "Node.js", "PostgreSQL"],
                image: "🛒",
              },
              {
                title: "Task Management App",
                description:
                  "Collaborative task management tool with real-time updates",
                tech: ["Next.js", "Socket.io", "MongoDB"],
                image: "📋",
              },
              {
                title: "Weather Dashboard",
                description:
                  "Beautiful weather app with location-based forecasts",
                tech: ["React", "API Integration", "Charts"],
                image: "🌤️",
              },
            ].map((project, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-2xl transition-all duration-500 transform animate-on-scroll stagger-${
                  index + 1
                } hover-lift parallax`}
                style={{
                  transform: `perspective(1000px) rotateY(${
                    mousePosition.x * 0.005
                  }deg) rotateX(${mousePosition.y * -0.005}deg)`,
                }}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 animate-float hover-scale hover-rotate">
                  {project.image}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:animate-glitch">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs sm:text-sm hover-scale animate-wiggle stagger-${
                        techIndex + 1
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Skills */}
      <section
        id="section-3"
        className="section min-h-screen flex items-center bg-white dark:bg-gray-900 py-20 scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 animate-slide-in-left hover:animate-rainbow">
              Skills & Technologies
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 animate-slide-in-right px-4 sm:px-0">
              Tools and technologies I work with
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                category: "Frontend",
                skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                icon: "🎨",
              },
              {
                category: "Backend",
                skills: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
                icon: "⚙️",
              },
              {
                category: "Tools",
                skills: ["Git", "Docker", "AWS", "Figma"],
                icon: "🛠️",
              },
              {
                category: "Mobile",
                skills: ["React Native", "Flutter", "iOS", "Android"],
                icon: "📱",
              },
            ].map((skillGroup, index) => (
              <div
                key={index}
                className={`text-center animate-on-scroll animate-skill-bounce stagger-${
                  index + 1
                } hover-lift p-2 sm:p-4`}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 animate-heartbeat hover-scale hover-rotate">
                  {skillGroup.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 hover:animate-neon-glow">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className={`text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer hover-scale stagger-${
                        skillIndex + 1
                      }`}
                      onMouseEnter={(e) =>
                        (e.target as HTMLElement).classList.add(
                          "animate-wiggle"
                        )
                      }
                      onMouseLeave={(e) =>
                        (e.target as HTMLElement).classList.remove(
                          "animate-wiggle"
                        )
                      }
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 sm:py-12 relative overflow-hidden">
        {/* Animated footer background */}
        <div className="absolute inset-0 opacity-10">
          <div className="animate-gradient absolute inset-0" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="animate-on-scroll stagger-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 hover:animate-glitch">
                Get In Touch
              </h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                I'm always open to discussing new opportunities and interesting
                projects.
              </p>
              <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                {["📧", "💼", "🐙", "🐦"].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`text-xl sm:text-2xl text-gray-300 hover:text-white transition-colors hover-scale animate-heartbeat stagger-${
                      index + 1
                    }`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="animate-on-scroll stagger-2 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 hover:animate-neon-glow">
                Quick Links
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {["About", "Experience", "Projects", "Skills"].map(
                  (item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(index)}
                        className={`text-sm sm:text-base text-gray-300 hover:text-white transition-colors hover-lift stagger-${
                          index + 1
                        }`}
                      >
                        {item}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="animate-on-scroll stagger-3 text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 hover:animate-rainbow">
                Contact Info
              </h3>
              <div className="text-gray-300 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                <p className="hover-scale">📍 San Francisco, CA</p>
                <p className="hover-scale">📧 john.doe@example.com</p>
                <p className="hover-scale">📞 +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 animate-on-scroll">
            <p className="hover:animate-glitch text-sm sm:text-base">
              &copy; 2024 John Doe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
