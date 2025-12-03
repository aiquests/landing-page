import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Terminal, Play, X, Code2, Zap, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

function RallyGame() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [simRunning, setSimRunning] = useState(false);
  const [code, setCode] = useState(`# RALLY CAR CONFIGURATION 

# Optimize these values based on terrain input

def update_car_config(terrain_type):
    config = {
        "gear_ratio": 3.5,
        "suspension_stiffness": 0.5, # 0.0 to 1.0
        "differential_lock": 0.2,    # 0.0 (Open) to 1.0 (Locked)
        "ride_height": 0.1,          # meters
        "tire_compound": "soft"      # soft, medium, hard
    }
    
    # TODO: Implement Reinforcement Learning Logic
    # or manual terrain overrides below
    
    if terrain_type == "SNOW":
        # Hint: Softer suspension, higher diff lock?
        pass 
        
    elif terrain_type == "DIRT":
        pass
        
    return config`);

  const [telemetry, setTelemetry] = useState({
    speed: 0,
    terrain: 'TARMAC',
    efficiency: 0.5
  });

  // Refs for Three.js objects to access them in the animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carRef = useRef<THREE.Mesh | null>(null);
  
  // Game state refs
  const gameStateRef = useRef({
    carAngle: 0,
    carSpeed: 0,
    carEfficiency: 0.5,
    trackRadius: 50,
    isRunning: false
  });

  useEffect(() => {
    if (!mountRef.current) return;

    // Init Three.js
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 20, 120);
    sceneRef.current = scene;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 40, 60);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 50, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Track Setup
    const trackRadius = gameStateRef.current.trackRadius;
    const trackWidth = 8;

    const terrains = [
      { name: "SNOW", color: 0xffffff, start: 0, end: Math.PI / 2 },
      { name: "DIRT", color: 0x8B4513, start: Math.PI / 2, end: Math.PI },
      { name: "GRAVEL", color: 0x64748b, start: Math.PI, end: Math.PI * 1.5 },
      { name: "SAND", color: 0xfacc15, start: Math.PI * 1.5, end: Math.PI * 2 }
    ];

    terrains.forEach(t => {
      const geometry = new THREE.RingGeometry(trackRadius - trackWidth/2, trackRadius + trackWidth/2, 64, 1, t.start, Math.PI/2);
      const material = new THREE.MeshStandardMaterial({ 
        color: t.color, 
        roughness: 1,
        side: THREE.DoubleSide
      });
      const segment = new THREE.Mesh(geometry, material);
      segment.rotation.x = -Math.PI / 2;
      segment.receiveShadow = true;
      scene.add(segment);
    });

    // Center Ground
    const groundGeo = new THREE.CircleGeometry(trackRadius - 5, 64);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x1e293b }); // Dark slate ground
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Environment Objects (Trees, Pyramids)
    
    // Helper to create tree
    const createTree = (color: number, x: number, z: number, scale: number = 1) => {
      const group = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5 * scale, 0.6 * scale, 2 * scale), 
        new THREE.MeshStandardMaterial({color: 0x5c4033})
      );
      const leaves = new THREE.Mesh(
        new THREE.ConeGeometry(2 * scale, 5 * scale), 
        new THREE.MeshStandardMaterial({color})
      );
      leaves.position.y = 3.5 * scale;
      trunk.position.y = 1 * scale;
      trunk.castShadow = true;
      leaves.castShadow = true;
      group.add(trunk);
      group.add(leaves);
      group.position.set(x, 0, z);
      return group;
    };

    // Helper to create pyramid
    const createPyramid = (x: number, z: number, scale: number = 1) => {
        const geometry = new THREE.ConeGeometry(3 * scale, 4 * scale, 4);
        const material = new THREE.MeshStandardMaterial({ color: 0xd4af37 }); // Gold-ish sand color
        const pyramid = new THREE.Mesh(geometry, material);
        pyramid.position.set(x, 2 * scale, z);
        pyramid.castShadow = true;
        return pyramid;
    };

    // Populate Environment
    for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = (Math.random() * (trackRadius - 10)); // Inside track
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;

        // Determine terrain type based on angle to place appropriate objects
        // Angles match the terrain definitions above (0-PI/2 Snow, PI/2-PI Dirt, etc)
        let normalizedAngle = angle % (Math.PI * 2);
        if (normalizedAngle < 0) normalizedAngle += Math.PI * 2;

        if (normalizedAngle >= 0 && normalizedAngle < Math.PI / 2) {
            // SNOW: Snow trees
            scene.add(createTree(0xe2e8f0, x, z, 0.8 + Math.random() * 0.4));
        } else if (normalizedAngle >= Math.PI / 2 && normalizedAngle < Math.PI) {
            // DIRT: More regular trees
             scene.add(createTree(0x228b22, x, z, 0.8 + Math.random() * 0.4));
        } else if (normalizedAngle >= Math.PI * 1.5 && normalizedAngle < Math.PI * 2) {
             // SAND: Pyramids
             if (Math.random() > 0.5) { // Fewer pyramids than trees
                scene.add(createPyramid(x, z, 1 + Math.random()));
             }
        } else {
            // GRAVEL: Maybe some rocks or sparse trees (using regular trees for now)
             if (Math.random() > 0.7) {
                scene.add(createTree(0x556b2f, x, z, 0.6 + Math.random() * 0.3));
             }
        }
    }

    // Car
    const carGeo = new THREE.BoxGeometry(2, 1, 4);
    const carMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4 }); // Cyan car
    const car = new THREE.Mesh(carGeo, carMat);
    car.castShadow = true;
    // Add some details to car
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 2), new THREE.MeshStandardMaterial({ color: 0x000000 }));
    roof.position.y = 0.8;
    car.add(roof);
    
    scene.add(car);
    carRef.current = car;

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (carRef.current) {
        // Physics / Game Logic
        const { trackRadius, carEfficiency } = gameStateRef.current;
        
        // Angle normalization
        let normalizedAngle = gameStateRef.current.carAngle % (Math.PI * 2);
        if (normalizedAngle < 0) normalizedAngle += Math.PI * 2;

        // Detect Terrain
        const currentTerrain = terrains.find(t => normalizedAngle >= t.start && normalizedAngle < t.end) || terrains[3];
        
        // Friction logic
        let friction = 1.0;
        if (currentTerrain.name === "SNOW") friction = 0.4;
        if (currentTerrain.name === "SAND") friction = 0.5;
        if (currentTerrain.name === "GRAVEL") friction = 0.7;
        if (currentTerrain.name === "DIRT") friction = 0.8;

        // Target Speed
        let targetSpeed = 0.05 * friction * carEfficiency;
        if (!gameStateRef.current.isRunning) targetSpeed = 0;

        // Lerp Speed
        gameStateRef.current.carSpeed += (targetSpeed - gameStateRef.current.carSpeed) * 0.05;

        // Move Car
        gameStateRef.current.carAngle -= gameStateRef.current.carSpeed; // Clockwise
        const angle = gameStateRef.current.carAngle;

        carRef.current.position.x = Math.cos(angle) * trackRadius;
        carRef.current.position.z = Math.sin(angle) * trackRadius;
        carRef.current.rotation.y = -angle;

        // Suspension bobbing
        carRef.current.position.y = 1 + Math.sin(Date.now() * 0.01) * 0.05;

        // Camera Follow
        if (cameraRef.current) {
            cameraRef.current.position.x += (carRef.current.position.x + 30 - cameraRef.current.position.x) * 0.05;
            cameraRef.current.position.z += (carRef.current.position.z + 30 - cameraRef.current.position.z) * 0.05;
            cameraRef.current.lookAt(carRef.current.position);
        }

        // Update React State for UI (throttled slightly could be better, but doing per frame for smoothness)
        setTelemetry({
            speed: Math.floor(gameStateRef.current.carSpeed * 3000),
            terrain: currentTerrain.name,
            efficiency: gameStateRef.current.carEfficiency
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
        if (mountRef.current && cameraRef.current && rendererRef.current) {
            const w = mountRef.current.clientWidth;
            const h = mountRef.current.clientHeight;
            cameraRef.current.aspect = w / h;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(w, h);
        }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []); // Run once on mount

  const runSimulation = () => {
    setSimRunning(true);
    gameStateRef.current.isRunning = true;
    
    // Simulate optimization improvement
    setTimeout(() => {
        gameStateRef.current.carEfficiency = Math.min(gameStateRef.current.carEfficiency + 0.2, 1.5);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-black pt-16"> {/* pt-16 for navbar space */}
      
      {/* LEFT: 3D Simulation */}
      <div className="relative w-3/5 h-full bg-slate-900 overflow-hidden" ref={mountRef}>
        <div className="absolute top-4 left-4 z-10 bg-slate-900/80 p-4 rounded-lg border border-slate-700 backdrop-blur-md">
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Telemetry</h4>
          <div className="text-3xl font-mono font-bold text-white mb-1">
            {telemetry.speed} <span className="text-sm text-slate-500">km/h</span>
          </div>
          <div className={`text-xs font-mono font-bold mt-1 ${
            telemetry.terrain === 'SNOW' ? 'text-white' :
            telemetry.terrain === 'DIRT' ? 'text-amber-700' :
            telemetry.terrain === 'SAND' ? 'text-yellow-400' :
            'text-slate-400'
          }`}>
            TERRAIN: {telemetry.terrain}
          </div>
          
          <div className="mt-3 h-1.5 w-32 bg-slate-700 rounded-full overflow-hidden">
            <div 
                className="h-full bg-cyan-500 transition-all duration-100"
                style={{ width: `${(telemetry.efficiency / 1.5) * 100}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">THROTTLE / EFFICIENCY</div>
        </div>
      </div>

      {/* RIGHT: Editor */}
      <div className="w-2/5 flex flex-col bg-[#1e1e1e] border-l border-slate-800">
        
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 h-12 bg-[#252526] border-b border-[#3e3e42]">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-300 font-mono">
            <Code2 className="w-4 h-4 text-blue-400" />
            rally_optimizer.py
          </div>
          <Link to="/challenges">
            <button className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* Editor Body */}
        <div className="flex-1 relative">
            <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-[#1e1e1e] text-slate-300 p-4 font-mono text-sm outline-none resize-none leading-relaxed"
                spellCheck={false}
            />
        </div>

        {/* AI Co-Pilot Section */}
        <div className="h-1/3 bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col">
            <div className="bg-[#252526] px-4 py-2 text-xs font-bold text-cyan-400 uppercase tracking-wider flex justify-between items-center border-b border-[#3e3e42]">
                <span className="flex items-center gap-2">
                    <Zap className="w-3 h-3" /> AI CO-PILOT
                </span>
                <span className="text-slate-500 font-mono">GPT-4o (Simulated)</span>
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3">
                <textarea 
                    className="w-full bg-slate-800/50 text-slate-200 text-sm p-3 rounded border border-slate-700 resize-none focus:border-cyan-500 outline-none flex-1 transition-colors font-mono placeholder:text-slate-600"
                    placeholder="Prompt the AI: 'Optimize gear ratios for gravel to reduce slippage...'"
                />
                <div className="flex justify-end">
                    <button 
                        onClick={runSimulation}
                        disabled={simRunning}
                        className={`
                            px-6 py-2 rounded text-sm font-bold flex items-center gap-2 transition-all
                            ${simRunning 
                                ? 'bg-green-600/20 text-green-500 cursor-default' 
                                : 'bg-green-600 hover:bg-green-500 text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                            }
                        `}
                    >
                        {simRunning ? (
                            <>Running Simulation...</>
                        ) : (
                            <>
                                <Play className="w-4 h-4" fill="currentColor" /> DEPLOY & RUN
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

export default RallyGame;

