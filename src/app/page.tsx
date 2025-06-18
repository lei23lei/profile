"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Frontend Web Developer";

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
    setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // Adjust typing speed here
    }, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(`section-${index}`);
    if (section) {
      // Check if we're on mobile (navigation is hidden)
      const isMobile = window.innerWidth < 768; // md breakpoint
      const navHeight = isMobile ? 0 : 64; // No offset on mobile, 64px on desktop
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
      {/* Phone Navigation */}
      <div className="fixed bottom-1/2 right-1 z-50 translate-y-1/2">
        <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full p-1 md:p-2 shadow-xl border border-white/30 dark:border-white/10 glass-morphism">
          <div className="flex flex-col items-center justify-center space-y-3">
            {[
              { name: "About", icon: "👤" },
              { name: "Experience", icon: "💼" },
              { name: "Projects", icon: "🚀" },
              { name: "Education", icon: "🎓" },
              { name: "Skills", icon: "⚙️" },
            ].map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(index)}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center text-xs md:text-sm shadow-md ${
                  activeSection === index
                    ? "bg-blue-500/80 text-white animate-pulse shadow-blue-500/50 backdrop-blur-sm border border-blue-400/50"
                    : "bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 backdrop-blur-sm border border-white/20 dark:border-gray-600/20"
                }`}
                title={item.name}
              >
                <span className="animate-bounce-gentle drop-shadow-sm">
                  {item.icon}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block md:fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 animate-slide-in-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white animate-glitch">
              Portfolio
            </div>
            <div className="hidden sm:flex space-x-4 lg:space-x-8">
              {["About", "Experience", "Projects", "Education", "Skills"].map(
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
              {["About", "Experience", "Projects", "Education", "Skills"].map(
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
        className="section min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 md:pt-16 relative"
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
              <div className="w-40 h-40 sm:w-56 sm:h-56 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse-glow hover-glow">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center animate-morphing hover-scale">
                  <span className="w-32 h-32 sm:w-48 sm:h-48 animate-wiggle">
                    <Image
                      src="/images/myself.jpg"
                      alt="Peter Tam"
                      width={200}
                      height={200}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </span>
                </div>
              </div>
              {/* Sparkle effects around avatar */}
              <div className="relative hidden sm:block">
                <div className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-sparkle" />
                <div
                  className="absolute -top-6 right-6 w-2 h-2 bg-blue-400 rounded-full animate-sparkle"
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className="absolute bottom-0 -left-6 w-2.5 h-2.5 bg-pink-400 rounded-full animate-sparkle"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-slide-up leading-tight">
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                Lei Ieong Tam
              </span>
            </h1>

            <div className="h-10 sm:h-12 mb-6 sm:mb-8">
              {isTyping && (
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 inline-block px-2">
                  {displayText}
                  <span className="animate-blink">|</span>
                </p>
              )}
            </div>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 animate-fade-in-delay hover:animate-rainbow px-4 sm:px-0">
              Bachelor of Economics with Computer Programming diploma.
              Passionate about creating modern web applications using
              cutting-edge technologies and delivering exceptional user
              experiences.
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
                <a
                  href="/resume.pdf"
                  download="Lei_Ieong_Tam_Resume.pdf"
                  className="block w-full h-full"
                >
                  Download CV
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Work Experience */}
      <section
        id="section-1"
        className="section min-h-screen flex items-center bg-white dark:bg-gray-900 pt-4 md:pt-6 pb-20 relative md:scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 animate-on-scroll">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 animate-slide-in-left hover:animate-glitch">
              Work Experience
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 animate-slide-in-right px-4 sm:px-0">
              My professional journey and achievements
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                title: "Frontend Developer",
                company: "未來巢科技 Futurenest",
                period: "12/2024 - Present",
                description:
                  "Build frontend websites using Next.js and TailwindCSS based on UI/UX designs from Figma. Integrate APIs using Django Rest Framework and research suitable frameworks for company needs.",
                image: "/images/job2.jpg",
              },
              {
                title: "Customer Service Officer",
                company: "Macau Light Rapid Transit (MLRT)",
                period: "2021 - 2023",
                description:
                  "Optimized daily earnings by tracking and reconciling revenue and expenses in Excel. Provided precise financial performance and operation reports.",
                image: "/images/job1.jpg",
              },
            ].map((job, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-xl p-1 sm:p-2 lg:p-4 animate-on-scroll stagger-${
                  index + 1
                } hover-lift hover-glow transition-all duration-500 transform shadow-lg hover:shadow-2xl`}
                style={{
                  transform:
                    typeof window !== "undefined" && window.innerWidth >= 768
                      ? `translateX(${
                          scrollY * 0.05 * (index % 2 === 0 ? 1 : -1)
                        }px)`
                      : "none",
                }}
              >
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
                  {/* Image Section */}
                  <div className="lg:w-1/3 flex-shrink-0">
                    <div className="relative w-full h-40 sm:h-48 2xl:h-60 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse-glow">
                      <div className="w-full h-full rounded-lg overflow-hidden">
                        <Image
                          src={job.image}
                          alt={`${job.company} workplace`}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover hover-scale transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-2/3 flex flex-col justify-center px-2 sm:px-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                      <div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white hover:animate-rainbow mb-1">
                          {job.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm lg:text-base animate-heartbeat">
                          {job.company}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium hover-scale animate-wiggle shadow-md">
                          {job.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                      {job.description}
                    </p>
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
        className="section min-h-screen flex items-center bg-gray-50 dark:bg-gray-800 pt-6 md:pt-10 pb-20 relative md:scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 animate-on-scroll">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 animate-slide-in-left hover:animate-neon-glow">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 animate-slide-in-right px-4 sm:px-0">
              Some of my recent work and side projects
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                title: "Peter Shop",
                description:
                  "Full-stack e-commerce project with Next.js frontend, Django backend, PostgreSQL database, and Cloudinary storage.",
                tech: [
                  "Next.js",
                  "Django",
                  "PostgreSQL",
                  "Vercel",
                  "Google Cloud",
                ],
                image: "/images/project1.jpg",
                link: "https://www.petershop.shop/",
              },
              {
                title: "Plan Travel",
                description:
                  "Travel planning app with drag-and-drop functionality, Google Maps integration, and Auth.js authentication.",
                tech: ["Next.js", "PostgreSQL", "Prisma", "Google Maps API"],
                image: "/images/project2.jpg",
                link: "https://www.theplantravel.com/",
              },
            ].map((project, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform animate-on-scroll stagger-${
                  index + 1
                } hover-lift overflow-hidden group`}
                style={{
                  transform: `perspective(1000px) rotateY(${
                    mousePosition.x * 0.005
                  }deg) rotateX(${mousePosition.y * -0.005}deg)`,
                }}
              >
                {/* Image Section */}
                <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-t-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  {/* Overlay with project link */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-50 shadow-lg"
                    >
                      View Live Site →
                    </a>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-3 sm:p-4 lg:p-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 hover:animate-glitch">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium hover-scale animate-wiggle shadow-sm stagger-${
                          techIndex + 1
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Link */}
                  <div className="flex items-center justify-between">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-semibold text-xs sm:text-sm group/link"
                    >
                      Visit Website
                      <svg
                        className="w-3 h-3 ml-1 sm:ml-2 transform group-hover/link:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    <div className="text-lg sm:text-xl animate-float hover-scale hover-rotate">
                      {project.title.includes("Shop") ? "🛒" : "✈️"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Education */}
      <section
        id="section-3"
        className="section min-h-screen flex items-center bg-white dark:bg-gray-900 pt-6 md:pt-10 pb-20 relative md:scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 animate-on-scroll">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 animate-slide-in-left hover:animate-glitch">
              Education
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 animate-slide-in-right px-4 sm:px-0">
              My academic background and achievements
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                institution: "Humber Polytechnic",
                period: "09/2023 – 08/2025 (expected)",
                degree: "Computer Programming",
                description:
                  "Learning fundamental web application development technologies. Studying object-oriented programming with Java, database design, operating systems, and software development principles.",
                gpa: "91.5",
                image: "/images/humber.jpg",
              },
              {
                institution: "Soochow University",
                period: "09/2015 – 01/2020",
                degree: "Bachelor of Economics",
                description:
                  "Gained a deep understanding of economic principles, including supply and demand, and statistics. Applied Python for data analysis and interpretation.",
                gpa: null,
                image: "/images/soochow.jpg",
              },
            ].map((edu, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-xl p-1 sm:p-2 lg:p-4 animate-on-scroll stagger-${
                  index + 1
                } hover-lift hover-glow transition-all duration-500 transform shadow-lg hover:shadow-2xl`}
                style={{
                  transform:
                    typeof window !== "undefined" && window.innerWidth >= 768
                      ? `translateX(${
                          scrollY * 0.05 * (index % 2 === 0 ? 1 : -1)
                        }px)`
                      : "none",
                }}
              >
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
                  {/* Image Section */}
                  <div className="lg:w-1/3 flex-shrink-0">
                    <div className="relative w-full h-40  2xl:h-48 rounded-lg overflow-hidden bg-gradient-to-r from-green-500 to-blue-600 p-1 animate-pulse-glow">
                      <div className="w-full h-full rounded-lg overflow-hidden bg-white">
                        <Image
                          src={
                            index === 0
                              ? "/images/school1.jpg"
                              : "/images/school2.jpg"
                          }
                          alt={`${edu.institution} campus`}
                          width={300}
                          height={300}
                          className="w-full h-40 mt-0 md:mt-2  object-cover hover-scale transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-2/3 flex flex-col justify-center px-2 sm:px-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                      <div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white hover:animate-rainbow mb-1">
                          {edu.degree}
                        </h3>
                        <p className="text-green-600 dark:text-green-400 font-semibold text-xs sm:text-sm lg:text-base animate-heartbeat">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 flex flex-col items-start sm:items-end">
                        <span className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-green-800 dark:text-green-200 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium hover-scale animate-wiggle shadow-md mb-1">
                          {edu.period}
                        </span>
                        {edu.gpa && (
                          <span className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium hover-scale shadow-md">
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Skills */}
      <section
        id="section-4"
        className="section min-h-screen flex items-center bg-white dark:bg-gray-900  pb-20 md:scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 animate-on-scroll">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 animate-slide-in-left hover:animate-rainbow">
              Skills & Technologies
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 animate-slide-in-right px-4 sm:px-0">
              Tools and technologies I work with
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                category: "Frontend",
                skills: [
                  "HTML",
                  "CSS",
                  "React",
                  "Next.js",
                  "TailwindCSS",
                  "TypeScript",
                ],
                icon: "🎨",
              },
              {
                category: "Backend",
                skills: ["Django", "Flask", "Node.js", "RESTful APIs"],
                icon: "⚙️",
              },
              {
                category: "Database",
                skills: ["PostgreSQL", "MySQL", "MongoDB", "Prisma ORM"],
                icon: "🗄️",
              },
              {
                category: "Tools",
                skills: ["Git", "Docker", "Ubuntu", "Linux"],
                icon: "🛠️",
              },
            ].map((skillGroup, index) => (
              <div
                key={index}
                className={`text-center animate-on-scroll animate-skill-bounce stagger-${
                  index + 1
                } hover-lift p-2 sm:p-3 lg:p-4`}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 animate-heartbeat hover-scale hover-rotate">
                  {skillGroup.icon}
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 hover:animate-neon-glow">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-1 sm:space-y-1.5">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className={`text-xs text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer hover-scale stagger-${
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
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 hover:animate-glitch">
                Get In Touch
              </h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
                I&apos;m always open to discussing new opportunities and
                interesting projects.
              </p>
              <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                <a
                  href="mailto:leeli.petertam@gmail.com"
                  className="text-xl sm:text-2xl text-gray-300 hover:text-white transition-colors hover-scale animate-heartbeat"
                >
                  📧
                </a>
                <a
                  href="https://www.linkedin.com/in/leeli-peter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl sm:text-2xl text-gray-300 hover:text-white transition-colors hover-scale animate-heartbeat"
                >
                  💼
                </a>
                <a
                  href="tel:+14378559651"
                  className="text-xl sm:text-2xl text-gray-300 hover:text-white transition-colors hover-scale animate-heartbeat"
                >
                  📞
                </a>
              </div>
            </div>
            <div className="animate-on-scroll stagger-2 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 hover:animate-neon-glow">
                Quick Links
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {["About", "Experience", "Projects", "Education", "Skills"].map(
                  (item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(index)}
                        className={`text-xs sm:text-sm text-gray-300 hover:text-white transition-colors hover-lift stagger-${
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
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 hover:animate-rainbow">
                Contact Info
              </h3>
              <div className="text-gray-300 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <p className="hover-scale">📍 Toronto, ON</p>
                <p className="hover-scale">📧 leeli.petertam@gmail.com</p>
                <p className="hover-scale">📞 +1 (437) 855-9651</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 animate-on-scroll">
            <p className="hover:animate-glitch text-xs sm:text-sm">
              &copy; 2024 Lei Ieong Tam. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
