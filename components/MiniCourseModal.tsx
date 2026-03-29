'use client';

import React, {useState} from 'react';
import {
  ChevronDown,
  FolderOpen,
  CheckCircle2,
  Circle,
  X,
} from 'lucide-react';
import {motion, AnimatePresence} from 'motion/react';
import {Module, Lesson} from '@/lib/data';
import {cn} from '@/lib/utils';

interface MiniCourseModalProps {
  moduleTitle: string;
  modules: Module[];
  onClose: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onToggleComplete: (lessonId: string) => void;
  progress: Record<string, boolean>;
}

export default function MiniCourseModal({
  moduleTitle,
  modules,
  onClose,
  onSelectLesson,
  onToggleComplete,
  progress,
}: MiniCourseModalProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleSelectLesson = (lesson: Lesson) => {
    onSelectLesson(lesson);
    onClose(); // Destroy modal on selection
  };

  return (
    <div className="fixed inset-0 z-[10006] flex items-center justify-center p-4">
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{opacity: 0, scale: 0.95}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0.95}}
        transition={{type: 'spring', damping: 25, stiffness: 200}}
        className="relative w-full max-w-lg max-h-[80vh] bg-revit-black border border-revit-border/40 rounded-lg shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="p-4 border-b border-revit-border/20 flex items-center justify-between">
          <h2 className="text-[0.875rem] font-bold uppercase tracking-widest text-revit-accent">
            {moduleTitle}
          </h2>
          <button onClick={onClose} className="text-revit-text-gray hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {(modules || []).map((mod) => {
            const isExpanded = expandedModules[mod.id] ?? true;
            const completedInModule = mod.lessons.filter((l) => progress[l.id]).length;
            const totalInModule = mod.lessons.length;

            return (
              <div key={mod.id} className="border-b border-revit-border/10">
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between px-4 py-4 text-[0.75rem] font-medium text-on-surface hover:bg-revit-dark transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen size={16} className="text-revit-accent" />
                    <div className="flex flex-col items-start">
                      <span className="truncate font-bold">{mod.title}</span>
                      <span className="text-[0.625rem] text-revit-text-gray font-normal">
                        {completedInModule}/{totalInModule} aulas
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{rotate: isExpanded ? 180 : 0}}
                    transition={{duration: 0.2}}
                  >
                    <ChevronDown size={16} className="text-revit-text-gray" />
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
                          onClick={() => handleSelectLesson(lesson)}
                          className="flex items-center px-6 py-3 hover:bg-revit-dark cursor-pointer group transition-colors"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleComplete(lesson.id);
                            }}
                            className="shrink-0"
                          >
                            {progress[lesson.id] ? (
                              <CheckCircle2 size={16} className="text-revit-accent" />
                            ) : (
                              <Circle size={16} className="text-revit-text-gray group-hover:text-revit-accent" />
                            )}
                          </button>
                          <div className="flex flex-col ml-4 overflow-hidden">
                            <span className="text-[0.75rem] text-revit-text-gray group-hover:text-on-surface truncate transition-colors">
                              {lesson.title}
                            </span>
                            <span className="text-[0.625rem] text-revit-text-gray/60 font-medium">
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
      </motion.div>
    </div>
  );
}
