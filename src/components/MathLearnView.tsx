"use client";

import { useState, useEffect, useRef } from "react";
import { MathConcept } from "@/lib/math-data";
import { explainAction } from "@/app/actions";
import { X, Loader2, PenTool, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MathLearnViewProps {
  concept: MathConcept;
  onClose: () => void;
}

export default function MathLearnView({ concept, onClose }: MathLearnViewProps) {
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showPad, setShowPad] = useState(false);

  useEffect(() => {
    async function fetchExplanation() {
      try {
        const text = await explainAction(concept.title, concept.details);
        setExplanation(text);
      } catch (error) {
        setExplanation("설명을 가져오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchExplanation();
  }, [concept]);

  return (
    <motion.div 
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-background z-40 flex flex-col"
    >
      {/* One UI Header */}
      <div className="pt-12 pb-6 px-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="p-3 -ml-3 bg-secondary/50 rounded-2xl hover:bg-secondary transition-colors">
            <X className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setShowPad(!showPad)}
            className={cn(
              "p-3 rounded-2xl transition-all shadow-sm",
              showPad ? "bg-primary text-primary-foreground scale-95" : "bg-secondary hover:bg-secondary/80"
            )}
          >
            <PenTool className="w-6 h-6" />
          </button>
        </div>
        <div>
          <span className="text-sm font-bold text-primary mb-1 block">{concept.category}</span>
          <h2 className="text-3xl font-bold tracking-tight">{concept.title}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-20 scrollbar-hide">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground animate-pulse">AI가 개념을 정리하고 있습니다...</p>
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed">
            <ReactMarkdown 
              remarkPlugins={[remarkMath]} 
              rehypePlugins={[rehypeKatex]}
            >
              {explanation}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {showPad && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex flex-col pt-16">
          <div className="flex-1 bg-white/10 m-4 rounded-[32px] border border-white/20 shadow-2xl overflow-hidden relative">
            <DrawingPad onClose={() => setShowPad(false)} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Simple Drawing Pad Component
function DrawingPad({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="w-full h-full relative touch-none bg-[#1a1a1a]">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        className="w-full h-full cursor-crosshair"
      />
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button onClick={clear} className="p-3 bg-white/10 backdrop-blur rounded-2xl hover:bg-white/20 transition-colors">
          <RotateCcw className="w-5 h-5" />
        </button>
        <button onClick={onClose} className="p-3 bg-primary text-primary-foreground rounded-2xl shadow-lg">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 text-xs font-medium text-white/70">
        S-Pen 모드: 직접 풀이 과정을 적어보세요.
      </div>
    </div>
  );
}
