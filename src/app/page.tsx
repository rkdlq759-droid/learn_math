"use client";

import { useState } from "react";
import DeviceFrame from "@/components/layout/DeviceFrame";
import { mathCurriculum, MathConcept } from "@/lib/math-data";
import { cn } from "@/lib/utils";
import { BookOpen, MessageSquare, User, ChevronRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MathLearnView from "@/components/MathLearnView";
import ChatView from "@/components/ChatView";

export default function Home() {
  const [activeGrade, setActiveGrade] = useState<"고1" | "고2">("고1");
  const [selectedConcept, setSelectedConcept] = useState<MathConcept | null>(null);
  const [activeTab, setActiveTab] = useState<"learn" | "chat" | "profile">("learn");

  const filteredCurriculum = mathCurriculum.filter(item => item.grade === activeGrade);

  return (
    <DeviceFrame>
      <div className="flex-1 overflow-hidden flex flex-col relative">
        <AnimatePresence>
          {selectedConcept && (
            <MathLearnView 
              concept={selectedConcept} 
              onClose={() => setSelectedConcept(null)} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeTab === "learn" && (
            <motion.div 
              key="learn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide"
            >
              {/* One UI Style Collapsible Header Placeholder */}
              <div className="pt-16 pb-10 flex flex-col items-start justify-end min-h-[180px]">
                <h1 className="text-4xl font-bold tracking-tight mb-2">오늘의 학습</h1>
                <p className="text-lg text-muted-foreground font-medium">수학의 세계에 오신 것을 환영합니다.</p>
              </div>

              {/* Grade Selector - Squircle Style */}
              <div className="flex gap-2 p-1.5 bg-secondary/60 rounded-[24px] mb-8">
                {(["고1", "고2"] as const).map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setActiveGrade(grade)}
                    className={cn(
                      "flex-1 py-2 rounded-xl text-sm font-medium transition-all",
                      activeGrade === grade ? "bg-white dark:bg-[#1a1a1a] shadow-sm text-primary" : "text-muted-foreground"
                    )}
                  >
                    {grade}
                  </button>
                ))}
              </div>

              {/* Curriculum Cards */}
              <div className="space-y-4">
                {filteredCurriculum.map((concept) => (
                  <motion.div
                    key={concept.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedConcept(concept)}
                    className="p-6 bg-secondary/40 backdrop-blur-md rounded-[32px] border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-secondary/60 transition-all shadow-sm"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{concept.category}</span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight mb-1">{concept.title}</h3>
                      <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-snug">{concept.summary}</p>
                    </div>
                    <div className="ml-4 w-12 h-12 rounded-[20px] bg-background/50 flex items-center justify-center shadow-inner group-hover:bg-primary/10 transition-colors">
                      <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "chat" && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-hidden"
            >
              <ChatView />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Floating Navigation */}
        <div className="absolute bottom-6 left-6 right-6 h-20 nav-glass rounded-[32px] flex items-center justify-around px-2 shadow-2xl z-50">
          <NavButton 
            active={activeTab === "learn"} 
            onClick={() => setActiveTab("learn")}
            icon={<BookOpen className="w-6 h-6" />}
            label="학습"
          />
          <NavButton 
            active={activeTab === "chat"} 
            onClick={() => setActiveTab("chat")}
            icon={<MessageSquare className="w-6 h-6" />}
            label="AI 챗"
          />
          <NavButton 
            active={activeTab === "profile"} 
            onClick={() => setActiveTab("profile")}
            icon={<User className="w-6 h-6" />}
            label="프로필"
          />
        </div>
      </div>
    </DeviceFrame>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 transition-all duration-300 relative px-4",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <motion.div 
        animate={active ? { y: -2 } : { y: 0 }}
        className={cn(
          "p-2 rounded-[18px] transition-colors",
          active ? "bg-primary/10" : "bg-transparent"
        )}
      >
        {icon}
      </motion.div>
      <span className={cn("text-[11px] font-bold transition-opacity", active ? "opacity-100" : "opacity-70")}>{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-dot"
          className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
        />
      )}
    </button>
  );
}
