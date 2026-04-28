import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  ChevronRight,
  TrendingUp,
  Activity,
  Users,
  Settings,
  Star,
  Target,
  Zap,
  Volume2
} from 'lucide-react';
import { VERB_THEORY, TENNIS_QUESTIONS, ASSETS } from './constants';

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'theory' | 'playing' | 'end'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [animationState, setAnimationState] = useState<'idle' | 'swing' | 'run'>('idle');

  const shuffledQuestions = useMemo(() => {
    return [...TENNIS_QUESTIONS].sort(() => Math.random() - 0.5);
  }, [gameState === 'playing']);

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleChoice = (choice: string) => {
    if (feedback) return;

    if (choice === currentQuestion.target) {
      setFeedback('correct');
      setAnimationState('swing');
      setScore(s => s + 1);
      setTimeout(() => {
        nextStep();
      }, 2000);
    } else {
      setFeedback('incorrect');
      setAnimationState('run');
      setTimeout(() => {
        nextStep();
      }, 2500);
    }
  };

  const nextStep = () => {
    setFeedback(null);
    setAnimationState('idle');
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setGameState('end');
    }
  };

  const restart = () => {
    setGameState('start');
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setAnimationState('idle');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* 3D-like Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_40%,#1e3a8a_0%,#020617_100%)]" />
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-3xl p-12 md:p-20 rounded-[5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent -z-10" />
            
            <div className="mb-12 flex justify-center">
              <div className="relative group">
                <motion.div 
                  animate={{ y: [0, -20, 0], rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-56 h-56 md:w-80 md:h-80 rounded-[4.5rem] overflow-hidden border-[10px] border-white/20 shadow-[0_0_100px_rgba(234,179,8,0.5)] relative z-10 bg-slate-800"
                >
                   <img src={ASSETS.ERNESTO} alt="Ernesto" className="w-full h-full object-cover scale-110" />
                </motion.div>
                
                <motion.div 
                   animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                   transition={{ duration: 3, repeat: Infinity }}
                   className="absolute -inset-4 bg-yellow-500 rounded-[5.5rem] blur-3xl -z-10"
                />
                
                <div className="absolute -bottom-8 -right-8 bg-yellow-400 p-6 rounded-[2.5rem] shadow-2xl border-6 border-slate-950 z-20 transform -rotate-12">
                   <Zap className="w-12 h-12 text-slate-950" />
                </div>
              </div>
            </div>

            <div className="relative z-20">
               <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-indigo-800 leading-none">
                 ERNESTO'S<br/>TENIS
               </h1>
               <p className="text-indigo-400 font-bold uppercase tracking-[0.6em] mb-12 text-sm">TENNIS ADVENTURE</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
              <button 
                onClick={() => setGameState('theory')}
                className="group relative overflow-hidden py-8 bg-slate-800 hover:bg-slate-700 text-white rounded-[3rem] font-black text-2xl flex items-center justify-center gap-4 transition-all shadow-xl"
              >
                <BookOpen className="w-8 h-8 group-hover:scale-110 transition-transform" />
                LEARN THEORY
              </button>
              <button 
                onClick={() => setGameState('playing')}
                className="group relative overflow-hidden py-8 bg-white text-indigo-950 rounded-[3rem] font-black text-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-2xl border-b-8 border-slate-300"
              >
                <Play className="w-8 h-8 fill-indigo-950 group-hover:translate-x-1 transition-transform" />
                WIN MATCH
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'theory' && (
          <motion.div
            key="theory"
            initial={{ opacity: 0, x: 200, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -200 }}
            className="w-full max-w-5xl bg-slate-900/50 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white/5 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-10">
               <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-indigo-500 rounded-[2.5rem] flex items-center justify-center shadow-[0_10px_40px_rgba(99,102,241,0.4)]">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">The Guide</h2>
                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-[0.3em]">Trabajar vs Funcionar</p>
                  </div>
               </div>
               <button 
                 onClick={() => setGameState('start')}
                 className="p-5 hover:bg-white/10 rounded-full transition-all group"
               >
                 <RotateCcw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
               </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
               {VERB_THEORY.map((v, idx) => (
                 <div key={idx} className="bg-white/5 p-10 rounded-[3.5rem] border border-white/5 hover:border-indigo-500/30 transition-all group">
                    <div className="flex items-center gap-6 mb-8">
                       <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center border border-indigo-500/20">
                          {v.verb === 'Trabajar' ? <Users className="w-8 h-8 text-emerald-400" /> : <Settings className="w-8 h-8 text-blue-400" />}
                       </div>
                       <h3 className="text-5xl font-black italic text-white uppercase tracking-tighter group-hover:scale-105 transition-transform">{v.verb}</h3>
                    </div>
                    <p className="text-slate-400 font-bold mb-10 text-lg italic leading-relaxed border-l-4 border-indigo-500 pl-6">{v.meaning}</p>
                    
                    <div className="space-y-3">
                       {v.conjugations.map((c, i) => (
                         <div key={i} className="flex items-center justify-between p-5 bg-black/40 rounded-3xl border border-white/5 group-hover:bg-black/60 transition-colors">
                            <span className="text-slate-500 font-black uppercase text-sm tracking-widest">{c.subject}</span>
                            <span className="text-3xl font-black italic text-indigo-300">{c.form}</span>
                         </div>
                       ))}
                    </div>
                 </div>
               ))}
            </div>

            <button 
              onClick={() => setGameState('playing')}
              className="w-full py-10 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-[3rem] font-black text-3xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-6 border-b-8 border-indigo-950"
            >
              START TOURNAMENT <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-7xl flex flex-col items-center relative gap-8"
          >
            {/* Tournament HUD */}
            <div className="w-full flex justify-between items-end mb-4 px-4 max-w-5xl z-30">
               <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 md:gap-4">
                     <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-xl rotate-[-4deg]">
                        <span className="text-2xl md:text-5xl font-black italic text-indigo-950">{currentIndex + 1}</span>
                     </div>
                     <div>
                        <div className="text-[8px] md:text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1 leading-none">Match Point</div>
                        <div className="text-lg md:text-3xl font-black italic text-white leading-none">{currentIndex + 1} / {TENNIS_QUESTIONS.length}</div>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col items-end gap-3">
                  <div className="bg-indigo-600/20 px-4 md:px-8 py-2 md:py-4 rounded-3xl md:rounded-[2.5rem] border border-indigo-500/30 backdrop-blur-2xl shadow-inner flex items-center gap-3">
                     <div className="p-2 md:p-3 bg-indigo-500 rounded-full shadow-lg">
                        <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-white" />
                     </div>
                     <div className="text-right">
                        <div className="text-[8px] md:text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">SCORE</div>
                        <span className="text-xl md:text-4xl font-black italic text-white leading-none">{score * 15}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* 3D Tennis Court Environment */}
            <div className="relative w-full overflow-visible flex flex-col items-center">
              
               {/* Court Background - Adjusted for perspective on mobile */}
               <div className="absolute top-20 md:top-40 inset-x-0 bottom-0 -z-10 perspective-1000">
                  <motion.div 
                    initial={{ rotateX: 65, scale: 2, y: 100 }}
                    animate={{ rotateX: 65, scale: 1.2, y: 0 }}
                    className="w-full h-[600px] bg-emerald-600 rounded-[5rem] md:rounded-[10rem] border-[8px] md:border-[12px] border-emerald-900 shadow-[0_50px_100px_rgba(20,83,45,0.8)] overflow-hidden mx-auto"
                  >
                     <div className="absolute inset-x-0 top-1/2 h-2 md:h-4 bg-white/40" />
                     <div className="absolute inset-y-0 left-1/4 w-1 md:w-2 bg-white/40" />
                     <div className="absolute inset-y-0 right-1/4 w-1 md:w-2 bg-white/40" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                     <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                  </motion.div>
               </div>

               {/* Ernesto Animated Character */}
               <div className="relative z-20 flex justify-center mb-4 md:mb-8 w-full max-w-full px-2">
                  <motion.div 
                    key={currentIndex + animationState + 'ernesto'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      animationState === 'swing' 
                        ? { 
                            rotate: [0, 20, -20, 0],
                            scale: [1, 1.2, 1],
                            y: [0, -30, 0],
                            transition: { duration: 0.6 }
                          }
                        : animationState === 'run'
                        ? { 
                            x: [0, 300, -300, 0],
                            rotateY: [0, 180, 0],
                            opacity: [1, 1, 0, 1],
                            transition: { duration: 1.5 } 
                          }
                        : { opacity: 1, scale: 1, x: 0 }
                    }
                    className="relative"
                  >
                     <div className="w-48 h-48 md:w-80 md:h-80 rounded-[3rem] md:rounded-[5rem] border-[6px] md:border-[10px] border-slate-900 bg-slate-800 overflow-hidden shadow-2xl relative shadow-yellow-500/30">
                        <img src={ASSETS.ERNESTO} alt="Ernesto" className="w-full h-full object-cover scale-125" />
                        <div className="absolute inset-0 bg-yellow-500/10 pointer-events-none" />
                     </div>
                     <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 px-6 py-1 rounded-full text-[10px] md:text-sm font-black uppercase text-slate-900 whitespace-nowrap shadow-xl">ERNESTO</div>
                  </motion.div>

                  {/* Speech Bubble */}
                  {animationState === 'idle' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 bg-white text-slate-950 p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] shadow-2xl border-2 md:border-4 border-slate-900 z-30 min-w-max"
                    >
                       <div className="flex items-center gap-2 md:gap-3">
                          <Target className="w-4 h-4 md:w-6 md:h-6 text-indigo-600" />
                          <span className="font-black italic uppercase text-[10px] md:text-sm tracking-tighter">¡VAMOS ERNESTO!</span>
                       </div>
                    </motion.div>
                  )}
               </div>

               {/* Question Pad */}
               <motion.div 
                 initial={{ y: 50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="bg-slate-900/90 md:bg-slate-900/80 backdrop-blur-3xl border-2 border-white/10 p-6 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[5rem] w-full max-w-4xl shadow-2xl relative z-30"
               >
                  <div className="mb-8 md:mb-10">
                     <h2 className="text-xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 italic tracking-tighter leading-tight text-white drop-shadow-xl">
                        "{currentQuestion.prompt}"
                     </h2>
                     <div className="bg-indigo-500/10 px-4 md:px-8 py-2 md:py-3 rounded-full border border-indigo-500/20 inline-block">
                        <p className="text-indigo-400 font-black text-[10px] md:text-lg lg:text-xl italic uppercase tracking-widest leading-none">
                           ({currentQuestion.translation})
                        </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                     {currentQuestion.choices.map(choice => (
                       <button
                         key={choice}
                         disabled={!!feedback}
                         onClick={() => handleChoice(choice)}
                         className={`group relative overflow-hidden py-4 md:py-8 rounded-2xl md:rounded-[3rem] font-black text-xl md:text-3xl transition-all border-b-4 md:border-b-8 transform active:scale-95 ${
                           feedback === 'correct' && choice === currentQuestion.target
                             ? 'bg-emerald-500 border-emerald-800 text-white scale-105'
                             : feedback === 'incorrect' && choice === currentQuestion.target
                             ? 'bg-rose-500 border-rose-800 text-white'
                             : 'bg-slate-800 border-slate-950 text-slate-100 hover:bg-slate-700 hover:translate-y-[-4px]'
                         }`}
                       >
                          <span className="relative z-10">{choice}</span>
                       </button>
                     ))}
                  </div>

                  {/* Result Feedback Overlay */}
                  <AnimatePresence>
                     {feedback && (
                       <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         className={`absolute inset-0 z-40 flex flex-col items-center justify-center backdrop-blur-xl rounded-[2.5rem] md:rounded-[5rem] ${feedback === 'correct' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}
                       >
                          {feedback === 'correct' ? (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                               <div className="w-20 h-20 md:w-32 md:h-32 bg-emerald-500 rounded-full flex items-center justify-center mb-4 md:mb-8 shadow-2xl">
                                  <CheckCircle2 className="w-10 h-10 md:w-16 md:h-16 text-white" />
                               </div>
                               <div className="text-4xl md:text-6xl font-black uppercase italic text-white tracking-widest">¡ACE!</div>
                            </motion.div>
                          ) : (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center p-4">
                               <div className="w-20 h-20 md:w-32 md:h-32 bg-rose-500 rounded-full flex items-center justify-center mb-4 md:mb-8 shadow-2xl">
                                  <XCircle className="w-10 h-10 md:w-16 md:h-16 text-white" />
                               </div>
                               <div className="text-3xl md:text-5xl font-black uppercase italic text-rose-500 mb-4 tracking-tighter text-center">DOUBLE FAULT</div>
                               <div className="px-6 md:px-10 py-3 md:py-5 bg-white text-slate-900 rounded-2xl md:rounded-[2.4rem] font-black uppercase text-lg md:text-2xl shadow-xl">
                                  {currentQuestion.target}
                               </div>
                            </motion.div>
                          )}
                       </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            </div>

          </motion.div>
        )}

        {gameState === 'end' && (
          <motion.div
            key="end"
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            className="w-full max-w-2xl bg-indigo-950/40 backdrop-blur-3xl p-16 md:p-24 rounded-[6rem] border border-white/5 shadow-2xl text-center relative overflow-hidden"
          >
             <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-yellow-400 via-white to-yellow-400" />
             
             <div className="flex justify-center mb-12">
               <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-56 h-56 rounded-full border-[12px] border-yellow-400/20 p-2 overflow-hidden shadow-2xl"
                  >
                     <img src={ASSETS.ERNESTO} alt="Ernesto" className="w-full h-full object-cover rounded-full" />
                  </motion.div>
                  <div className="absolute -top-10 -right-10">
                     <Trophy className="w-24 h-24 text-yellow-400 drop-shadow-[0_0_40px_rgba(250,204,21,0.6)]" />
                  </div>
               </div>
             </div>
             
             <h1 className="text-6xl font-black mb-4 italic tracking-tighter uppercase leading-none text-white">
                CHAMPION
             </h1>
             <p className="text-indigo-400 font-black mb-14 uppercase tracking-[0.5em] text-[10px] leading-relaxed">
                Tournament Results
             </p>
             
             <div className="flex justify-center items-center gap-12 mb-16 px-10 border-y border-white/5 py-10 bg-black/20 rounded-[3rem]">
                <div className="text-center">
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">SCORE</div>
                   <div className="text-9xl font-black text-white italic tracking-tighter leading-none">{score * 15}</div>
                </div>
                <div className="h-20 w-px bg-white/10" />
                <div className="text-center">
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">PRECISION</div>
                   <div className="text-5xl font-black text-indigo-400 italic leading-none">{Math.round((score / TENNIS_QUESTIONS.length) * 100)}%</div>
                </div>
             </div>

             <button 
               onClick={restart}
               className="w-full py-10 bg-white text-indigo-950 rounded-[4rem] font-black text-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-6 border-b-[12px] border-slate-300"
             >
               <RotateCcw className="w-10 h-10" />
               REPLAY FINAL
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric Sounds Indicator */}
      <div className="fixed bottom-10 right-10 flex items-center gap-4 bg-slate-900/80 p-4 rounded-3xl border border-white/5 backdrop-blur-md opacity-40 hover:opacity-100 transition-opacity">
         <Volume2 className="w-5 h-5 text-indigo-400" />
         <div className="h-1 w-20 bg-slate-800 rounded-full overflow-hidden">
            <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-indigo-500" />
         </div>
      </div>
    </div>
  );
}
