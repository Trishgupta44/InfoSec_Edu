import React, { useState, useEffect } from 'react';
import { Shield, Lock, Globe, Bug, Eye, Terminal, Play, RotateCcw, ArrowRight, ChevronRight, Server, Monitor, Database as DbIcon, Network, Bomb, Skull, FileWarning, AlertTriangle } from 'lucide-react';

// --- Reusable Components ---

const CodeBlock = ({ code }) => (
  <div className="bg-gray-950/80 backdrop-blur rounded-lg p-4 font-mono text-sm overflow-x-auto border border-gray-700 shadow-2xl relative group h-full">
    <div className="flex gap-2 mb-3 border-b border-gray-800 pb-2">
      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
      <span className="ml-auto text-xs text-gray-500 font-sans">Python 3.10</span>
    </div>
    <pre className="text-green-400">
      <code>{code}</code>
    </pre>
  </div>
);

const SectionHeader = ({ icon: Icon, title, description }) => (
  <div className="mb-8 relative z-10">
    <div className="flex items-center gap-4 mb-3">
      <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-extrabold text-white tracking-tight">{title}</h2>
    </div>
    <p className="text-gray-300 text-lg leading-relaxed max-w-3xl border-l-4 border-blue-500/50 pl-4">
      {description}
    </p>
  </div>
);

