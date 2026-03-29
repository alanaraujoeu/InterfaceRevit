'use client';

import React, {useState, useEffect} from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  FolderOpen,
  LayoutGrid,
  Settings2,
  CheckCircle2,
  Circle,
  Star,
} from 'lucide-react';
import {motion, AnimatePresence} from 'motion/react';
import {Module, Lesson} from '@/lib/data';
import {cn} from '@/lib/utils';

interface LessonSidebarProps {
  modules: Module[];
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  onToggleComplete: (lessonId: string) => void;
  progress: Record<string, boolean>;
}

export default function LessonSidebar({
  modules,
  currentLessonId,
  onSelectLesson,
  onToggleComplete,
  progress,
}: LessonSidebarProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const isCurrentlyExpanded = prev[moduleId] ?? (modules.length > 0 && modules[0].id === moduleId);
      return {
        ...prev,
        [moduleId]: !isCurrentlyExpanded,
      };
    });
  };

  const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessons = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100) || 0;

  return (
    <aside className={cn(
      "bg-revit-black flex flex-col h-full border-r border-revit-border/40 shrink-0 transition-all duration-300 ease-in-out relative",
      isMinimized ? "w-[40px]" : "w-[300px]"
    )}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute -right-3 top-10 z-50 bg-revit-accent text-revit-black p-1 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {isMinimized ? <ChevronRight size={14} strokeWidth={3} /> : <ChevronLeft size={14} strokeWidth={3} />}
      </button>

      <div className={cn("p-4 border-b border-revit-border/20 flex items-center justify-between", isMinimized && "p-2 flex-col gap-4")}>
        {!isMinimized ? (
          <div>
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-widest text-revit-accent">
              Lesson Manager
            </h2>
            <p className="text-[0.625rem] text-revit-text-gray mt-1">
              BIM Fundamental Certification
            </p>
          </div>
        ) : (
          <LayoutGrid size={18} className="text-revit-accent" />
        )}
        <div className={cn(isMinimized ? "w-full flex justify-center" : "")}>
        </div>
      </div>

      <div className={cn("flex-1 overflow-y-auto custom-scrollbar", isMinimized && "hidden")}>
        {(modules || []).map((mod, idx) => {
          const isExpanded = expandedModules[mod.id] ?? (modules.length > 0 && modules[0].id === mod.id);
          const completedInModule = mod.lessons.filter((l) => progress[l.id]).length;
          const totalInModule = mod.lessons.length;

          return (
            <div key={mod.id} className="border-b border-revit-border/10">
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between px-3 py-3 text-[0.6875rem] font-medium text-on-surface hover:bg-revit-dark transition-colors"
              >
                <div className="flex items-center gap-2">
                  {idx % 3 === 0 ? (
                    <FolderOpen size={14} className="text-revit-accent" />
                  ) : idx % 3 === 1 ? (
                    <LayoutGrid size={14} className="text-revit-accent" />
                  ) : (
                    <Settings2 size={14} className="text-revit-accent" />
                  )}
                  <div className="flex flex-col items-start">
                    <span className="truncate max-w-[180px] font-bold">{mod.title}</span>
                    <span className="text-[0.5625rem] text-revit-text-gray font-normal">
                      {mod.lessons.reduce((acc, l) => acc + (parseInt(l.duration) || 0), 0)} min • {completedInModule}/{totalInModule} aulas
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{rotate: isExpanded ? 180 : 0}}
                  transition={{duration: 0.2}}
                >
                  <ChevronDown size={14} className="text-revit-text-gray" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{duration: 0.3, ease: 'easeInOut'}}
                    className="overflow-hidden bg-black/10"
                  >
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={cn(
                          'flex items-center px-4 py-2 hover:bg-revit-dark cursor-pointer group transition-colors',
                          currentLessonId === lesson.id && 'bg-revit-dark border-l-2 border-revit-accent'
                        )}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleComplete(lesson.id);
                          }}
                          className="shrink-0"
                        >
                          {progress[lesson.id] ? (
                            <CheckCircle2 size={14} className="text-revit-accent" />
                          ) : (
                            <Circle size={14} className="text-revit-text-gray group-hover:text-revit-accent" />
                          )}
                        </button>
                        <div className="flex flex-col ml-3 overflow-hidden">
                          <span
                            className={cn(
                              'text-[0.6875rem] text-revit-text-gray group-hover:text-on-surface truncate transition-colors',
                              currentLessonId === lesson.id && 'text-revit-accent font-semibold'
                            )}
                          >
                            {lesson.title}
                          </span>
                          <span className="text-[0.5rem] text-revit-text-gray/60 font-medium">
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {!isMinimized && (
        <div className="p-4 bg-black/30 border-t border-revit-border/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[0.625rem] text-revit-text-gray font-bold uppercase tracking-wider">
              Total Progress
            </span>
            <span className="text-[0.6875rem] text-revit-accent font-bold">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-1 bg-revit-border/40 overflow-hidden rounded-full">
            <motion.div
              initial={{width: 0}}
              animate={{width: `${progressPercent}%`}}
              className="h-full bg-revit-accent"
            />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Star size={12} className="text-revit-accent fill-revit-accent" />
            <span className="text-[0.625rem] text-revit-text-gray">
              {completedLessons}/{totalLessons} Lessons completed
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
