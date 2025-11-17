import { motion, useScroll, useTransform } from 'framer-motion';
import { Gamepad2, Code2, Users, Zap, Bot, Sword } from 'lucide-react';
import { useRef } from 'react';

function App() {
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
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b-4 border-cyan-400"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.7))',
            boxShadow: '0 0 20px rgba(0,255,255,0.3)'
          }}
        >
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <Gamepad2 className="w-8 h-8 text-cyan-400" strokeWidth={3} />
              <span className="text-2xl font-bold text-white tracking-wider" style={{
                textShadow: '2px 2px 0 #00ffff, 4px 4px 0 rgba(0,255,255,0.3)',
                fontFamily: 'monospace'
              }}>
                CODE QUEST
              </span>
            </motion.div>
            <motion.button
              className="px-6 py-2 bg-cyan-400 text-black font-bold border-4 border-white"
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,255,255,0.8)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
                fontFamily: 'monospace'
              }}
            >
              ENTER GAME
            </motion.button>
          </div>
        </motion.header>

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
                CODE QUEST
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
                  alt="Code Quest Gameplay"
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
              className="mt-16"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-cyan-400 text-4xl">▼</div>
              <div className="text-cyan-400 font-bold" style={{ fontFamily: 'monospace' }}>
                SCROLL TO LEARN MORE
              </div>
            </motion.div>
          </div>
        </section>

        <section className="min-h-screen py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-black/80 border-8 border-yellow-400 p-12 mb-16"
                style={{
                  boxShadow: '0 0 40px rgba(255,215,0,0.5), inset 0 0 40px rgba(255,215,0,0.1)'
                }}
              >
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  whileHover={{ x: 10 }}
                >
                  <div className="text-6xl font-black text-yellow-400" style={{
                    textShadow: '3px 3px 0 rgba(0,0,0,0.5)',
                    fontFamily: 'monospace'
                  }}>
                    WHAT
                  </div>
                  <div className="h-2 flex-1 bg-yellow-400" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'monospace' }}>
                      THE OBJECTIVE
                    </h3>
                    <p className="text-xl text-white/90 leading-relaxed" style={{ fontFamily: 'monospace' }}>
                      A multiplayer 2D world where you don't directly control your character.
                      Instead, you write code to program AI bot NPCs that interact, battle,
                      and compete in a living digital town.
                    </p>
                  </div>

                  <div className="bg-yellow-400/10 border-4 border-yellow-400 p-6">
                    <h4 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'monospace' }}>
                      KEY FEATURES
                    </h4>
                    <ul className="space-y-3 text-white text-lg" style={{ fontFamily: 'monospace' }}>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400">►</span>
                        Program bots in Python or TypeScript
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400">►</span>
                        Bots execute code autonomously
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400">►</span>
                        Real-time multiplayer interactions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400">►</span>
                        Battle and compete with other players
                      </li>
                    </ul>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-8"
                >
                  <motion.div
                    className="relative inline-block border-4 border-yellow-400"
                    style={{
                      boxShadow: '0 0 40px rgba(255,215,0,0.6), 8px 8px 0 rgba(0,0,0,0.5)'
                    }}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 60px rgba(255,215,0,0.8), 8px 8px 0 rgba(0,0,0,0.5)' }}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}assets/screenshots/screenshot2.png`}
                      alt="Code Quest Game Screenshot"
                      className="max-w-full h-auto block"
                      style={{ maxHeight: '500px' }}
                    />
                    <div className="absolute inset-0 border-2 border-yellow-400 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 20px rgba(255,215,0,0.3)'
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-black/80 border-8 border-magenta-500 p-12 mb-16"
                style={{
                  boxShadow: '0 0 40px rgba(255,0,255,0.5), inset 0 0 40px rgba(255,0,255,0.1)',
                  borderColor: '#ff00ff'
                }}
              >
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  whileHover={{ x: 10 }}
                >
                  <div className="text-6xl font-black" style={{
                    color: '#ff00ff',
                    textShadow: '3px 3px 0 rgba(0,0,0,0.5)',
                    fontFamily: 'monospace'
                  }}>
                    WHY
                  </div>
                  <div className="h-2 flex-1" style={{ backgroundColor: '#ff00ff' }} />
                </motion.div>

                <div>
                  <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'monospace' }}>
                    THE VISION
                  </h3>
                  <p className="text-xl text-white/90 leading-relaxed mb-6" style={{ fontFamily: 'monospace' }}>
                    AI usage has always been 1:1 with humans and LLMs. There hasn't existed
                    a product that really explores the social dimension of an AI product.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {[
                      { icon: Users, title: 'SOCIAL AI', desc: 'Watch AI agents interact and form emergent behaviors' },
                      { icon: Zap, title: 'NEW PARADIGM', desc: 'Move beyond 1:1 human-AI to many-to-many interactions' },
                      { icon: Gamepad2, title: 'LEARN BY PLAYING', desc: 'Master programming through competitive gameplay' }
                    ].map((item, i) => (
                      <motion.div
                        key={item.title}
                        className="p-6 border-4 border-white bg-black/60"
                        style={{
                          boxShadow: '4px 4px 0 rgba(255,0,255,0.5)'
                        }}
                        whileHover={{
                          y: -10,
                          boxShadow: '6px 6px 0 rgba(255,0,255,0.8)'
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <item.icon className="w-12 h-12 mb-4" style={{ color: '#ff00ff' }} strokeWidth={3} />
                        <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'monospace' }}>
                          {item.title}
                        </h4>
                        <p className="text-white/80" style={{ fontFamily: 'monospace' }}>
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-black/80 border-8 border-cyan-400 p-12"
                style={{
                  boxShadow: '0 0 40px rgba(0,255,255,0.5), inset 0 0 40px rgba(0,255,255,0.1)'
                }}
              >
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  whileHover={{ x: 10 }}
                >
                  <div className="text-6xl font-black text-cyan-400" style={{
                    textShadow: '3px 3px 0 rgba(0,0,0,0.5)',
                    fontFamily: 'monospace'
                  }}>
                    HOW
                  </div>
                  <div className="h-2 flex-1 bg-cyan-400" />
                </motion.div>

                <div>
                  <h3 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'monospace' }}>
                    THE MECHANICS
                  </h3>

                  <div className="space-y-8">
                    {[
                      {
                        step: '01',
                        title: 'WRITE YOUR CODE',
                        desc: 'Use Python or TypeScript to program your bot\'s behavior, strategies, and interactions.',
                        color: 'cyan'
                      },
                      {
                        step: '02',
                        title: 'SUBMIT & DEPLOY',
                        desc: 'Upload your code through the game\'s interface. Your bot spawns into the world.',
                        color: 'yellow'
                      },
                      {
                        step: '03',
                        title: 'AUTONOMOUS EXECUTION',
                        desc: 'Your bot automatically executes your code, making decisions and taking actions in real-time.',
                        color: 'green'
                      },
                      {
                        step: '04',
                        title: 'BATTLE & DOMINATE',
                        desc: 'Compete with other player bots online. Win battles, gain territory, and climb the leaderboards.',
                        color: 'red'
                      }
                    ].map((item, i) => (
                      <motion.div
                        key={item.step}
                        className="flex gap-6 items-start"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <motion.div
                          className={`text-5xl font-black ${
                            item.color === 'cyan' ? 'text-cyan-400' :
                            item.color === 'yellow' ? 'text-yellow-400' :
                            item.color === 'green' ? 'text-green-400' :
                            'text-red-400'
                          }`}
                          style={{
                            textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
                            fontFamily: 'monospace'
                          }}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                        >
                          {item.step}
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'monospace' }}>
                            {item.title}
                          </h4>
                          <p className="text-lg text-white/80" style={{ fontFamily: 'monospace' }}>
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-12 bg-cyan-400/10 border-4 border-cyan-400 p-8"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Code2 className="w-10 h-10 text-cyan-400" strokeWidth={3} />
                      <h4 className="text-2xl font-bold text-cyan-400" style={{ fontFamily: 'monospace' }}>
                        SUPPORTED LANGUAGES
                      </h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-black/60 border-2 border-white p-6">
                        <div className="text-3xl font-bold text-yellow-400 mb-2" style={{ fontFamily: 'monospace' }}>
                          PYTHON
                        </div>
                        <p className="text-white/80" style={{ fontFamily: 'monospace' }}>
                          Write AI logic with Python's powerful libraries
                        </p>
                      </div>
                      <div className="bg-black/60 border-2 border-white p-6">
                        <div className="text-3xl font-bold text-blue-400 mb-2" style={{ fontFamily: 'monospace' }}>
                          TYPESCRIPT
                        </div>
                        <p className="text-white/80" style={{ fontFamily: 'monospace' }}>
                          Build sophisticated bots with type safety
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.footer
          className="py-12 px-6 border-t-4 border-cyan-400 bg-black/90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.button
              className="px-12 py-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-2xl font-black border-4 border-white mb-8"
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 40px rgba(0,255,255,1)',
                y: -10
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '8px 8px 0 rgba(0,0,0,0.5)',
                fontFamily: 'monospace'
              }}
            >
              START CODING NOW
            </motion.button>

            <p className="text-white/60 text-lg" style={{ fontFamily: 'monospace' }}>
              © 2025 CODE QUEST • WHERE CODE BECOMES REALITY
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