const ConceptExplainer = ({ title, children }) => (
  <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-6 mt-6 shadow-lg relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
    <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-3">
      <Shield className="w-5 h-5 text-blue-400" />
      {title}
    </h4>
    <div className="text-gray-300 text-sm leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

// --- Module 1: Cryptography ---

const CryptographyModule = () => {
  const [input, setInput] = useState('SECURE');
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState('');
  
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  useEffect(() => {
    const result = input.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    }).join('');
    setOutput(result);
  }, [input, shift]);

  const pythonCode = `def caesar_encrypt(text, shift_key):
    encrypted_text = ""
    for char in text:
        if char.isalpha():
            ascii_base = 65 if char.isupper() else 97
            original_pos = ord(char) - ascii_base
            new_pos = (original_pos + shift_key) % 26
            encrypted_text += chr(new_pos + ascii_base)
        else:
            encrypted_text += char
    return encrypted_text`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-xl">
          <h3 className="text-xl font-semibold text-blue-300 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5" /> Visualization: The Shift Wheel
          </h3>
          
          <div className="mb-8 overflow-x-auto pb-4">
            <div className="flex flex-col min-w-max">
                <div className="flex gap-1 mb-1">
                    <div className="w-16 text-xs text-gray-400 font-mono flex items-center">PLAIN:</div>
                    {alphabet.map((char) => (
                        <div key={`plain-${char}`} 
                             className={`w-8 h-8 flex items-center justify-center rounded border text-sm font-bold transition-all
                             ${input.includes(char) ? 'bg-blue-600/20 border-blue-500 text-blue-300' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>
                            {char}
                        </div>
                    ))}
                </div>
                <div className="flex gap-1 mb-1 pl-16">
                     {alphabet.map((_, i) => (
                        <div key={i} className="w-8 flex justify-center">
                            <ArrowRight className="w-3 h-3 text-gray-600 rotate-90" />
                        </div>
                     ))}
                </div>
                <div className="flex gap-1">
                    <div className="w-16 text-xs text-gray-400 font-mono flex items-center">CIPHER:</div>
                    {alphabet.map((_, i) => {
                        const shiftedIndex = (i + shift) % 26;
                        const char = alphabet[shiftedIndex];
                        return (
                            <div key={`cipher-${i}`} 
                                className={`w-8 h-8 flex items-center justify-center rounded border text-sm font-bold transition-all
                                ${output.includes(char) ? 'bg-green-600/20 border-green-500 text-green-300' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>
                                {char}
                            </div>
                        );
                    })}
                </div>
            </div>
            <p className="text-xs text-center mt-2 text-gray-500">The alphabet is rotated left by {shift} positions.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Input Message</label>
                  <input 
                    type="text" 
                    value={input}
                    maxLength={15}
                    onChange={(e) => setInput(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shift Key (k={shift})</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="25" 
                    value={shift}
                    onChange={(e) => setShift(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-3"
                  />
                </div>
            </div>
          </div>
        </div>
        
        <ConceptExplainer title="Concept: Substitution Ciphers">
            <p><strong>Cryptography</strong> is the practice of securing communication from adversaries. It converts readable text (Plaintext) into unreadable text (Ciphertext).</p>
            <p>The <strong>Caesar Cipher</strong> is a simple substitution technique. It's named after Julius Caesar, who used it for private correspondence. By shifting each letter by a fixed number (the key), the message becomes scrambled. While easy to crack today with computers, it demonstrates the fundamental principle of keys and transformation.</p>
        </ConceptExplainer>
      </div>
      <div>
        <h4 className="flex items-center gap-2 text-gray-400 mb-3 font-mono text-sm uppercase tracking-widest">
          <Terminal className="w-4 h-4" /> crypto_implementation.py
        </h4>
        <CodeBlock code={pythonCode} />
      </div>
    </div>
  );
};

// --- Module 2: Network Flow ---

const NetworkFlowModule = () => {
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 3500); 
    return () => clearInterval(timer);
  }, []);

  const stages = [
    {
      title: "1. Client Request",
      desc: "The user clicks a link. TCP/IP breaks the request into packets and routes them across the internet to the Web Server.",
      activeNode: "client",
      packetPos: "left-[15%]",
      packetColor: "bg-blue-500",
      label: "HTTP GET"
    },
    {
      title: "2. Server Processing",
      desc: "The Web Server receives the packets. It realizes it needs user data, so it opens a NEW internal connection to the Database.",
      activeNode: "server",
      packetPos: "left-[50%]",
      packetColor: "bg-indigo-500",
      label: "SQL QUERY"
    },
    {
      title: "3. Database Retrieval",
      desc: "The Database finds the info and sends it back to the Web Server. TCP ensures no data is lost during this internal transfer.",
      activeNode: "db",
      packetPos: "left-[85%]",
      packetColor: "bg-green-500",
      label: "JSON DATA"
    },
    {
      title: "4. Response Delivery",
      desc: "The Web Server packages the data into HTML and sends it back to the Client. The browser reassembles the packets.",
      activeNode: "client-recv",
      packetPos: "left-[15%]", 
      packetColor: "bg-emerald-400",
      label: "200 OK"
    }
  ];

  const currentStage = stages[phase];

  const getPacketClass = () => {
      if (phase === 0) return "left-[50%] transition-all duration-[2000ms] ease-in-out opacity-100";
      if (phase === 1) return "left-[85%] transition-all duration-[2000ms] ease-in-out opacity-100";
      if (phase === 2) return "left-[50%] transition-all duration-[2000ms] ease-in-out opacity-100";
      if (phase === 3) return "left-[15%] transition-all duration-[2000ms] ease-in-out opacity-100";
      return "opacity-0";
  };

  const pythonCode = `import socket

def handle_user_request(user_socket):
    # 1. Receive Request from User (via TCP)
    request = user_socket.recv(1024)
    print("Web Server: Received HTTP GET")
    
    # 2. Server-to-Server Communication
    # Connect to Backend Database
    db_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    db_socket.connect(('192.168.1.50', 5432)) # Internal IP
    
    db_socket.send(b"SELECT * FROM users")
    
    # 3. Receive Data from DB
    user_data = db_socket.recv(4096)
    
    # 4. Send Response back to User
    user_socket.send(b"HTTP/1.1 200 OK\\n" + user_data)
    user_socket.close()`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-xl min-h-[450px] flex flex-col relative overflow-hidden">
          
          <h3 className="text-xl font-semibold text-blue-300 mb-8 flex items-center gap-2">
            <Network className="w-5 h-5" /> Network Communication Flow
          </h3>

          <div className="flex-1 relative flex items-center justify-between px-4 sm:px-8 mb-8">
             <div className="absolute left-[15%] right-[85%] top-1/2 h-1 bg-gray-700 -translate-y-1/2 z-0 w-[70%]"></div>
             
             <div className={`relative z-10 flex flex-col items-center gap-2 transition-transform duration-500 ${phase === 0 || phase === 3 ? 'scale-110' : 'scale-100 opacity-60'}`}>
                <div className="w-16 h-16 bg-gray-800 rounded-xl border-2 border-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <Monitor className="w-8 h-8 text-blue-400" />
                </div>
                <span className="text-xs font-bold text-gray-400">USER</span>
             </div>

             <div className={`relative z-10 flex flex-col items-center gap-2 transition-transform duration-500 ${phase === 0 || phase === 1 || phase === 3 ? 'scale-110' : 'scale-100 opacity-60'}`}>
                <div className="w-16 h-16 bg-gray-800 rounded-xl border-2 border-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    <Server className="w-8 h-8 text-indigo-400" />
                </div>
                <span className="text-xs font-bold text-gray-400">WEB SERVER</span>
             </div>

             <div className={`relative z-10 flex flex-col items-center gap-2 transition-transform duration-500 ${phase === 1 || phase === 2 ? 'scale-110' : 'scale-100 opacity-60'}`}>
                <div className="w-16 h-16 bg-gray-800 rounded-xl border-2 border-green-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                    <DbIcon className="w-8 h-8 text-green-400" />
                </div>
                <span className="text-xs font-bold text-gray-400">DATABASE</span>
             </div>

             <div className={`absolute top-1/2 -translate-y-[200%] -translate-x-1/2 z-20 ${getPacketClass()}`}>
                 <div className={`${currentStage.packetColor} text-white px-3 py-1 rounded text-[10px] font-bold shadow-lg whitespace-nowrap`}>
                    {currentStage.label}
                 </div>
             </div>
          </div>

          <div className="bg-black/40 border border-gray-700 rounded-lg p-4 transition-all duration-300">
             <div className="flex items-center gap-2 mb-2">
                 <div className={`w-2 h-2 rounded-full animate-pulse ${phase === 0 ? 'bg-blue-500' : phase === 1 ? 'bg-indigo-500' : phase === 2 ? 'bg-green-500' : 'bg-emerald-400'}`}></div>
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{currentStage.title}</span>
             </div>
             <p className="text-sm text-gray-300 leading-relaxed">
                 {currentStage.desc}
             </p>
          </div>

        </div>

        <ConceptExplainer title="Concept: The Client-Server Model">
            <p><strong>TCP/IP</strong> is the fundamental protocol suite for the internet. It acts like a postal system, breaking messages into small "packets," addressing them to the correct destination (IP), and ensuring they arrive in order (TCP).</p>
            <p>Modern applications use a <strong>Multi-Tier Architecture</strong>: Your computer (Client) talks to a Web Server, which then talks to a Database. Each step requires a secure network handshake and data transfer.</p>
        </ConceptExplainer>
      </div>
      <div>
        <h4 className="flex items-center gap-2 text-gray-400 mb-3 font-mono text-sm uppercase tracking-widest">
          <Terminal className="w-4 h-4" /> backend_logic.py
        </h4>
        <CodeBlock code={pythonCode} />
      </div>
    </div>
  );
};

