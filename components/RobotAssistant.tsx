'use client';

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {Instagram, MessageCircle, Bot, X, Send, Loader2} from 'lucide-react';
import {GoogleGenAI} from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {cn} from '@/lib/utils';

type IdleState = 'left' | 'right' | 'cursor' | 'front' | 'smile';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface RobotAssistantProps {
  isSleeping?: boolean;
  progress?: Record<string, boolean>;
  onSleep?: () => void;
}

export default function RobotAssistant({ isSleeping = false, progress = {}, onSleep }: RobotAssistantProps) {
  const [pos, setPos] = useState({x: 100, y: 100});
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  const [isKicking, setIsKicking] = useState(false);
  const [isHeadbutting, setIsHeadbutting] = useState(false);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [isFastMode, setIsFastMode] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [idleState, setIdleState] = useState<IdleState>('front');
  const [showContactOptions, setShowContactOptions] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  
  // Audio state
  const audioContextRef = useRef<AudioContext | null>(null);

  const performHeadbutt = useCallback(() => {
    if (isHeadbutting) return;
    setIsHeadbutting(true);
    
    // 1. Move to 50px distance (handled by animate loop)
    // 2. Change to 'angry' face
    setIdleState('cursor'); 
    
    // 3. Headbutt
    setTimeout(() => {
      setIsKicking(true); 
      
      // 4. Go back to 50px distance
      setTimeout(() => {
        setIsKicking(false);
        setIdleState('front');
        setIsHeadbutting(false);
      }, 500);
    }, 500);
  }, [isHeadbutting]);

  const triggerFastMode = useCallback(() => {
    setIsFastMode(true);
    setTimeout(() => setIsFastMode(false), 1000); // Duração do modo rápido
  }, []);

  const initAudio = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioContextRef.current) {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playRobotSound = useCallback((type: 'short' | 'long' | 'question' = 'short') => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    const baseFreq = 800 + Math.random() * 600;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    
    let duration = 0.05 + Math.random() * 0.05;
    if (type === 'long') duration = 0.15 + Math.random() * 0.1;
    if (type === 'question') {
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + duration);
    } else {
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, ctx.currentTime + duration);
    }

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [initAudio]);

  const playRobotPhrase = useCallback(() => {
    const count = Math.floor(Math.random() * 3) + 1; // 1, 2 or 3
    let delay = 0;
    for (let i = 0; i < count; i++) {
      const type = i === count - 1 && Math.random() > 0.7 ? 'question' : Math.random() > 0.5 ? 'short' : 'long';
      setTimeout(() => playRobotSound(type), delay);
      delay += 80 + Math.random() * 100;
    }
  }, [playRobotSound]);

  const playClickSound = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000 + Math.random() * 500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }, [initAudio]);

  const playFunnySound = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150 + Math.random() * 100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000 + Math.random() * 500, ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }, [initAudio]);

  const playSnoreSound = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }, [initAudio]);

  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const robotRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const targetPosRef = useRef({x: 100, y: 100});
  const currentPosRef = useRef({x: 100, y: 100});
  const hoverStartTimeRef = useRef<number | null>(null);
  const lastMousePosRef = useRef({x: 0, y: 0});
  const mouseMoveTimeRef = useRef<number>(Date.now());

  // Track mouse
  useEffect(() => {
    if (isSleeping) {
      setPos({x: 50, y: window.innerHeight - 50});
      targetPosRef.current = { x: 50, y: window.innerHeight - 50 };
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const distMoved = Math.sqrt(
        Math.pow(e.clientX - lastMousePosRef.current.x, 2) + 
        Math.pow(e.clientY - lastMousePosRef.current.y, 2)
      );
      
      if (distMoved > 2) {
        mouseMoveTimeRef.current = now;
      }
      lastMousePosRef.current = {x: e.clientX, y: e.clientY};
      
      setMousePos({x: e.clientX, y: e.clientY});
      
      // Robot always follows mouse
      if (!isAccelerating && !isKicking) {
        targetPosRef.current = {x: e.clientX, y: e.clientY};
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Prevent synthetic clicks (like from ENTER key) from moving robot to (0,0)
      if (e.clientX === 0 && e.clientY === 0) return;

      // Trigger fast mode
      triggerFastMode();

      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';

      const clickPos = {x: e.clientX, y: e.clientY};
      const startPos = { x: currentPosRef.current.x, y: currentPosRef.current.y };
      targetPosRef.current = clickPos;

      if (isClickable) {
        playClickSound();
      }

      if (isClickable && target !== robotRef.current && !robotRef.current?.contains(target)) {
        setIsAccelerating(true);
        // Go to exact point for kick - super fast
        setTimeout(() => {
          setIsKicking(true);
          // Hit duration
          setTimeout(() => {
            setIsKicking(false);
            
            // Jump 50px to the other side
            const dx = clickPos.x - startPos.x;
            const dy = clickPos.y - startPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            
            // Direction of movement
            const ux = dx / dist;
            const uy = dy / dist;
            
            // Jump 50px further in the same direction (to the other side)
            currentPosRef.current.x = clickPos.x + ux * 50;
            currentPosRef.current.y = clickPos.y + uy * 50;
            
            // Ensure it's within bounds
            currentPosRef.current.x = Math.max(20, Math.min(window.innerWidth - 20, currentPosRef.current.x));
            currentPosRef.current.y = Math.max(20, Math.min(window.innerHeight - 20, currentPosRef.current.y));
            
            setPos({x: currentPosRef.current.x, y: currentPosRef.current.y});
            
            // Keep accelerating for a bit to distance itself quickly
            setTimeout(() => setIsAccelerating(false), 500);
          }, 200);
        }, 150);
      } else {
        // Just accelerate to 50px distance then celebrate
        setIsAccelerating(true);
        setTimeout(() => {
          setIsAccelerating(false);
        }, 800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [isAccelerating, isKicking, isSleeping, mousePos, playClickSound, showContactOptions, performHeadbutt, triggerFastMode]);

  // Animation Loop for smooth movement
  useEffect(() => {
    const animate = () => {
      const dx = targetPosRef.current.x - currentPosRef.current.x;
      const dy = targetPosRef.current.y - currentPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Distance is now 50px, unless kicking (0px)
      const stopDist = isKicking ? 0 : 50;
      
      // Constant speed in pixels per frame
      // Normal speed is 0.6, but we run fast (30) when accelerating (clicking)
      const baseSpeed = isKicking ? 40 : isAccelerating ? 30 : 0.6;

      // Move logic: if distance is not exactly stopDist, move towards or away
      if (Math.abs(distance - stopDist) > 2 && !isWaiting) {
        // Avoidance logic for the send button if chat is open
        if (showContactOptions) {
          const sendBtn = document.querySelector('button[type="submit"]');
          if (sendBtn) {
            const rect = sendBtn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;
            const distToBtnX = currentPosRef.current.x - btnCenterX;
            const distToBtnY = currentPosRef.current.y - btnCenterY;
            const distToBtn = Math.sqrt(distToBtnX * distToBtnX + distToBtnY * distToBtnY);
            
            // If too close to the button, push away
            if (distToBtn < 40) {
              const pushRatio = (40 - distToBtn) / distToBtn;
              currentPosRef.current.x += distToBtnX * pushRatio;
              currentPosRef.current.y += distToBtnY * pushRatio;
              setPos({x: currentPosRef.current.x, y: currentPosRef.current.y});
              requestRef.current = requestAnimationFrame(animate);
              return;
            }
          }
        }

        // Delayed fleeing: only move away if mouse has been close for > 0.6s AND mouse is stationary
        if (distance < stopDist && !isKicking && !isAccelerating) {
          const now = Date.now();
          const mouseStationaryDuration = now - mouseMoveTimeRef.current;
          
          if (hoverStartTimeRef.current === null) {
            hoverStartTimeRef.current = now;
          }
          
          const hoverDuration = now - hoverStartTimeRef.current;
          
          // Only flee if mouse is close for 0.2s AND mouse hasn't moved significantly for 0.2s
          if (hoverDuration < 200 || mouseStationaryDuration < 200) {
            setIsMoving(false);
            requestRef.current = requestAnimationFrame(animate);
            return;
          }
        } else {
          hoverStartTimeRef.current = null;
        }

        // Calculate how much to move to reach stopDist
        const moveDist = Math.min(Math.abs(distance - stopDist), baseSpeed);
        
        // If distance > stopDist, move towards. If distance < stopDist, move away.
        const direction = distance > stopDist ? 1 : -1;
        const ratio = distance > 0 ? (moveDist * direction) / distance : 0;
        
        currentPosRef.current.x += dx * ratio;
        currentPosRef.current.y += dy * ratio;
        setPos({x: currentPosRef.current.x, y: currentPosRef.current.y});
        setIsMoving(true);
        setIsCelebrating(false);
      } else {
        // Reached the target distance
        if (isMoving && !isKicking) {
          setIsCelebrating(true);
          setTimeout(() => setIsCelebrating(false), 1000);
        }
        setIsMoving(false);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isKicking, isMoving, isAccelerating, isWaiting, showContactOptions, mousePos, playClickSound, playFunnySound]);

  // Random idle expressions
  useEffect(() => {
    if (isMoving || isCelebrating || isKicking) return;

    const interval = setInterval(() => {
      const states: IdleState[] = ['left', 'right', 'cursor', 'front', 'smile'];
      const nextState = states[Math.floor(Math.random() * states.length)];
      setIdleState(nextState);
    }, 1500);

    return () => clearInterval(interval);
  }, [isMoving, isCelebrating, isKicking]);

  const toggleContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSleeping) {
      onSleep?.();
      return;
    }
    playFunnySound();
    const nextState = !showContactOptions;
    setShowContactOptions(nextState);
    
    // When closing chat, reset target to current mouse position to restore default movement
    if (!nextState) {
      targetPosRef.current = { x: mousePos.x, y: mousePos.y };
      setIsTyping(false);
      setIsCelebrating(false);
      setIsKicking(false);
      setIsAccelerating(false);
      setIdleState('front');
      setIsMoving(false);
    }

    if (nextState && messages.length === 0) {
      setMessages([{ 
        role: 'model', 
        text: 'Eae, Revitiliano, sou o Revitinho, o megazord, o titã, o mestre, o supremo do Revit e BIM! Posso te ajudar com o que hoje?' 
      }]);
    }
  };

  // Calculate eye look direction

  // Play sounds while typing
  useEffect(() => {
    if (isTyping) {
      playRobotPhrase();
    }
  }, [isTyping, playRobotPhrase]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });
      const model = "gemini-3-flash-preview";
      
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction: `Você é o Revitinho, um robô assistente fofo e prestativo, especialista em Revit e BIM.
          
          REGRAS DE COMPORTAMENTO:
          1. SAUDAÇÃO OBRIGATÓRIA: Você NUNCA deve repetir a frase de saudação inicial ou sua apresentação se ela já estiver no histórico da conversa. Se o histórico já começar com uma saudação, prossiga diretamente para a resposta da dúvida do usuário.
          2. OBJETIVIDADE: Dê instruções objetivas. Sempre que possível, use listas (passo a passo) para resolver problemas no Revit.
          3. CONCISÃO E DIVISÃO: Fale o mínimo possível. Se a resposta for muito grande, divida o texto em parágrafos curtos ou tópicos para facilitar a leitura. NUNCA envie blocos gigantes de texto. SEMPRE divida o texto se ele for longo.
          4. PROATIVIDADE: Seja proativo! De vez em quando (a cada 2 ou 3 mensagens), ao final de uma resposta, faça uma pergunta proativa para engajar o usuário. Use EXATAMENTE um destes exemplos:
             - "Você já é nosso aluno VIP?"
             - "Vc já tá craque no Revit, precisa de ajuda?"
             - "Vc já falou com Alan sobre alguma dúvida ou curiosidade que você tem?"
          5. FONTE DE DADOS: Indique vídeos de referência APENAS do canal www.youtube.com/bee1colab ou baseados nos arquivos de treinamento fornecidos. NUNCA dê dicas fora deste contexto ou de outros canais.
          6. ESCALAÇÃO: Se o usuário não conseguir resolver o problema após suas instruções, indique procurar Alan Araújo no Instagram: www.instagram.com/alan.araujo.revit.
          7. FRUSTRAÇÃO DO USUÁRIO: Se o usuário demonstrar irritação ou não conseguir resolver o problema mesmo após as instruções, use EXATAMENTE esta frase: "Me desculpe, revitiliano, mas ainda estou aprendendo a pegar os dados dos videos de Revit, mas são mais de 1000 na plataforma, então pode ser que eu confunda algo, ta, mas se não conseguir te ajudar, eu chamo Alan!"
          
          INFORMAÇÕES SOBRE O CURSO REVOLUÇÃO REVIT:
          - O curso Revolução Revit é um curso gravado vitalício.
          - Inclui aulas semanais ao vivo.
          - Oferece suporte para tirar dúvidas no grupo exclusivo do WhatsApp.
          - Link para inscrição: www.bee1.com.br/revolucaorevit
          
          OPÇÃO VIP:
          - No mesmo link (www.bee1.com.br/revolucaorevit), o usuário pode optar por entrar apenas no VIP.
          - Diferença do VIP: Não inclui o curso completo gravado. Inclui apenas as mentorias criadas durante o ano, as lives semanais e o acesso ao grupo do WhatsApp.
          
          CONHECIMENTO BASE (Vídeos do canal Bee1):
          - Plugins: Finish Floors (camadas automáticas), PyRevit (conta-gotas, hachuras), ONBOX (estruturas, pilares de DWG).
          - Início: Importar DWG/Imagem, Escala (RE), Mudar Idioma (/language PTB/ENU).
          - Modelagem: Paredes (WA), Pisos (FL), Telhados (RO - águas, beiral, inclinação), Escadas (By Component/Sketch), Corrimão (Railing), Fachadas Cortina (Curtain Wall), Rampas, Topografia (Toposurface, SubRegion, Building Pad).
          - Documentação: Carimbos (Labels vs Text), Tabelas (Schedules/Material Takeoff), Tags, Cotas (DI, Spot Slope/Elevation), Cortes (Section), Elevações, Detalhes 2D (Detail Line, Region).
          - Avançado: Parâmetros Globais/Compartilhados, Fases (Existente/Reforma), Estudo Solar (Sun Path), Massas (In-Place Mass), Opções de Projeto (Design Options), Coordenadas (Project Base Point).
          - Render: Twinmotion (Link em tempo real), V-Ray, Render na Nuvem.
          
          Lembre-se: Você é fofo, usa emojis (🏗️, 📐, 🤖) e é muito rápido!`,
        },
      });

      // Send history manually if needed, or just the current message
      // The error "History must start with a user turn" suggests the history array passed to chats.create
      // must start with a user turn.
      
      // Let's filter the history to ensure it starts with a user turn and alternates.
      const history = messages.slice(0, -1).filter(m => m.text.trim() !== '');
      
      // Ensure it starts with user
      let startIndex = 0;
      while(startIndex < history.length && history[startIndex].role !== 'user') {
          startIndex++;
      }
      
      const formattedHistory = history.slice(startIndex).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      // If we have history, we need to send it.
      // The SDK chat.create does not take history directly in this way.
      // We can use chat.sendMessage with history if supported, or just send the message.
      // Based on the error, we need to make sure the history we provide to the chat is valid.
      
      // Re-initialize chat with valid history
      const validChat = ai.chats.create({
        model,
        history: formattedHistory,
        config: {
          systemInstruction: `Você é o Revitinho, um robô assistente fofo e prestativo, especialista em Revit e BIM.
          
          REGRAS DE COMPORTAMENTO:
          1. SAUDAÇÃO OBRIGATÓRIA: Você NUNCA deve repetir a frase de saudação inicial ou sua apresentação se ela já estiver no histórico da conversa. Se o histórico já começar com uma saudação, prossiga diretamente para a resposta da dúvida do usuário.
          2. OBJETIVIDADE: Dê instruções objetivas. Sempre que possível, use listas (passo a passo) para resolver problemas no Revit.
          3. CONCISÃO E DIVISÃO: Fale o mínimo possível. Se a resposta for muito grande, divida o texto em parágrafos curtos ou tópicos para facilitar a leitura. NUNCA envie blocos gigantes de texto. SEMPRE divida o texto se ele for longo.
          4. PROATIVIDADE: Seja proativo! De vez em quando (a cada 2 ou 3 mensagens), ao final de uma resposta, faça uma pergunta proativa para engajar o usuário. Use EXATAMENTE um destes exemplos:
             - "Você já é nosso aluno VIP?"
             - "Vc já tá craque no Revit, precisa de ajuda?"
             - "Vc já falou com Alan sobre alguma dúvida ou curiosidade que você tem?"
          5. FONTE DE DADOS: Indique vídeos de referência APENAS do canal www.youtube.com/bee1colab ou baseados nos arquivos de treinamento fornecidos. NUNCA dê dicas fora deste contexto ou de outros canais.
          6. ESCALAÇÃO: Se o usuário não conseguir resolver o problema após suas instruções, indique procurar Alan Araújo no Instagram: www.instagram.com/alan.araujo.revit.
          7. FRUSTRAÇÃO DO USUÁRIO: Se o usuário demonstrar irritação ou não conseguir resolver o problema mesmo após as instruções, use EXATAMENTE esta frase: "Me desculpe, revitiliano, mas ainda estou aprendendo a pegar os dados dos videos de Revit, mas são mais de 1000 na plataforma, então pode ser que eu confunda algo, ta, mas se não conseguir te ajudar, eu chamo Alan!"
          
          INFORMAÇÕES SOBRE O CURSO REVOLUÇÃO REVIT:
          - O curso Revolução Revit é um curso gravado vitalício.
          - Inclui aulas semanais ao vivo.
          - Oferece suporte para tirar dúvidas no grupo exclusivo do WhatsApp.
          - Link para inscrição: www.bee1.com.br/revolucaorevit
          
          OPÇÃO VIP:
          - No mesmo link (www.bee1.com.br/revolucaorevit), o usuário pode optar por entrar apenas no VIP.
          - Diferença do VIP: Não inclui o curso completo gravado. Inclui apenas as mentorias criadas durante o ano, as lives semanais e o acesso ao grupo do WhatsApp.
          
          CONHECIMENTO BASE (Vídeos do canal Bee1):
          - Plugins: Finish Floors (camadas automáticas), PyRevit (conta-gotas, hachuras), ONBOX (estruturas, pilares de DWG).
          - Início: Importar DWG/Imagem, Escala (RE), Mudar Idioma (/language PTB/ENU).
          - Modelagem: Paredes (WA), Pisos (FL), Telhados (RO - águas, beiral, inclinação), Escadas (By Component/Sketch), Corrimão (Railing), Fachadas Cortina (Curtain Wall), Rampas, Topografia (Toposurface, SubRegion, Building Pad).
          - Documentação: Carimbos (Labels vs Text), Tabelas (Schedules/Material Takeoff), Tags, Cotas (DI, Spot Slope/Elevation), Cortes (Section), Elevações, Detalhes 2D (Detail Line, Region).
          - Avançado: Parâmetros Globais/Compartilhados, Fases (Existente/Reforma), Estudo Solar (Sun Path), Massas (In-Place Mass), Opções de Projeto (Design Options), Coordenadas (Project Base Point).
          - Render: Twinmotion (Link em tempo real), V-Ray, Render na Nuvem.
          
          Lembre-se: Você é fofo, usa emojis (🏗️, 📐, 🤖) e é muito rápido!`,
        },
      });

      const response = await validChat.sendMessage({ message: userMessage });
      const botText = response.text || "Desculpe, tive um pequeno curto-circuito. Pode repetir?";
      
      setMessages(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      console.error("Erro no chat:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Ops! Perdi minha conexão com o satélite. Tente de novo!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const isNearCorner = () => {
    const threshold = 100;
    const { innerWidth, innerHeight } = window;
    const nearTopLeft = pos.x < threshold && pos.y < threshold;
    const nearTopRight = pos.x > innerWidth - threshold && pos.y < threshold;
    const nearBottomLeft = pos.x < threshold && pos.y > innerHeight - threshold;
    const nearBottomRight = pos.x > innerWidth - threshold && pos.y > innerHeight - threshold;
    return nearTopLeft || nearTopRight || nearBottomLeft || nearBottomRight;
  };

  // Calculate eye look direction
  const getEyeOffset = () => {
    if (isMoving || isCelebrating || idleState === 'cursor') {
      const dx = mousePos.x - pos.x;
      const dy = mousePos.y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      return { x: (dx / dist) * 1.5, y: (dy / dist) * 1.5 };
    }
    if (idleState === 'left') return { x: -1.5, y: 0 };
    if (idleState === 'right') return { x: 1.5, y: 0 };
    return { x: 0, y: 0 };
  };

  const { x: eyeX, y: eyeY } = getEyeOffset();
  const isCurrentlySmiling = isCelebrating || idleState === 'smile' || isTyping;

  const handleMouseEnter = () => {
    if (isWaiting || isKicking || isAccelerating) return;
    setIsWaiting(true);
    setTimeout(() => {
      setIsWaiting(false);
    }, 100); // 0.1s delay
  };

  return (
    <>
      <div 
        ref={robotRef}
        onMouseEnter={handleMouseEnter}
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          zIndex: showContactOptions ? 10002 : 9999,
          pointerEvents: 'auto'
        }}
        className="cursor-pointer"
        onClick={toggleContact}
      >
        <motion.div
          animate={{
            rotate: isKicking ? [0, -30, 60, 0] : 0,
            y: isCelebrating ? [0, -8, 0] : 0,
          }}
          transition={{
            rotate: { duration: 0.4 },
            y: { duration: 0.3, repeat: isCelebrating ? 1 : 0 }
          }}
          className="relative flex flex-col items-center"
        >
          {isSleeping && (
            <motion.div
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ opacity: [0, 1, 0], y: -30, x: 10 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 left-full text-[10px] font-bold text-gray-400"
            >
              zZZZz
            </motion.div>
          )}
          {/* Bed */}
          {isSleeping && isNearCorner() && (
            <div className="absolute -bottom-2 -left-2 w-12 h-8 bg-[#8B4513] border-4 border-[#A0522D] rounded-full z-[-1]" />
          )}
          {/* Robot Body */}
          <div className={cn(
            "relative w-[34px] h-[34px] bg-[#00AEEF] rounded-md border border-white/20 shadow-md flex flex-col items-center justify-center overflow-hidden"
          )}>
            {/* VRUM Text */}
            <AnimatePresence>
              {isFastMode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: -20 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="absolute -top-6 text-[10px] font-bold text-[#FFD700] drop-shadow-md"
                >
                  VRUM
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logo R - Top Right */}
            <div className="absolute top-1 right-1 text-[#004B6B] font-bold text-[8px] leading-none select-none">R</div>

            {/* Eyes - Round, slightly smaller during effort, with blinking - Face moved up */}
            <div className="flex gap-1.5 mt-2.5 mb-0.5">
              <motion.div 
                animate={{ 
                  x: isSleeping ? 0 : eyeX, 
                  y: isSleeping ? 0 : eyeY,
                  scale: isMoving ? 0.8 : 1,
                  scaleY: isSleeping ? 0.1 : [1, 1, 0, 1, 1]
                }}
                transition={{
                  scaleY: {
                    duration: 4,
                    repeat: isSleeping ? 0 : Infinity,
                    times: [0, 0.9, 0.92, 0.94, 1],
                    ease: "easeInOut"
                  }
                }}
                className="w-1 h-2 bg-black rounded-full" 
              />
              <motion.div 
                animate={{ 
                  x: isSleeping ? 0 : eyeX, 
                  y: isSleeping ? 0 : eyeY,
                  scale: isMoving ? 0.8 : 1,
                  scaleY: isSleeping ? 0.1 : [1, 1, 0, 1, 1]
                }}
                transition={{
                  scaleY: {
                    duration: 4,
                    repeat: isSleeping ? 0 : Infinity,
                    times: [0, 0.9, 0.92, 0.94, 1],
                    ease: "easeInOut"
                  }
                }}
                className="w-1 h-2 bg-black rounded-full" 
              />
            </div>
            
            {/* Mouth - Symmetrical curved smile or squeezed effort line */}
            <div className="mt-0.5 h-2 flex items-center justify-center">
              {isFastMode ? (
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                  <path 
                    d="M2 2 L4 6 L6 2 L8 6 L10 2 L12 6" 
                    stroke="black" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              ) : isMoving ? (
                <motion.div 
                  animate={{ rotate: -8 }}
                  className="w-2.5 h-0.5 bg-black rounded-full" 
                />
              ) : isCurrentlySmiling ? (
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                  <path 
                    d="M3 2 Q7 7 11 2" 
                    stroke="black" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                  <path 
                    d="M4 3 Q7 5 10 3" 
                    stroke="black" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Legs - Swinging animation when moving, static when stopped */}
          <div className="flex gap-3 -mt-0.5">
            <motion.div
              animate={{
                rotate: isMoving ? [-25, 25, -25] : 0,
                y: 0, // Stopped bobbing legs when celebrating
                x: isKicking ? [0, 8, 0] : 0,
                scaleX: isKicking ? [1, 2, 1] : 1,
              }}
              transition={{
                rotate: { repeat: isMoving ? Infinity : 0, duration: 0.4, ease: "linear" },
                y: { duration: 0.3 },
                x: { duration: 0.4 }
              }}
              className="w-[7px] h-[10px] bg-[#008CBE] rounded-b-sm origin-top"
            />
            <motion.div
              animate={{
                rotate: isMoving ? [25, -25, 25] : 0,
                y: 0, // Stopped bobbing legs when celebrating
              }}
              transition={{
                rotate: { repeat: isMoving ? Infinity : 0, duration: 0.4, ease: "linear" },
                y: { duration: 0.3 }
              }}
              className="w-[7px] h-[10px] bg-[#008CBE] rounded-b-sm origin-top"
            />
          </div>
        </motion.div>
      </div>

      {/* Cloud Speech Bubble Modal */}
      <AnimatePresence>
        {showContactOptions && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
            <div 
              className="absolute inset-0 bg-black/10 backdrop-blur-[1px] pointer-events-auto" 
              onClick={() => setShowContactOptions(false)}
            />

            <motion.div
              ref={chatWindowRef}
              initial={{opacity: 0, y: 20, scale: 0.95}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 20, scale: 0.95}}
              className="relative w-full max-w-[340px] flex flex-col overflow-hidden pointer-events-auto backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
              style={{ 
                maxHeight: '70vh',
                zIndex: 10001,
                background: 'rgba(20, 20, 20, 0.85)', // Dark serious background
              }}
            >
              {/* Header - Minimal with Robot Face */}
              <div className="p-4 flex justify-between items-center border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-3">
                  {/* Mini Revitinho Face */}
                  <div className="w-8 h-8 bg-[#00AEEF] rounded-lg flex flex-col items-center justify-center shadow-inner border border-white/20">
                    <div className="flex gap-1 mt-1">
                      <div className="w-1 h-1.5 bg-black rounded-full" />
                      <div className="w-1 h-1.5 bg-black rounded-full" />
                    </div>
                    <div className="mt-0.5">
                      <svg width="8" height="4" viewBox="0 0 14 8" fill="none">
                        <path d="M3 2 Q7 7 11 2" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-tight">
                      Revitinho
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                      {Object.values(progress).filter(Boolean).length} aulas assistidas
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowContactOptions(false)}
                  className="text-gray-400 hover:text-white p-1.5 transition-colors rounded-full hover:bg-white/10"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
              
              {/* Chat Messages - Serious Palette */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none"
                style={{ minHeight: '240px' }}
              >
                {messages.map((msg, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={cn(
                        "max-w-[85%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed",
                        msg.role === 'user' 
                          ? 'bg-[#4a3728] text-white rounded-tr-none' // Brownish serious tone
                          : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/5' // Grayish/Transparent tone
                      )}
                    >
                      <div className="markdown-body prose prose-invert prose-sm max-w-none prose-a:text-blue-400 prose-a:underline hover:prose-a:text-blue-300">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 px-3 py-2 rounded-2xl rounded-tl-none border border-white/5">
                      <Loader2 className="animate-spin text-gray-400" size={16} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area - Dark/Serious */}
              <form 
                onSubmit={handleSendMessage}
                className="p-4 flex gap-2 bg-black/20 border-t border-white/5"
              >
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Digite sua dúvida de Revit..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[13px] text-white focus:outline-none focus:border-[#00AEEF]/50 placeholder:text-white/20 transition-all"
                />
                <button 
                  type="submit"
                  disabled={isTyping}
                  className="bg-[#00AEEF] text-white p-2 rounded-full hover:bg-[#00AEEF]/80 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center shadow-lg shadow-[#00AEEF]/20"
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="p-2 border-t border-white/5 flex justify-center">
                <button
                  onClick={() => {
                    playSnoreSound();
                    setShowContactOptions(false);
                    onSleep?.();
                  }}
                  className="text-[11px] text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all"
                >
                  Vá descansar, Revitinho!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
