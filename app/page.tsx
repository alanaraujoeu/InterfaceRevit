'use client';

import React, {useState, useEffect} from 'react';
import LessonSidebar from '@/components/LessonSidebar';
import MiniCourseModal from '@/components/MiniCourseModal';
import Ribbon from '@/components/Ribbon';
import RobotAssistant from '@/components/RobotAssistant';
import {COURSE_DATA, Lesson, Module} from '@/lib/data';
import {motion, AnimatePresence} from 'motion/react';
import {Ruler, Layers, Box, MousePointer2, Filter, RefreshCw, Loader2, Maximize2, Minimize2} from 'lucide-react';
import {cn} from '@/lib/utils';

export default function BIMAcademy() {
  const [modules, setModules] = useState<Module[]>(COURSE_DATA);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(COURSE_DATA[0].lessons[0]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [miniCourseSidebar, setMiniCourseSidebar] = useState<{isOpen: boolean; title: string; modules: Module[]} | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sleep') === 'true') {
      setIsSleeping(true);
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/course');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setModules(data);
          setCurrentLesson(data[0].lessons[0]);
          localStorage.setItem('bim_academy_data', JSON.stringify(data));
        }
      }
    } catch (error) {
      console.error('Failed to fetch course data from API', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem('bim_academy_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setModules(parsed);
        setCurrentLesson(parsed[0].lessons[0]);
        setIsLoading(false);
      } catch (e) {
        console.error('Failed to parse cached data', e);
        fetchData();
      }
    } else {
      fetchData();
    }

    const saved = localStorage.getItem('bim_academy_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullScreen]);

  const handleToggleComplete = (lessonId: string) => {
    const newProgress = {
      ...progress,
      [lessonId]: !progress[lessonId],
    };
    setProgress(newProgress);
    localStorage.setItem('bim_academy_progress', JSON.stringify(newProgress));
  };

  const openMiniCourse = (title: string) => {
    // In a real app, you would fetch data for the specific module here.
    // For now, we use the existing COURSE_DATA as a placeholder.
    setMiniCourseSidebar({isOpen: true, title, modules: COURSE_DATA});
  };

  const handleSelectLesson = (name: string) => {
    for (const mod of modules) {
      const lesson = mod.lessons.find((l) => l.title === name);
      if (lesson) {
        setCurrentLesson(lesson);
        return;
      }
    }
    console.log(`Lesson not found for command: ${name}`);
  };

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col h-screen w-full bg-surface overflow-hidden">
      <Ribbon onRefresh={fetchData} openMiniCourse={openMiniCourse} onSelectLesson={handleSelectLesson} />

      <div className="flex flex-1 overflow-hidden">
        <LessonSidebar
          modules={modules}
          currentLessonId={currentLesson.id}
          onSelectLesson={setCurrentLesson}
          onToggleComplete={handleToggleComplete}
          progress={progress}
        />

        <main className="flex-1 bg-surface relative flex flex-col overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 z-50 bg-surface/80 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-revit-accent animate-spin" />
                <p className="text-xs text-revit-text-gray font-medium uppercase tracking-widest">Sincronizando Planilha...</p>
              </div>
            </div>
          )}
          {/* Grid Canvas & Video Player */}
          <div className="flex-1 grid-canvas flex items-center justify-center relative p-4 md:p-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLesson.id}
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 1.05}}
                transition={{duration: 0.4, ease: 'easeOut'}}
                className={cn(
                  "relative z-10 border border-white/5 rounded-sm overflow-hidden flex items-center justify-center transition-all duration-500 group",
                  isFullScreen 
                    ? "fixed inset-0 w-screen h-screen max-w-none max-h-none aspect-none z-[10005] bg-black" 
                    : "w-full max-w-[90%] max-h-[90%] aspect-video bg-black shadow-2xl"
                )}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${currentLesson.videoId}?autoplay=0&rel=0&modestbranding=1`}
                  title={currentLesson.title}
                  className="w-full h-full absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                
                {/* Fullscreen Toggle Button */}
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all border border-white/10 opacity-0 group-hover:opacity-100"
                  title={isFullScreen ? "Sair da Tela Cheia" : "Tela Cheia"}
                >
                  {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Background decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <div className="w-[900px] h-[600px] border border-revit-accent/20 relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-revit-accent/10" />
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-revit-accent/10" />
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <footer className="h-8 bg-revit-black flex items-center px-4 border-t border-revit-border/15 z-50">
            <div className="flex items-center space-x-4 h-full">
              <button className="text-[0.625rem] font-medium text-revit-text-gray hover:text-white flex items-center gap-1 transition-colors">
                <Ruler size={12} />
                1:100
              </button>
              <div className="h-4 w-[1px] bg-revit-border/30" />
              <button className="text-[0.625rem] font-medium text-revit-text-gray hover:text-white flex items-center gap-1 transition-colors">
                <Layers size={12} />
                Medium
              </button>
              <div className="h-4 w-[1px] bg-revit-border/30" />
              <button className="text-[0.625rem] font-medium text-revit-accent bg-revit-accent/10 px-2 h-6 rounded-sm flex items-center gap-1">
                <Box size={12} />
                Hidden Line
              </button>
              <div className="h-4 w-[1px] bg-revit-border/30" />
              <button className="text-[0.625rem] font-medium text-revit-text-gray hover:text-white flex items-center gap-1 transition-colors">
                <MousePointer2 size={12} />
                Select
              </button>
            </div>
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              <span className="text-[0.5625rem] text-revit-text-gray uppercase tracking-widest font-bold">
                Ready
              </span>
              <div className="flex space-x-3">
                <Filter size={14} className="text-revit-accent cursor-pointer hover:scale-110 transition-transform" />
                <RefreshCw 
                  size={14} 
                  className="text-revit-text-gray cursor-pointer hover:rotate-180 transition-all duration-500" 
                  onClick={fetchData}
                />
              </div>
            </div>
          </footer>
        </main>
      </div>

      <RobotAssistant isSleeping={isSleeping} progress={progress} onSleep={() => setIsSleeping(!isSleeping)} />
      
      <AnimatePresence>
        {miniCourseSidebar && (
          <MiniCourseModal
            moduleTitle={miniCourseSidebar.title}
            modules={miniCourseSidebar.modules}
            onClose={() => setMiniCourseSidebar(null)}
            onSelectLesson={setCurrentLesson}
            onToggleComplete={handleToggleComplete}
            progress={progress}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