// --- Module 3: Viruses (Updated Animation) ---

const VirusModule = () => {
  const [grid, setGrid] = useState(Array(25).fill('clean'));
  const [gameState, setGameState] = useState('idle'); // idle, planted, spreading, gameover
  const [timer, setTimer] = useState(3);

  const startInfection = () => {
    if (gameState !== 'idle') return;
    setGameState('planted');
    setTimer(3);
  };

  const reset = () => {
    setGrid(Array(25).fill('clean'));
    setGameState('idle');
    setTimer(3);
  };

  // Bomb Countdown Effect
  useEffect(() => {
    if (gameState === 'planted') {
      if (timer > 0) {
        const tick = setTimeout(() => setTimer(t => t - 1), 1000);
        return () => clearTimeout(tick);
      } else {
        setGameState('spreading');
        setGrid(prev => {
            const newG = [...prev];
            newG[12] = 'infected'; // Center explosion
            return newG;
        });
      }
    }
  }, [gameState, timer]);

  // Spreading Logic
  useEffect(() => {
    if (gameState !== 'spreading') return;
    
    const interval = setInterval(() => {
      setGrid(prev => {
        const next = [...prev];
        let changed = false;
        
        // Aggressive spread logic
        for (let i = 0; i < 25; i++) {
          if (prev[i] === 'infected') {
            const neighbors = [i-1, i+1, i-5, i+5, i-6, i-4, i+4, i+6]; // 8-way spread
            neighbors.forEach(n => {
              if (n >= 0 && n < 25 && prev[n] === 'clean' && Math.random() > 0.3) {
                next[n] = 'infected';
                changed = true;
              }
            });
          }
        }
        
        // Check for Game Over condition
        if (!next.includes('clean')) {
            setGameState('gameover');
        } else if (!changed) {
             // Force spread if stuck to ensure game over
             const cleanIndices = next.map((x, i) => x === 'clean' ? i : -1).filter(i => i !== -1);
             if (cleanIndices.length > 0) next[cleanIndices[Math.floor(Math.random() * cleanIndices.length)]] = 'infected';
        }

        return next;
      });
    }, 800); // Slower spread for better visualization
    return () => clearInterval(interval);
  }, [gameState]);

  const pythonCode = `import os
import time

def payload():
    print("CRITICAL ERROR: SYSTEM COMPROMISED")

def spread_virus():
    # 1. Target: Scan for vulnerable files
    target_files = [f for f in os.listdir('.') if f.endswith('.py')]
    
    # 2. Plant the Logic Bomb
    for file in target_files:
        with open(file, 'a') as f:
            # Inject malicious code
            f.write("\\n payload()") 
            print(f"Infected: {file}")
            
    # 3. Trigger Condition
    # Logic bombs wait for a specific date or event
    if time.strftime("%d/%m") == "01/04":
        payload() # BOOM

# spread_virus()`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-xl relative overflow-hidden min-h-[400px]">
           
           {/* Game Over Overlay */}
           {gameState === 'gameover' && (
               <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center animate-[fadeIn_0.5s]">
                   <Skull className="w-24 h-24 text-red-600 animate-bounce mb-4" />
                   <h2 className="text-5xl font-black text-red-500 tracking-widest glitch-text mb-2">GAME OVER</h2>
                   <p className="text-red-400 font-mono animate-pulse">SYSTEM FAILURE // DATA CORRUPTED</p>
                   <button onClick={reset} className="mt-8 px-6 py-2 border border-red-500 text-red-500 font-mono hover:bg-red-500 hover:text-white transition">
                       REBOOT SYSTEM
                   </button>
               </div>
           )}

           <div className="flex justify-between mb-6 items-center">
             <h3 className="text-xl font-semibold text-red-400 flex items-center gap-2">
                <FileWarning className="w-5 h-5" /> Logic Bomb Simulation
             </h3>
             <div className="flex gap-2">
               <button 
                 onClick={startInfection} 
                 disabled={gameState !== 'idle'}
                 className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-xs font-bold text-white transition shadow-lg shadow-red-900/50"
               >
                 <Bomb size={14} /> {gameState === 'idle' ? 'EXECUTE' : 'RUNNING...'}
               </button>
               <button onClick={reset} className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xs font-bold text-white transition">
                 <RotateCcw size={14} /> RESET
               </button>
             </div>
           </div>

           {/* Visualization Area */}
           <div className="relative">
                {/* Countdown Overlay */}
                {gameState === 'planted' && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="text-9xl font-black text-red-500 animate-ping opacity-75">{timer}</div>
                    </div>
                )}

               <div className="grid grid-cols-5 gap-3 w-full max-w-[350px] mx-auto p-4 bg-black/40 rounded-xl border border-gray-800">
                 {grid.map((status, i) => (
                   <div key={i} className={`aspect-square rounded-md flex items-center justify-center transition-all duration-300 relative ${status === 'clean' ? 'bg-gray-800 border border-gray-700' : 'bg-red-600 border border-red-400 shadow-[0_0_15px_rgba(220,38,38,0.8)] scale-110 rotate-1'}`}>
                     {status === 'clean' ? (
                        <div className="w-2 h-2 bg-blue-500/30 rounded-full" /> 
                     ) : (
                        <AlertTriangle className="w-5 h-5 text-black animate-pulse" />
                     )}
                   </div>
                 ))}
               </div>
           </div>
           
           <div className="mt-4 text-center font-mono text-xs text-gray-500">
                STATUS: {gameState === 'idle' ? 'SYSTEM NORMAL' : gameState === 'planted' ? 'BOMB PLANTED...' : gameState === 'spreading' ? 'CRITICAL INFECTION SPREADING' : 'FATAL ERROR'}
           </div>

        </div>

        <ConceptExplainer title="Concept: Viruses & Logic Bombs">
            <p>A <strong>Computer Virus</strong> is malicious code that piggybacks on legitimate files to travel between computers. It needs a "host" (like a Word document) and user interaction (opening the file) to replicate.</p>
            <p>This simulation specifically demonstrates a <strong>Logic Bomb</strong>. This is a virus that lies dormant until a specific condition is met (like a timer hitting zero or a specific date), at which point it triggers its malicious payload, corrupting data rapidly across the system.</p>
        </ConceptExplainer>
      </div>
      <div>
        <h4 className="flex items-center gap-2 text-gray-400 mb-3 font-mono text-sm uppercase tracking-widest"><Terminal className="w-4 h-4" /> virus_payload.py</h4>
        <CodeBlock code={pythonCode} />
      </div>
    </div>
  );
};

