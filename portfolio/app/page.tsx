"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  ChevronDown,
  ArrowUp,
  Menu,
  X,
  Sun,
  Moon,
  Terminal,
  Filter,
  Award,
  Code,
  Download,
  Star,
  GitBranch,
  Zap,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


export default function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [projectFilter, setProjectFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [downloadStatus, setDownloadStatus] = useState("")

  const terminalRef = useRef<HTMLInputElement>(null)
  const { scrollYProgress } = useScroll()

  // Floating icons data
  const floatingIcons = [
    { icon: "⚛️", x: 10, y: 20, delay: 0 },
    { icon: "🚀", x: 80, y: 10, delay: 1 },
    { icon: "💻", x: 20, y: 70, delay: 2 },
    { icon: "🎨", x: 90, y: 60, delay: 3 },
    { icon: "⚡", x: 60, y: 30, delay: 4 },
    { icon: "🔥", x: 30, y: 80, delay: 5 },
  ]

  // Terminal commands
  const terminalCommands = {
    help: "Available commands: about, projects, skills, experience, contact, resume, clear",
    about: "Navigating to About section...",
    projects: "Showing projects...",
    skills: "Displaying skills...",
    experience: "Loading experience timeline...",
    contact: "Opening contact form...",
    resume: "Downloading resume...",
    clear: "clear",
    "yukessh --resume": "Downloading resume in stealth mode... 🥷",
  }

  // Projects data with filtering
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      tags: ["React", "Full Stack"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Collaborative task management with real-time updates using Socket.io. Built with Next.js and MongoDB.",
      tech: ["Next.js", "Socket.io", "MongoDB", "Tailwind"],
      tags: ["React", "Full Stack"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts and interactive charts.",
      tech: ["React", "OpenWeather API", "Chart.js"],
      tags: ["React", "Animation"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false,
    },
    {
      id: 4,
      title: "Open Source UI Library",
      description: "Reusable React component library with TypeScript support and Storybook documentation.",
      tech: ["React", "TypeScript", "Storybook", "NPM"],
      tags: ["React", "Open Source"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
    },
  ]

  // Skills data organized by category
  const skillsGroups = [
    {
      title: "Languages",
      icon: "<>",
      skills: [
        { name: "C Language", icon: "💻" },
        { name: "Java", icon: "☕" },
      ],
    },
    {
      title: "Frontend",
      icon: "🌐",
      skills: [
        { name: "React", icon: "⚛️" },
        { name: "HTML", icon: "🟧" },
        { name: "CSS", icon: "🟦" },
        { name: "Bootstrap", icon: "🅱️" },
      ],
    },
    {
      title: "Backend",
      icon: "🗄️",
      skills: [
        { name: "Node.js", icon: "🟩" },
        { name: "Express.js", icon: "ex" },
      ],
    },
    {
      title: "Databases & Cloud",
      icon: "🗄️",
      skills: [
        { name: "MongoDB", icon: "🍃" },
        { name: "MySQL", icon: "🐬" },
        { name: "AWS", icon: "☁️" },
      ],
    },
    {
      title: "Soft Skills",
      icon: "🧠",
      skills: [
        { name: "Problem Solving", icon: "🧩" },
        { name: "Time Management", icon: "⏰" },
        { name: "Communication", icon: "💬" },
      ],
    },
  ]

  // Coding stats
  const codingStats = [
    { label: "GitHub Commits", value: 1247, icon: GitBranch },
    { label: "Projects Completed", value: 42, icon: Code },
    { label: "Problems Solved", value: 320, icon: Target },
    { label: "Years Experience", value: 5, icon: Award },
  ]

  // Loading screen effect
  useEffect(() => {
    // Simulate initial loading delay for data fetching
    const timer = setTimeout(() => setLoading(false), 2000)
    // Disable scroll while loading
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
    }
  }, [loading])

  // Scroll effects and progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const progress = (scrollY / (documentHeight - windowHeight)) * 100

      setScrollProgress(progress)
      setShowBackToTop(scrollY > 500)

      // Update active section based on scroll position
      const sections = ["home", "about", "experience", "skills", "projects", "contact"]
      const sectionElements = sections.map((id) => document.getElementById(id))

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && scrollY >= element.offsetTop - 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Terminal keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault()
        setTerminalOpen(true)
        setTimeout(() => terminalRef.current?.focus(), 100)
      }
      if (e.key === "Escape") {
        setTerminalOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      setMobileMenuOpen(false)
      setTimeout(() => {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }, 100)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleTerminalCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    setTerminalHistory((prev) => [...prev, `$ ${command}`])

    if (cmd in terminalCommands) {
      if (cmd === "clear") {
        setTerminalHistory([])
      } else {
        setTerminalHistory((prev) => [...prev, terminalCommands[cmd as keyof typeof terminalCommands]])

        // Execute navigation commands
        if (cmd === "about") scrollToSection("about")
        if (cmd === "projects") scrollToSection("projects")
        if (cmd === "skills") scrollToSection("skills")
        if (cmd === "experience") scrollToSection("experience")
        if (cmd === "contact") scrollToSection("contact")
        if (cmd === "resume" || cmd === "yukessh --resume") {
          handleResumeDownload("pdf")
        }
      }
    } else {
      setTerminalHistory((prev) => [...prev, `Command not found: ${command}. Type 'help' for available commands.`])
    }

    setTerminalInput("")
  }

  const handleResumeDownload = (format: string) => {
    setDownloadStatus("downloading")
    setTimeout(() => {
      setDownloadStatus("downloaded")
      setTimeout(() => setDownloadStatus(""), 3000)
    }, 2000)
  }

  const filteredProjects =
    projectFilter === "All" ? projects : projects.filter((project) => project.tags.includes(projectFilter))

  const projectTags = ["All", "React", "Full Stack", "Animation", "Open Source"]

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
              <motion.path
                d="M50,10
                  Q65,15 70,30
                  Q90,50 70,70
                  Q65,85 50,90
                  Q35,85 30,70
                  Q10,50 30,30
                  Q35,15 50,10Z"
                fill="none"
                stroke="url(#loader-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="url(#loader-gradient)"
                strokeWidth="4"
                strokeDasharray="10 10"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 60 }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </svg>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-bold text-gray-800 mb-4 font-inter"
          >
            Welcome
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-blue-600 text-lg font-inter"
          >
            Loading amazing portfolio...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  // Removed duplicate LoadingAnimation fallback
  return (
    <div className={`min-h-screen font-inter ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white transition-colors duration-500 relative overflow-hidden">
        {/* Floating Background Icons */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              className="absolute text-4xl opacity-5"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: item.delay,
                ease: "easeInOut",
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50 origin-left"
          style={{ scaleX: scrollProgress / 100 }}
        />

        {/* Progress Indicators */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-2">
          {["home", "about", "experience", "skills", "projects", "contact"].map((section, index) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === section
                ? "bg-blue-500 border-blue-500 scale-125"
                : "border-gray-300 hover:border-blue-400"
                }`}
              whileHover={{ scale: 1.2 }}
              title={section.charAt(0).toUpperCase() + section.slice(1)}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                Yukesshwaran
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {["home", "about", "skills", "experience", "education", "projects", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`relative capitalize transition-colors duration-300 hover:text-blue-600 font-medium ${activeSection === section ? "text-blue-600" : "text-gray-700"
                      }`}
                  >
                    {section}
                    {activeSection === section && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </button>
                ))}

                {/* Terminal Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTerminalOpen(true)}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  title="Open Terminal (Ctrl+K)"
                >
                  <Terminal className="w-5 h-5" />
                </Button>


              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setTerminalOpen(true)} className="text-gray-700">
                  <Terminal className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDarkMode(!darkMode)} className="text-gray-700">
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-700"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden mt-4 pb-4 border-t border-gray-200"
                >
                  <div className="flex flex-col space-y-3 pt-4">
                    {["home", "about", "skills", "experience", "education", "projects", "contact"].map((section) => (
                      <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className={`px-6 py-2 text-left capitalize transition-colors font-medium ${activeSection === section ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                          }`}
                      >
                        {section}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Terminal Modal */}
        <Dialog open={terminalOpen} onOpenChange={setTerminalOpen}>
          <DialogContent className="bg-gray-900 border-green-400/30 text-green-400 font-mono max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-green-400 flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Terminal - Yukesshwaran Portfolio
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg h-64 overflow-y-auto">
                <div className="text-green-300 mb-2">Welcome to Yukessh's Portfolio Terminal!</div>
                <div className="text-green-300 mb-4">Type 'help' to see available commands.</div>
                {terminalHistory.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <Input
                  ref={terminalRef}
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTerminalCommand(terminalInput)
                    }
                  }}
                  className="bg-transparent border-none text-green-400 focus:ring-0 font-mono"
                  placeholder="Enter command..."
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative z-10">
          <div className="container mx-auto px-12 lg:px-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center">
              {/* Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 pl-4 lg:pl-8"
              >
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl lg:text-7xl font-bold mb-4"
                  >
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Yukesshwaran
                    </span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl lg:text-3xl text-blue-600 mb-2 h-12 font-semibold"
                  >
                    Frontend Developer | React Enthusiast
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-lg text-gray-600 mb-8 leading-relaxed"
                  >
                    Delivering immersive digital experiences through a blend of creativity, technical excellence, and
                    purposeful design.
                  </motion.div>
                </div>

                {/* Social Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex space-x-6"
                >
                  {[
                    { icon: Github, href: "https://github.com/yukesshwaran21", color: "hover:text-gray-700", bg: "hover:bg-gray-100" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/yukesshwaran-k-t-5149222b0", color: "hover:text-blue-600", bg: "hover:bg-blue-50" },
                    { icon: Instagram, href: "https://www.instagram.com/itz_me_yukessh", color: "hover:text-pink-600", bg: "hover:bg-pink-50" },
                    { icon: Mail, href: "mailto:yukesshwaran6@gmail.com?subject=Contact%20from%20Portfolio", color: "hover:text-green-600", bg: "hover:bg-green-50", isMail: true },
                  ].map(({ icon: Icon, href, color, bg, isMail }, index) => {
                    if (isMail) {
                      // Accessible mail icon: open mail client on click or Enter/Space
                      return (
                        <motion.a
                          key={index}
                          href={href}
                          tabIndex={0}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`text-gray-600 ${color} p-3 rounded-full bg-white/80 backdrop-blur-sm ${bg} transition-all duration-200 ease-in-out shadow-md hover:shadow-lg border border-gray-200`}
                          style={{ cursor: 'pointer' }}
                          aria-label="Send mail"
                          role="button"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            window.location.href = href;
                          }}
                          onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              window.location.href = href;
                            }
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.a>
                      );
                    }
                    return (
                      <motion.a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`text-gray-600 ${color} p-3 rounded-full bg-white/80 backdrop-blur-sm ${bg} transition-all duration-200 ease-in-out shadow-md hover:shadow-lg border border-gray-200`}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </motion.div>

                {/* Resume Download and Contact Me Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex gap-4"
                >
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg shadow-blue-500/25"
                    id="contact-me-btn"
                  >
                    Contact Me
                  </Button>
                  <Button
                    asChild
                  >
                    <a
                      href="/Yukesshwaran[22ITR120] (6).pdf"
                      download
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 p-1"
                  >
                    <div className="w-full h-full rounded-full bg-white" />
                  </motion.div>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src="/placeholder.svg?height=400&width=400"
                    alt="Yukesshwaran"
                    className="relative z-10 w-80 h-80 rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-full blur-xl"
                  />
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.button
                onClick={() => scrollToSection("about")}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <ChevronDown className="w-8 h-8" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-20 bg-gray-50/50 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Personal Details Card (from screenshot) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200 ml-8 lg:ml-24 xl:ml-40"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  Personal Details
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600">⚙️</span>
                    <div>
                      <div className="font-semibold text-gray-700">Tech Stack</div>
                      <div className="text-gray-600"> Full Stack, Java, C</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600">🎓</span>
                    <div>
                      <div className="font-semibold text-gray-700">Education</div>
                      <div className="text-gray-600">B.Tech in Information Technology<br />Kongu Engineering College, Erode (2022-2026)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600">📞</span>
                    <div>
                      <div className="font-semibold text-gray-700">Contact Number</div>
                      <div className="text-gray-600">8072686330</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600">🈯</span>
                    <div>
                      <div className="font-semibold text-gray-700">Languages</div>
                      <div className="text-gray-600">Tamil, English</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600">🎖️</span>
                    <div>
                      <div className="font-semibold text-gray-700">Certification:</div>
                      <div className="text-gray-600">AWS Cloud Practitioner</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 mr-8 lg:mr-20 xl:mr-30"
              >
                <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2 !text-2xl">
                  I'm Yukessh
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  I am an Information Technology undergraduate from KEC. I am very passionate about improving my
                  coding skills & developing applications & websites. I build WebApps and Websites using MERN Stack.
                  Working for myself to improve my skills. Love to build Full-Stack clones.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  <span style={{ color: 'blue' }}>Email : </span>yukesshwaran6@gmail.com
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  <span style={{ color: 'blue' }}>Place : </span>Erode,TamilNadu - 638453
                </p>
                {/* Social Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex space-x-6"
                >
                  {[
                    { icon: Github, href: "https://github.com/yukesshwaran21", color: "hover:text-gray-700", bg: "hover:bg-gray-100" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/yukesshwaran-k-t-5149222b0", color: "hover:text-blue-600", bg: "hover:bg-blue-50" },
                    { icon: Instagram, href: "https://www.instagram.com/itz_me_yukessh", color: "hover:text-pink-600", bg: "hover:bg-pink-50" },
                    { icon: Mail, href: "mailto:yukesshwaran6@gmail.com?subject=Contact%20from%20Portfolio", color: "hover:text-green-600", bg: "hover:bg-green-50", isMail: true },
                  ].map(({ icon: Icon, href, color, bg, isMail }, index) => {
                    if (isMail) {
                      return (
                        <motion.a
                          key={index}
                          href={href}
                          tabIndex={0}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`text-gray-600 ${color} p-3 rounded-full bg-white/80 backdrop-blur-sm ${bg} transition-all duration-200 ease-in-out shadow-md hover:shadow-lg border border-gray-200`}
                          style={{ cursor: 'pointer' }}
                          aria-label="Send mail"
                          role="button"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            window.location.href = href;
                          }}
                          onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              window.location.href = href;
                            }
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.a>
                      );
                    }
                    return (
                      <motion.a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`text-gray-600 ${color} p-3 rounded-full bg-white/80 backdrop-blur-sm ${bg} transition-all duration-200 ease-in-out shadow-md hover:shadow-lg border border-gray-200`}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </motion.div>

              </motion.div>
            </div>
          </div>
        </motion.section>
        <div className="my-12 border-t border-blue-400/20 dark:border-purple-400/20 w-full opacity-60" />

        {/* Skills Section */}
        <section id="skills" className="py-20 relative z-10">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Skills & Expertise
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillsGroups.map((group, idx) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col"
                >
                  <div className="flex items-center mb-4 text-xl font-bold text-gray-800">
                    <span className="mr-2 text-2xl">{group.icon}</span> {group.title}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-3xl mb-1">{skill.icon}</span>
                        <span className="text-gray-700 text-sm text-center font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <div className="my-12 border-t border-blue-400/20 dark:border-purple-400/20 w-full opacity-60" />
        {/* Experience Section */}
        <section id="experience" className="py-20 bg-gray-50/50 relative z-10">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Experience
            </motion.h2>

            <div className="relative max-w-6xl mx-auto">
              {/* Vertical timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 transform -translate-x-1/2" />

              <div className="space-y-16">
                {/* Timeline Item 1 (Right side) */}
                <div className="relative flex items-center">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full border-4 border-white shadow-lg z-20" />

                  {/* Year on left */}
                  <div className="w-1/2 flex justify-end pr-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-blue-600 font-bold text-lg whitespace-nowrap"
                    >
                      July 2024 to August 2024
                    </motion.div>
                  </div>

                  {/* Content on right */}
                  <div className="w-1/2 flex justify-start pl-8">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow max-w-md"
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Cognifyz Technologies</h3>
                        <h4 className="text-lg font-semibold text-blue-600 mb-3">Front-End Development</h4>
                      </div>

                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Responsibilities:</h5>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Built an end-to-end responsive web applications using React, HTML, and CSS,
                          focusing on clean UI design and seamless user experience.
                        </p>
                      </div>

                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Tools Used:</h5>
                        <div className="flex flex-wrap gap-2">
                          {["React.js", "Java Script", "HTML", "CSS"].map((tool, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.a
                        href="/YUKESSHWARAN K T (3).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                          <Award className="w-4 h-4 mr-2 inline" />
                          Completion Letter
                        </button>
                      </motion.a>
                    </motion.div>
                  </div>
                </div>

                {/* Timeline Item 2 (Left side) */}
                <div className="relative flex items-center">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full border-4 border-white shadow-lg z-20" />

                  {/* Content on left */}
                  <div className="w-1/2 flex justify-end pr-8">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow max-w-md"
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Prodigy InfoTech</h3>
                        <h4 className="text-lg font-semibold text-blue-600 mb-3">Full-Stack Web Development</h4>
                      </div>

                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Responsibilities:</h5>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Delivered fully functional full-stack applications using React for the frontend and Node.js with MongoDB
                          for the backend, focusing on responsive design solutions.
                        </p>
                      </div>

                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Tools Used:</h5>
                        <div className="flex flex-wrap gap-2">
                          {["React.js", "HTML", "CSS", "JavaScript", "Node.js"].map((tool, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.a
                        href="/Certificate (2).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                          <Award className="w-4 h-4 mr-2 inline" />
                          Completion Letter
                        </button>
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Year on right */}
                  <div className="w-1/2 flex justify-start pl-8">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-blue-600 font-bold text-lg whitespace-nowrap"
                    >
                     1st September 2024 to 30th September 2024
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="my-12 border-t border-blue-400/20 dark:border-purple-400/20 w-full opacity-60" />
        {/* Education Section */}
        <section id="education" className="py-20 relative z-10">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Education
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* BE Computer Science */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Kongu Engineering College"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">B.Tech in Information Technology</h3>
                  <h4 className="text-lg font-semibold text-blue-600 mb-4">Kongu Engineering College</h4>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>2022 - 2026</span>
                      <span className="ml-4 text-purple-600 font-semibold">CGPA: 7.45/10 (Till 5th Semester)</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Erode, Tamil Nadu</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    Pursuing a Bachelor's degree in Information Technology with core interests in full-stack development, IT infrastructure, and hands-on project implementation.
                  </p>
                </div>
              </motion.div>

              {/* Class XII */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Kendriya Vidyalaya Gandhigram"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Class XII </h3>
                  <h4 className="text-lg font-semibold text-blue-600 mb-4">Saratha Matric Higher Scondary School</h4>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>2021 - 2022</span>
                      <span className="ml-4 text-purple-600 font-semibold">Percentage: 77.5%</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Erode, Tamil Nadu</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    Pursued higher secondary education under the State Board in the Biology stream, focusing on core sciences including Physics, and Chemistry.
                  </p>
                </div>
              </motion.div>

              {/* Class X */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Kendriya Vidyalaya Gandhigram"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Class X </h3>
                  <h4 className="text-lg font-semibold text-blue-600 mb-4">Saratha Matric Higher Scondary School</h4>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>2019 - 2020</span>
                      <span className="ml-4 text-purple-600 font-semibold">Percentage: 91.4%</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Erode, Tamil Nadu</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    Pursued secondary education under the State Board syllabus, emphasizing analytical skills in Science and Mathematics.

                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <div className="my-12 border-t border-blue-400/20 dark:border-purple-400/20 w-full opacity-60" />
        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gray-50/50 relative z-10">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Featured Projects
            </motion.h2>
            {/* Project Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {projectTags.map((tag) => (
                <Button
                  key={tag}
                  variant={projectFilter === tag ? "default" : "outline"}
                  onClick={() => setProjectFilter(tag)}
                  className={`${projectFilter === tag
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    : "border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300"
                    } transition-all duration-300`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {tag}
                </Button>
              ))}
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Card className="bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors shadow-lg"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.button>
                          <motion.a
                            href={project.githubUrl}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors shadow-lg"
                          >
                            <Github className="w-4 h-4" />
                          </motion.a>
                        </div>
                        {project.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="outline"
                              className="border-indigo-300 text-indigo-600 bg-indigo-50"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
        <div className="my-12 border-t border-blue-400/20 dark:border-purple-400/20 w-full opacity-60" />
        {/* Contact Section */}
        <section id="contact" className="py-20 relative z-10">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Let's Connect
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center text-xl text-gray-600 mb-16 max-w-2xl mx-auto"
            >
              Loved what you saw? Let's build something awesome together.
            </motion.p>

            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in touch</h3>
                    <p className="text-gray-600 leading-relaxed">
                      I'm always interested in new opportunities and exciting projects. Whether you have a question or
                      just want to say hi, feel free to reach out!
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: Mail, text: "alex@example.com", href: "mailto:alex@example.com" },
                      { icon: Github, text: "github.com/alexjohnson", href: "#" },
                      { icon: Linkedin, text: "linkedin.com/in/alexjohnson", href: "#" },
                    ].map(({ icon: Icon, text, href }, index) => (
                      <motion.a
                        key={index}
                        href={href}
                        whileHover={{ x: 10 }}
                        className="flex items-center space-x-4 text-gray-600 hover:text-blue-600 transition-colors group"
                      >
                        <div className="p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors border border-gray-200">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span>{text}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="bg-white border border-gray-200 shadow-lg">
                    <CardContent className="p-6">
                      <form className="space-y-6">
                        <div>
                          <Input
                            placeholder="Your Name"
                            className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Your Email"
                            className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                          />
                        </div>
                        <div>
                          <Textarea
                            placeholder="Your Message"
                            rows={5}
                            className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 hover:border-blue-400 resize-none transition-colors"
                          />
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                          >
                            <Zap className="w-5 h-5 mr-2" />
                            Send Message
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <div className="my-12 border-t border-blue-400/20 dark:border-purple-400/20 w-full opacity-60" />
        {/* Footer */}
        <footer className="py-8 border-t border-gray-200 bg-gray-50/50 relative z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-600">© 2024 Yukesshwaran. Crafted with passion for a brighter web. ✨</p>
              </div>
              <div className="flex items-center space-x-6">
                {[
                  { icon: Github, href: "https://github.com/yukesshwaran21", color: "hover:text-gray-700" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/yukesshwaran-k-t-5149222b0", color: "hover:text-blue-600" },
                  { icon: Instagram, href: "https://www.instagram.com/itz_me_yukessh", color: "hover:text-pink-600" },
                  { icon: Mail, href: "mailto:yukesshwaran6@gmail.com?subject=Contact%20from%20Portfolio", color: "hover:text-green-600", isMail: true },
                ].map(({ icon: Icon, href, color, isMail }, index) => {
                  if (isMail) {
                    return (
                      <motion.a
                        key={index}
                        href={href}
                        tabIndex={0}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-gray-500 ${color} transition-all duration-300`}
                        style={{ cursor: 'pointer' }}
                        aria-label="Send mail"
                        role="button"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          window.location.href = href;
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            window.location.href = href;
                          }
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  }
                  return (
                    <motion.a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`text-gray-500 ${color} transition-all duration-300`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white shadow-lg hover:shadow-xl transition-shadow z-30 hover:shadow-blue-500/25"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
