import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Bot, Sword, Zap, Trophy } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const cloudY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-black overflow-hidden">
      <motion.div
        className="fixed inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-blue-900 to-black opacity-80" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </motion.div>

      <motion.div
        className="fixed top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"
        style={{ y: cloudY }}
      />
      <motion.div
        className="fixed top-40 right-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '150%']) }}
      />

      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              className="mb-8"
            >
              <motion.h1
                className="text-7xl md:text-9xl font-black text-white mb-6"
                style={{
                  textShadow: '4px 4px 0 #ff00ff, 8px 8px 0 #00ffff, 12px 12px 0 rgba(0,0,0,0.5)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em'
                }}
                animate={{
                  textShadow: [
                    '4px 4px 0 #ff00ff, 8px 8px 0 #00ffff, 12px 12px 0 rgba(0,0,0,0.5)',
                    '4px 4px 0 #00ffff, 8px 8px 0 #ff00ff, 12px 12px 0 rgba(0,0,0,0.5)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              >
                AI QUESTS
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="inline-block bg-black/60 border-4 border-cyan-400 p-8 backdrop-blur-sm"
                style={{
                  boxShadow: '0 0 30px rgba(0,255,255,0.5), inset 0 0 30px rgba(0,255,255,0.1)'
                }}
              >
                <p className="text-2xl md:text-3xl text-cyan-300 font-bold mb-4" style={{ fontFamily: 'monospace' }}>
                  PROGRAM YOUR DESTINY
                </p>
                <p className="text-lg text-white/80 max-w-2xl" style={{ fontFamily: 'monospace' }}>
                  Enter a world where code becomes reality. Program AI bots, battle other players,
                  and dominate the digital arena.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <motion.div
                className="relative inline-block border-4 border-cyan-400"
                style={{
                  boxShadow: '0 0 40px rgba(0,255,255,0.6), 8px 8px 0 rgba(0,0,0,0.5)'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 60px rgba(0,255,255,0.8), 8px 8px 0 rgba(0,0,0,0.5)' }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/screenshots/screenshot.gif`}
                  alt="AI Quests Gameplay"
                  className="max-w-full h-auto block"
                  style={{ maxHeight: '600px' }}
                />
                <div className="absolute inset-0 border-2 border-cyan-400 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(0,255,255,0.3)'
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-6 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: Code2, label: 'CODE', color: 'bg-yellow-400' },
                { icon: Bot, label: 'DEPLOY', color: 'bg-green-400' },
                { icon: Sword, label: 'BATTLE', color: 'bg-red-400' },
                { icon: Zap, label: 'WIN', color: 'bg-cyan-400' }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className={`${item.color} text-black p-6 border-4 border-white font-bold`}
                  style={{
                    boxShadow: '6px 6px 0 rgba(0,0,0,0.5)',
                    fontFamily: 'monospace'
                  }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: '8px 8px 0 rgba(0,0,0,0.5), 0 0 20px currentColor',
                    scale: 1.1
                  }}
                >
                  <item.icon className="w-12 h-12 mb-2 mx-auto" strokeWidth={3} />
                  <div className="text-xl">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-16 mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Player Ranking Chart */}
                <motion.div
                  className="bg-black/80 border-4 border-cyan-400 p-6"
                  style={{
                    boxShadow: '0 0 30px rgba(0,255,255,0.5), inset 0 0 30px rgba(0,255,255,0.1)'
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Trophy className="w-8 h-8 text-cyan-400" strokeWidth={3} />
                    <h2 className="text-3xl font-black text-cyan-400" style={{ fontFamily: 'monospace' }}>
                      PLAYER RANKINGS
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: 'Alex Chen', score: 2847, school: 'stanford.edu' },
                      { rank: 2, name: 'Sarah Kim', score: 2756, school: 'mit.edu' },
                      { rank: 3, name: 'Jordan Lee', score: 2689, school: 'berkeley.edu' },
                      { rank: 4, name: 'Taylor Park', score: 2643, school: 'cmu.edu' },
                      { rank: 5, name: 'Morgan Zhang', score: 2598, school: 'harvard.edu' },
                      { rank: 6, name: 'Casey Brown', score: 2542, school: 'yale.edu' },
                      { rank: 7, name: 'Riley Davis', score: 2487, school: 'princeton.edu' },
                      { rank: 8, name: 'Sam Wilson', score: 2431, school: 'stanford.edu' }
                    ].map((player, i) => (
                      <motion.div
                        key={player.rank}
                        className="flex items-center gap-4 p-3 bg-black/60 border-2 border-white/20 hover:border-cyan-400 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + i * 0.05 }}
                        whileHover={{ scale: 1.02, borderColor: 'rgba(0,255,255,0.8)' }}
                      >
                        <div className={`text-2xl font-black ${
                          player.rank === 1 ? 'text-yellow-400' :
                          player.rank === 2 ? 'text-gray-300' :
                          player.rank === 3 ? 'text-orange-400' :
                          'text-cyan-400'
                        }`} style={{ fontFamily: 'monospace', minWidth: '40px' }}>
                          #{player.rank}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-bold" style={{ fontFamily: 'monospace' }}>
                            {player.name}
                          </div>
                          <div className="text-cyan-300 text-sm" style={{ fontFamily: 'monospace' }}>
                            {player.school}
                          </div>
                        </div>
                        <div className="text-cyan-400 font-bold text-xl" style={{ fontFamily: 'monospace' }}>
                          {player.score.toLocaleString()}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* School Ranking Chart */}
                <motion.div
                  className="bg-black/80 border-4 border-yellow-400 p-6"
                  style={{
                    boxShadow: '0 0 30px rgba(255,215,0,0.5), inset 0 0 30px rgba(255,215,0,0.1)'
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Trophy className="w-8 h-8 text-yellow-400" strokeWidth={3} />
                    <h2 className="text-3xl font-black text-yellow-400" style={{ fontFamily: 'monospace' }}>
                      SCHOOL RANKINGS
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: 'Stanford', domain: 'stanford.edu', avgScore: 2654, players: 42 },
                      { rank: 2, name: 'MIT', domain: 'mit.edu', avgScore: 2621, players: 38 },
                      { rank: 3, name: 'Berkeley', domain: 'berkeley.edu', avgScore: 2587, players: 45 },
                      { rank: 4, name: 'CMU', domain: 'cmu.edu', avgScore: 2553, players: 35 },
                      { rank: 5, name: 'Harvard', domain: 'harvard.edu', avgScore: 2528, players: 40 },
                      { rank: 6, name: 'Yale', domain: 'yale.edu', avgScore: 2496, players: 32 },
                      { rank: 7, name: 'Princeton', domain: 'princeton.edu', avgScore: 2471, players: 28 }
                    ].map((school, i) => (
                      <motion.div
                        key={school.rank}
                        className="flex items-center gap-4 p-3 bg-black/60 border-2 border-white/20 hover:border-yellow-400 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + i * 0.05 }}
                        whileHover={{ scale: 1.02, borderColor: 'rgba(255,215,0,0.8)' }}
                      >
                        <div className={`text-2xl font-black ${
                          school.rank === 1 ? 'text-yellow-400' :
                          school.rank === 2 ? 'text-gray-300' :
                          school.rank === 3 ? 'text-orange-400' :
                          'text-yellow-400'
                        }`} style={{ fontFamily: 'monospace', minWidth: '40px' }}>
                          #{school.rank}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-bold" style={{ fontFamily: 'monospace' }}>
                            {school.name}
                          </div>
                          <div className="text-yellow-300 text-sm" style={{ fontFamily: 'monospace' }}>
                            {school.domain} • {school.players} players
                          </div>
                        </div>
                        <div className="text-yellow-400 font-bold text-xl" style={{ fontFamily: 'monospace' }}>
                          {school.avgScore}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