// --- Module 4: Steganography ---

const SteganographyModule = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      label: "Phase 1: The Cover Image",
      text: "This is the carrier file (sunset.jpg). To the naked eye, it looks like a normal image. The data hidden inside is too subtle to distort the image colors significantly.",
      status: "Analyzing..."
    },
    {
      label: "Phase 2: Bit Plane Analysis",
      text: "Digital images are grids of pixels. Each pixel has RGB numbers. Steganography changes just the last bit (LSB) of these numbers (e.g., 255 -> 254).",
      status: "Slicing Bits..."
    },
    {
      label: "Phase 3: Filtering the Noise",
      text: "We run a script to strip away the visual data (the sunset). What remains is the LSB layer, which looks like random static noise to a human.",
      status: "Isolating LSB..."
    },
    {
      label: "Phase 4: Reassembly & Reveal",
      text: "The computer reassembles these scattered bits. The 'noise' transforms into the hidden secret file that was there all along.",
      status: "DECODED"
    }
  ];

  const pythonCode = `from PIL import Image

def decode_image(image_path):
    img = Image.open(image_path)
    pixels = img.load()
    
    # 1. Create canvas for the hidden secret
    decoded = Image.new('RGB', img.size)
    decoded_pixels = decoded.load()

    for i in range(img.width):
        for j in range(img.height):
            r, g, b = pixels[i, j]
            
            # 2. Extract LSB (Last Bit)
            # If (r & 1) is 1, pixel is White
            if (r & 1) == 1:
                decoded_pixels[i, j] = (255, 255, 255)
            else:
                decoded_pixels[i, j] = (0, 0, 0)

    # 3. Reveal the hidden message
    decoded.show()`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-xl min-h-[450px] flex flex-col">
           <h3 className="text-xl font-semibold text-emerald-400 mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5" /> Auto-Decoder Simulation
           </h3>

           <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-gray-700 shadow-2xl bg-black group">
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-center">
                        <div className="text-6xl mb-4 animate-bounce">🔑</div>
                        <div className="font-mono text-green-500 font-bold tracking-[0.5em] text-2xl">SECRET_FOUND</div>
                        <div className="text-green-800 text-xs mt-2 font-mono">Payload: 4KB Hidden Data</div>
                    </div>
                </div>

                <div className={`absolute inset-0 opacity-50 transition-opacity duration-1000 ${step === 2 ? 'opacity-100 bg-green-900/10' : 'opacity-0'}`}>
                    <div className="w-full h-full flex flex-wrap content-center justify-center overflow-hidden p-4">
                        <span className="font-mono text-[10px] text-green-500/50 break-all leading-none">
                            {Array(400).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
                        </span>
                    </div>
                </div>

                <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${step >= 2 ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
                    <div className="w-full h-full bg-gradient-to-b from-indigo-900 via-purple-800 to-orange-500 relative">
                        <div className="absolute bottom-0 w-full h-1/3 bg-black/60 backdrop-blur-[2px]"></div>
                        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-orange-300 rounded-full blur-xl opacity-80"></div>
                        <div className="absolute bottom-1/3 left-0 w-full h-16 bg-white/5 bg-repeat-x"></div>
                        <div className="absolute top-4 right-4 bg-white/10 px-2 py-1 rounded text-[10px] text-white/50 font-mono">IMG_8942.JPG</div>
                        
                        <div className={`absolute inset-0 bg-emerald-500/10 transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
                             <div className="w-full h-full grid grid-cols-12 grid-rows-6">
                                 {[...Array(72)].map((_, i) => (
                                     <div key={i} className="border border-emerald-500/30"></div>
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-gray-600 px-3 py-1 rounded text-xs font-mono text-white z-20">
                    STATUS: <span className={step === 3 ? "text-green-400 font-bold" : "text-yellow-400 animate-pulse"}>{steps[step].status}</span>
                </div>

                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500 z-20" style={{ width: `${((step + 1) / 4) * 100}%` }}></div>
           </div>

           <div className="mt-6 bg-black/40 p-5 rounded-lg border border-gray-800 flex-1 flex flex-col justify-center transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <div className="text-xs text-blue-400 font-bold mb-2 uppercase tracking-widest pl-2">{steps[step].label}</div>
                <p className="text-sm text-gray-300 leading-relaxed pl-2">
                    {steps[step].text}
                </p>
           </div>

        </div>

        <ConceptExplainer title="Concept: Security by Obscurity">
            <p><strong>Steganography</strong> ("covered writing") is distinct from cryptography. While cryptography scrambles a message so it can't be read, steganography hides the message so it can't be <em>seen</em>.</p>
            <p>In this example, we use <strong>LSB (Least Significant Bit)</strong> modification. We change the very last bit of the color data for specific pixels. Since the change is so small (like changing a color from pure red 255 to almost-red 254), the human eye cannot detect the difference, but the computer can extract the secret.</p>
        </ConceptExplainer>
      </div>
      <div>
        <h4 className="flex items-center gap-2 text-gray-400 mb-3 font-mono text-sm uppercase tracking-widest">
          <Terminal className="w-4 h-4" /> decoder_script.py
        </h4>
        <CodeBlock code={pythonCode} />
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('crypto');

  const tabs = [
    { id: 'crypto', label: 'Cryptography', icon: Lock },
    { id: 'network', label: 'Network Flow', icon: Globe },
    { id: 'virus', label: 'Viruses', icon: Bug },
    { id: 'stego', label: 'Steganography', icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      
      {/* Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '30px 30px',
             opacity: 0.3 // 30% visibility as requested
           }}>
      </div>

      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 bg-gradient-to-tr from-green-500 to-blue-600 rounded-lg shadow-lg group-hover:shadow-green-500/20 transition-all">
                <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-200 transition">InfoSec<span className="text-green-500">_Lab</span></span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
             <div className="px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-xs font-mono text-gray-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                SYSTEM ONLINE
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent tracking-tight">
            Master Security Concepts
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Hands-on visualizations of core security mechanisms. <br />
            Select a module to begin the simulation.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 font-medium border
                  ${isActive 
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] transform -translate-y-1' 
                    : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-600'}
                `}
              >
                <Icon size={20} className={isActive ? "animate-bounce" : ""} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="min-h-[600px]">
          {activeTab === 'crypto' && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
               <SectionHeader icon={Lock} title="Cryptography" description="The art of hiding meaning. Below is the Caesar Cipher, a fundamental substitution method." />
               <CryptographyModule />
            </div>
          )}
          
          {activeTab === 'network' && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <SectionHeader icon={Globe} title="Network Communication" description="Tracking how data packets travel from user devices to deep backend servers using TCP/IP." />
              <NetworkFlowModule />
            </div>
          )}
          
          {activeTab === 'virus' && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <SectionHeader icon={Bug} title="Viruses" description="Malware that attaches to host files to replicate across a system." />
              <VirusModule />
            </div>
          )}

          {activeTab === 'stego' && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <SectionHeader icon={Eye} title="Steganography" description="Hiding secrets in plain sight. Unlike encryption, steganography hides the existence of the message itself." />
              <SteganographyModule />
            </div>
          )}
        </div>

      </main>

      <footer className="border-t border-gray-800/50 bg-black/40 mt-24 py-12 text-center text-gray-600 text-sm">
         InfoSec_Lab Educational Environment
      </footer>

      {/* Global Style for Glitch Text */}
      <style>{`
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: 'GAME OVER';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 red;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 blue;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(117px, 9999px, 86px, 0); }
          20% { clip: rect(27px, 9999px, 32px, 0); }
          40% { clip: rect(5px, 9999px, 86px, 0); }
          60% { clip: rect(66px, 9999px, 14px, 0); }
          80% { clip: rect(98px, 9999px, 66px, 0); }
          100% { clip: rect(48px, 9999px, 20px, 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip: rect(10px, 9999px, 78px, 0); }
          20% { clip: rect(138px, 9999px, 61px, 0); }
          40% { clip: rect(79px, 9999px, 2px, 0); }
          60% { clip: rect(18px, 9999px, 92px, 0); }
          80% { clip: rect(4px, 9999px, 110px, 0); }
          100% { clip: rect(105px, 9999px, 16px, 0); }
        }
      `}</style>
    </div>
  );
};

export default App;