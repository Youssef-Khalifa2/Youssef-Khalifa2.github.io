"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { projects } from "./data";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import mermaid from "mermaid";

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

  const scrollToProject = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="snap-container text-white bg-black selection:bg-white selection:text-black">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
        style={{ scaleX }}
      />

      {/* 1. Greeting Section */}
      <section className="snap-section bg-black px-fluid-m relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500 rounded-full blur-[150px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl z-10 w-full"
        >
          <div className="flex flex-col md:flex-row items-center gap-fluid-m mb-8 md:mb-12">
            <div className="relative w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
              <Image 
                src="/profile.jpg" 
                alt="Youssef Khalifa" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center md:text-left mt-4 md:mt-0">
              <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase opacity-40 mb-2 block">
                AI / MLOps Engineer
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] mb-4">
                Youssef Khalifa
              </h1>
              <h2 className="text-xl md:text-3xl font-medium text-zinc-500 tracking-tight">
                I build autonomous intelligence systems.
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-m">
            <div className="space-y-6">
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-light">
                1.5+ years of production experience owning end-to-end ML systems. 
                From architecting 30 FPS computer vision pipelines to deploying LLMOps infrastructure at enterprise scale.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                 {["MLOps", "LLMOps", "Computer Vision"].map(tag => (
                   <span key={tag} className="px-3 py-1.5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-mono uppercase tracking-wider bg-white/5">
                     {tag}
                   </span>
                 ))}
              </div>
            </div>
            <div className="space-y-4 text-xs md:text-sm text-zinc-400 border-l border-white/10 pl-fluid-s">
               <p><strong className="text-white">Currently:</strong> Automating enterprise workflows & building a Sketch → AutoCAD generator.</p>
               <p><strong className="text-white">Dream:</strong> Integrating machine learning to improve human mental health.</p>
               <p className="italic">Looking to collaborate on Nuanced CV & Computer Audio systems.</p>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="hidden md:block mt-fluid-l opacity-20 text-xl font-light text-center md:text-left"
          >
            Scroll to explore projects
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Project Sections */}
      {projects.map((project) => (
        <section
          key={project.id}
          id={project.id}
          className="snap-section px-fluid-m transition-colors duration-1000 group relative"
          style={{ backgroundColor: project.moodColor }}
        >
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-fluid-m lg:gap-fluid-l items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4 md:space-y-fluid-s order-2 lg:order-1"
            >
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="text-[9px] md:text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl md:text-5xl font-bold tracking-tight leading-tight">
                {project.title}
              </h2>
              <p className="text-sm md:text-lg text-zinc-200/90 max-w-xl leading-relaxed font-light">
                {project.description}
              </p>
              <div className="pt-2 md:pt-4 flex items-center gap-4 md:gap-6">
                <div className="h-px w-8 md:w-12 bg-white/20" />
                {project.link.startsWith('http') ? (
                   <a href={project.link} target="_blank" rel="noreferrer" className="text-[10px] md:text-xs font-mono uppercase tracking-widest hover:text-zinc-400 transition-colors">
                     View Repository
                   </a>
                ) : (
                   <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-40 italic">{project.link}</span>
                )}
              </div>
            </motion.div>

            {/* Visual Proof / Mermaid Diagram */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative order-1 lg:order-2 flex justify-center lg:justify-end w-full"
            >
               <div className="w-full aspect-square md:aspect-video rounded-2xl bg-black/30 border border-white/10 backdrop-blur-3xl overflow-hidden group shadow-2xl flex items-center justify-center">
                  <MermaidDiagram chart={project.mermaidConfig} id={project.id} />
                  <div className="absolute bottom-4 left-6 hidden md:block">
                     <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Architecture Logic</span>
                  </div>
               </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* 3. Final Summary Section */}
      <section className="snap-section bg-zinc-950 px-fluid-m py-fluid-l overflow-y-auto h-screen">
        <div className="max-w-6xl w-full mx-auto my-auto min-h-full flex flex-col justify-center py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-fluid-m gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Project Directory</h2>
              <p className="text-zinc-500 text-xs md:text-sm max-w-xs leading-relaxed">A summary of technical contributions and production-scale implementations.</p>
            </div>
            <a href="/Youssef_Khalifa_CV.pdf" target="_blank" className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-zinc-200 transition-colors uppercase tracking-widest text-center">
               Download CV
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 md:mb-fluid-l">
            {projects.map((project) => (
              <motion.div
                key={`${project.id}-thumb`}
                whileHover={{ y: -5, borderColor: project.accentColor }}
                className="bg-zinc-900/40 p-4 md:p-6 rounded-2xl border border-white/5 cursor-pointer transition-all group backdrop-blur-sm"
                onClick={() => scrollToProject(project.id)}
              >
                <div className="h-1 w-8 mb-4 rounded-full" style={{ backgroundColor: project.accentColor }} />
                <h3 className="text-sm md:text-base font-bold mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                <p className="text-[10px] md:text-[11px] text-zinc-500 leading-relaxed mb-4 line-clamp-3">{project.oneLiner}</p>
                <div className="flex flex-wrap gap-1.5">
                   {project.techStack.slice(0,3).map(tech => (
                     <span key={tech} className="text-[8px] md:text-[9px] font-mono text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded uppercase">{tech}</span>
                   ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-fluid-m flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold tracking-tight">Youssef Khalifa</h3>
              <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Scale · Deploy · Monitor</p>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-fluid-m text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
              <a href="https://github.com/Youssef-Khalifa2" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/youssefkhalifa" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:your-email@example.com" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
