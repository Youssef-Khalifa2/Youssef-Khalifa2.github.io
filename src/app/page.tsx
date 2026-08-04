"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { projects, Project } from "./data";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import mermaid from "mermaid";
import AntigravityBackground from "./AntigravityBackground";

// Initialize Mermaid once
if (typeof window !== "undefined") {
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
    fontFamily: "var(--font-geist-sans)",
    themeVariables: {
      primaryColor: "#ffffff",
      primaryTextColor: "#ffffff",
      primaryBorderColor: "#ffffff",
      lineColor: "#ffffff",
      secondaryColor: "#ffffff",
      tertiaryColor: "#ffffff",
      mainBkg: "transparent",
      nodeBorder: "#ffffff",
      clusterBkg: "transparent",
      titleColor: "#ffffff",
      edgeLabelBackground: "transparent",
    }
  });
}

const MermaidDiagram = ({ chart, id }: { chart: string, id: string }) => {
  const [svg, setSvg] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderChart = async () => {
      try {
        const { svg: rawSvg } = await mermaid.render(`mermaid-${id.replace(/-/g, '')}`, chart);
        
        // Inject preserveAspectRatio to handle scaling correctly
        const scaledSvg = rawSvg.replace(
          /<svg /, 
          '<svg preserveAspectRatio="xMidYMid meet" width="100%" height="100%" '
        );
        
        setSvg(scaledSvg);
      } catch (error) {
        console.error("Mermaid rendering failed:", error);
      }
    };
    renderChart();
  }, [chart, id]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center p-4 md:p-8"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeDiagram, setActiveDiagram] = useState<{ chart: string; title: string; accentColor: string } | null>(null);

  const categories = ["All", "Agentic & LLMOps", "MLOps & Infrastructure", "Computer Vision & Audio"];

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="snap-container text-white bg-black selection:bg-white selection:text-black relative">
      {/* Dynamic Antigravity Interactive Grid & Particle Background */}
      <AntigravityBackground />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Floating Header Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-5xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between shadow-2xl transition-all">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
          <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 relative shrink-0">
            <Image src="/profile.jpg" alt="Youssef Khalifa" fill className="object-cover" />
          </div>
          <span className="text-xs font-bold tracking-tight hidden sm:inline-block">Youssef Khalifa</span>
        </div>

        <nav className="flex items-center gap-4 md:gap-8 text-[11px] font-mono uppercase tracking-widest text-zinc-400">
          <button onClick={() => scrollToSection("hero")} className="hover:text-white transition-colors">Hero</button>
          <button onClick={() => scrollToSection(projects[0].id)} className="hover:text-white transition-colors">Projects</button>
          <button onClick={() => scrollToSection("directory")} className="hover:text-white transition-colors">Directory</button>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/Youssef_Khalifa_CV.pdf"
            target="_blank"
            className="px-3 md:px-4 py-1.5 bg-white text-black text-[10px] md:text-xs font-bold rounded-full hover:bg-zinc-200 transition-all uppercase tracking-wider"
          >
            CV
          </a>
        </div>
      </header>

      {/* 1. Greeting / Hero Section */}
      <section id="hero" className="snap-section bg-black px-fluid-m relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[65%] h-[65%] bg-blue-600 rounded-full blur-[160px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[65%] h-[65%] bg-purple-600 rounded-full blur-[160px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl z-10 w-full pt-16 md:pt-0"
        >
          <div className="flex flex-col md:flex-row items-center gap-fluid-m mb-6 md:mb-10">
            <div className="relative w-28 h-28 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl shrink-0">
              <Image 
                src="/profile.jpg" 
                alt="Youssef Khalifa" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center md:text-left mt-3 md:mt-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Senior AI & MLOps Roles
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-[0.95] mb-3">
                Youssef Khalifa
              </h1>
              <h2 className="text-lg md:text-2xl font-medium text-zinc-400 tracking-tight">
                Architecting Autonomous Intelligence & Enterprise MLOps Systems
              </h2>
            </div>
          </div>
          
          {/* Key Quantitative Impact Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 md:mb-8">
            {[
              { stat: "8", label: "Production AI Systems" },
              { stat: "70+", label: "Live Deployed Models" },
              { stat: "30 FPS", label: "Real-time Computer Vision" },
              { stat: "< 200ms", label: "FAISS Similarity Search" }
            ].map((item, idx) => (
              <div key={idx} className="p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="text-lg md:text-2xl font-mono font-bold text-white mb-0.5">{item.stat}</div>
                <div className="text-[10px] md:text-[11px] text-zinc-400 font-mono uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-m">
            <div className="space-y-4">
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-light">
                1.5+ years of production experience owning end-to-end AI architectures — from multi-agent orchestration engines to distributed MLOps pipelines and real-time computer vision infrastructure.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                 {["Agentic Workflows", "MLOps & LLMOps", "Computer Vision", "Deterministic Tools", "Azure AI Foundry"].map(tag => (
                   <span key={tag} className="px-3 py-1 border border-white/10 rounded-full text-[9px] md:text-[10px] font-mono uppercase tracking-wider bg-white/5 text-zinc-300">
                     {tag}
                   </span>
                 ))}
              </div>
            </div>
            <div className="space-y-3 text-xs md:text-sm text-zinc-400 border-l border-white/10 pl-fluid-s">
               <p><strong className="text-white">Currently:</strong> Automating enterprise workflows & building a Sketch → AutoCAD generator.</p>
               <p><strong className="text-white">Focus:</strong> Multi-Agent Orchestration, Continuous Eval Gates, and Model Drift Monitoring.</p>
               <p className="italic text-zinc-500">Open to collaboration on Nuanced Computer Vision & Audio Systems.</p>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="hidden md:block mt-8 opacity-40 text-xs font-mono uppercase tracking-widest text-center md:text-left cursor-pointer"
            onClick={() => scrollToSection(projects[0].id)}
          >
            ↓ Scroll to explore projects
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Project Sections */}
      {projects.map((project, index) => (
        <section
          key={project.id}
          id={project.id}
          className="snap-section px-fluid-m transition-colors duration-1000 group relative"
          style={{ backgroundColor: project.moodColor }}
        >
          {/* Ambient Accent Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[140px] pointer-events-none"
            style={{ backgroundColor: project.accentColor }}
          />

          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-fluid-m lg:gap-fluid-l items-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4 md:space-y-fluid-s order-2 lg:order-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/10">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-white/40 font-bold tracking-widest">
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map(tech => (
                  <span key={tech} className="text-[9px] md:text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
                {project.title}
              </h2>
              
              <p className="text-sm md:text-base text-zinc-200/90 max-w-xl leading-relaxed font-light">
                {project.description}
              </p>

              <div className="pt-2 md:pt-4 flex items-center justify-between border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 md:w-12 bg-white/30" />
                  {project.link.startsWith('http') ? (
                     <a 
                       href={project.link} 
                       target="_blank" 
                       rel="noreferrer" 
                       className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                     >
                       View Codebase ↗
                     </a>
                  ) : (
                     <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-50 italic">{project.link}</span>
                  )}
                </div>

                <button
                  onClick={() => setActiveDiagram({ chart: project.mermaidConfig, title: project.title, accentColor: project.accentColor })}
                  className="text-[10px] md:text-xs font-mono uppercase tracking-wider px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-zinc-300"
                >
                  Expand Diagram ↗
                </button>
              </div>
            </motion.div>

            {/* Visual Proof / Mermaid Diagram Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-2 flex justify-center lg:justify-end w-full cursor-pointer group"
              onClick={() => setActiveDiagram({ chart: project.mermaidConfig, title: project.title, accentColor: project.accentColor })}
            >
               <div className="w-full aspect-square md:aspect-video rounded-2xl bg-black/40 border border-white/15 backdrop-blur-3xl overflow-hidden group-hover:border-white/30 transition-all shadow-2xl flex items-center justify-center relative">
                  <MermaidDiagram chart={project.mermaidConfig} id={project.id} />
                  
                  <div className="absolute top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-2.5 py-1 rounded text-[9px] font-mono uppercase tracking-widest text-zinc-300 border border-white/10">
                    Click to Zoom
                  </div>
                  
                  <div className="absolute bottom-4 left-6 hidden md:block">
                     <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Architecture Logic</span>
                  </div>
               </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* 3. Final Directory Section */}
      <section id="directory" className="snap-section bg-zinc-950 px-fluid-m py-fluid-l overflow-y-auto h-screen">
        <div className="max-w-6xl w-full mx-auto my-auto min-h-full flex flex-col justify-center py-16">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Project Directory</h2>
              <p className="text-zinc-400 text-xs md:text-sm max-w-md leading-relaxed">
                Production-scale implementations across multi-agent AI ecosystems, MLOps platforms, and computer vision.
              </p>
            </div>
            <a 
              href="/Youssef_Khalifa_CV.pdf" 
              target="_blank" 
              className="px-6 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-zinc-200 transition-colors uppercase tracking-widest text-center shadow-lg"
            >
               Download CV
            </a>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? "bg-white text-black border-white font-bold"
                    : "bg-zinc-900/60 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={`${project.id}-thumb`}
                whileHover={{ y: -4, borderColor: project.accentColor }}
                className="bg-zinc-900/50 p-4 rounded-xl border border-white/10 cursor-pointer transition-all group backdrop-blur-md flex flex-col justify-between"
                onClick={() => scrollToSection(project.id)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-1 w-7 rounded-full" style={{ backgroundColor: project.accentColor }} />
                    <span className="text-[8px] font-mono uppercase text-zinc-500 tracking-wider">{project.category.split(' ')[0]}</span>
                  </div>
                  <h3 className="text-sm font-bold mb-1.5 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-4 line-clamp-3 font-light">{project.oneLiner}</p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                   {project.techStack.slice(0, 3).map(tech => (
                     <span key={tech} className="text-[8px] font-mono text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded uppercase">{tech}</span>
                   ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Contact Info */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold tracking-tight">Youssef Khalifa</h3>
              <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Architect · Deploy · Monitor</p>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
              <a href="https://github.com/Youssef-Khalifa2" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/youssef-khalifa-862523253/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn ↗</a>
              <a href="mailto:youssefkhalifa458@gmail.com" className="hover:text-white transition-colors">Contact ✉</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Architecture Diagram Zoom Modal */}
      <AnimatePresence>
        {activeDiagram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveDiagram(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-950 border border-white/20 rounded-2xl w-full max-w-4xl max-h-[85vh] p-6 md:p-8 flex flex-col shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Architecture Diagram</span>
                  <h3 className="text-lg md:text-xl font-bold text-white">{activeDiagram.title}</h3>
                </div>
                <button
                  onClick={() => setActiveDiagram(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 w-full min-h-[300px] md:min-h-[450px] flex items-center justify-center overflow-auto p-2">
                <MermaidDiagram chart={activeDiagram.chart} id={`modal-${activeDiagram.title}`} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

