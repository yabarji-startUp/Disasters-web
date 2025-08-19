import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import {
  Activity,
  Cpu,
  Database,
  Globe,
  MemoryStick,
  Timer,
  Zap,
  Layers,
  FileText,
  FilePlus,
  Image,
  Cloud
} from 'lucide-react'
import StatsCard from './components/StatsCard'

// Lazy loading pour Three.js (RGESN 1.2)
const ThreeScene = lazy(() => import('./components/ThreeScene'))

type Stat = {
  bundle: number
  weight: number
  dom: number
  resources: number
  js: number
  css: number
  img: number
  cache: number
  memory: number
  load: number
  rps: number
  pl: number
}

const limits = {
  weight: [512_000, 1_048_576],
  dom: [1_000, 2_000],
  resources: [50, 100],
  js: [153_600, 307_200],
  css: [51_200, 102_400],
  img: [307_200, 716_800],
  cache: [0.6, 0.4],
  memory: [100, 200], // MB
  load: [50, 80], // %
  rps: [10, 20] // requests per second
}

const color = (v: number, [g, y]: number[], inv = false) =>
  inv
    ? v >= g
      ? 'border-green-500/30 bg-green-500/20'
      : v >= y
      ? 'border-yellow-500/30 bg-yellow-500/20'
      : 'border-red-500/30 bg-red-500/20'
    : v <= g
    ? 'border-green-500/30 bg-green-500/20'
    : v <= y
    ? 'border-yellow-500/30 bg-yellow-500/20'
    : 'border-red-500/30 bg-red-500/20'

export default function App() {
  console.log('App component rendered')
  
  const [stats, setStats] = useState<Stat>({
    bundle: 0,
    weight: 0,
    dom: 0,
    resources: 0,
    js: 0,
    css: 0,
    img: 0,
    cache: 0,
    memory: 0,
    load: 0,
    rps: 0,
    pl: 0
  })
  const [ready, setReady] = useState(false)
  const [show3D, setShow3D] = useState(false)
  const injectedRef = useRef(false)
  const intervalRef = useRef<number>()

  // RGESN 2.2 : Optimisation du rendu 3D - Chargement différé
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow3D(true)
    }, 2000) // Retarde le chargement 3D de 2 secondes

    return () => clearTimeout(timer)
  }, [])

  // Three.js logic moved to separate component with lazy loading

  useEffect(() => {
    if (injectedRef.current) return
    injectedRef.current = true
    
    // Désactiver le Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.unregister()
          console.log('Service Worker désactivé')
        }
      })
    }
    
    // Optimisation RGESN 1.1 : Suppression du chargement de ressources inutiles
    // const loadAssets = () => {
    //   const h = document.head
    //   const link = document.createElement('link')
    //   link.rel = 'stylesheet'
    //   link.href = 'http://localhost:5001/static/big.css'
    //   h.appendChild(link)
    //   const script = document.createElement('script')
    //   script.src = 'http://localhost:5001/static/big.js'
    //   script.crossOrigin = 'anonymous'
    //   h.appendChild(script)
    // }
    // Suppression du chargement de ressources inutiles pour optimiser le KPI Ressources
    // if (document.readyState === 'complete') {
    //   loadAssets()
    // } else {
    //   window.addEventListener('load', loadAssets, { once: true })
    // }
  }, [])

  useEffect(() => {
    const startTime = performance.now();

    const computeStats = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      if (!nav) return;

      const totalWeight = nav.transferSize + resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const jsWeight = resources.filter(r => r.initiatorType === 'script').reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const cssWeight = resources.filter(r => r.initiatorType === 'link').reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const imgWeight = resources
        .filter(
          r =>
            r.initiatorType === 'img' ||
            r.initiatorType === 'css' ||
            /\.(jpg|jpeg|png|gif|webp)$/i.test(r.name)
        )
        .reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const totalEncoded = nav.encodedBodySize + resources.reduce((sum, r) => sum + (r.encodedBodySize || 0), 0);
      // RGESN 3.1 : Correction du calcul initial du cache hit
      const cacheRatio = totalEncoded > 0 && totalWeight > 0 ? Math.max(0, Math.min(1, 1 - totalWeight / totalEncoded)) : 0;

      // RGESN 1.2 : Optimisation de la mesure du temps de chargement
      const loadTime = Math.round(performance.now() - startTime);
      const domContentLoaded = nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart;
      const loadEvent = nav.loadEventEnd - nav.loadEventStart;
      
      setStats(s => ({
        ...s,
        bundle: nav.transferSize,
        weight: totalWeight,
        dom: document.getElementsByTagName('*').length,
        resources: resources.length,
        js: jsWeight,
        css: cssWeight || s.css,
        img: imgWeight || s.img,
        cache: cacheRatio,
        pl: Math.min(loadTime, domContentLoaded + loadEvent) // Utilise la mesure la plus précise
      }));
      setReady(true);
    };

    if (document.readyState === 'complete') {
      computeStats();
    } else {
      window.addEventListener('load', computeStats, { once: true });
    }

    // Ajout du rafraîchissement périodique
    const interval = setInterval(computeStats, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const po = new PerformanceObserver(list => {
      const res = list.getEntries() as PerformanceResourceTiming[]
      const added = res.reduce((a, b) => a + (b.transferSize || 0), 0)
      const jsAdd = res.filter(r => r.initiatorType === 'script').reduce((a, b) => a + (b.transferSize || 0), 0)
      const cssAdd = res.filter(r => r.initiatorType === 'link' || /\.css$/i.test(r.name)).reduce((a, b) => a + (b.transferSize || 0), 0) 
      const isImg = (r: PerformanceResourceTiming) => r.initiatorType === 'img' || r.initiatorType === 'css' || /\.(avif|jpe?g|png|gif|webp|svg)$/i.test(r.name);
      const imgAdd = res.filter(isImg).reduce((a, b) => a + (b.transferSize || 0), 0);
      const encAdd = res.reduce((a, b) => a + (b.encodedBodySize || 0), 0)
      setStats(s => {
        const weight = s.weight + added
        const enc = (1 - s.cache) * s.weight + encAdd
        // RGESN 3.1 : Correction du calcul du cache hit pour éviter les valeurs aberrantes
        const cache = enc > 0 && weight > 0 ? Math.max(0, Math.min(1, 1 - weight / enc)) : s.cache
        return { ...s, weight, js: s.js + jsAdd, css: s.css + cssAdd, img: s.img + imgAdd, cache }
      })
    })
    po.observe({ type: 'resource', buffered: true })
    return () => po.disconnect()
  }, [])

  useEffect(() => {
    console.log('useEffect for interval triggered, intervalRef.current:', intervalRef.current)
    
    // Nettoyer l'intervalle existant s'il y en a un
    if (intervalRef.current) {
      console.log('Cleaning up existing interval:', intervalRef.current)
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }

    console.log('Setting up new interval...')
    intervalRef.current = window.setInterval(async () => {
      console.log('Interval triggered at:', new Date().toLocaleTimeString())
      console.log('Interval ID:', intervalRef.current)
      // Optimisation RGESN 4.1 : Réduction des appels API pour diminuer les ressources
      // for (let i = 0; i < 2; i++) {
      //   fetch(`http://localhost:5001/api/payload?${Date.now()}_${i}`)
      // }

      try {
        const { memory, load, rps } = await fetch('/api/server', {
          cache: 'no-store'
        }).then(r => r.json())

        console.log('API Response:', { memory, load, rps })

        setStats(s => {
          const newStats = {
            ...s,
            memory: Math.ceil(memory / 1_048_576),
            load,
            rps
          }
          console.log('Previous stats:', s)
          console.log('New stats:', newStats)
          console.log('Memory calculation:', memory, 'bytes =', Math.ceil(memory / 1_048_576), 'MB')
          return newStats
        })
      } catch (err) {
        console.warn('Erreur lors du fetch des stats serveur', err)
      }
    }, 1_000)

    return () => {
      console.log('Cleaning up interval:', intervalRef.current)
      clearInterval(intervalRef.current)
    }
  }, [])

  if (!ready)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="text-center">
          <div className="animate-spin h-24 w-24 rounded-full border-b-2 border-white mx-auto mb-6" />
          <p className="text-white text-xl font-semibold">Chargement…</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <img 
          src="/static/large.webp" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" 
          loading="lazy"
          alt="Background pattern"
        />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 animate-pulse">
            EcoTraining Platform
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">Plateforme d'entraînement avancée pour l'optimisation web et l'éco-conception</p>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          <StatsCard icon={Database} title="Poids HTML" value={`${(stats.bundle / 1_024).toFixed(0)} kB`} tone={color(stats.bundle, limits.weight)} tip="transferSize du document" />
          <StatsCard icon={Globe} title="Poids page" value={`${(stats.weight / 1_024).toFixed(0)} kB`} tone={color(stats.weight, limits.weight)} tip="somme transferSize" />
          <StatsCard icon={Layers} title="DOM" value={stats.dom} tone={color(stats.dom, limits.dom)} tip="nombre de nœuds" />
          <StatsCard icon={Activity} title="Ressources" value={stats.resources} tone={color(stats.resources, limits.resources)} tip="entries PerformanceResourceTiming" />
          <StatsCard icon={FileText} title="JS" value={`${(stats.js / 1_024).toFixed(0)} kB`} tone={color(stats.js, limits.js)} />
          <StatsCard icon={FilePlus} title="CSS" value={`${(stats.css / 1024).toFixed(1)} kB`} tone={color(stats.css, limits.css)} />
          <StatsCard icon={Image} title="Images" value={`${(stats.img / 1_024).toFixed(0)} kB`} tone={color(stats.img, limits.img)} />
          <StatsCard icon={Cloud} title="Cache hit" value={`${Math.round(stats.cache * 100)} %`} tone={color(stats.cache, limits.cache, true)} />
          <StatsCard icon={MemoryStick} title="RAM serveur" value={`${stats.memory} MB`} tone={color(stats.memory, limits.memory)} />
          <StatsCard icon={Cpu} title="CPU" value={stats.load} tone={color(stats.load, limits.load)} />
          <StatsCard icon={Activity} title="RPS" value={stats.rps} tone={color(stats.rps, limits.rps)} />
          <StatsCard icon={Timer} title="Load page" value={`${stats.pl} ms`} tone="bg-white/10 border-white/20" />
        </section>
        <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Zap className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Visualisation 3D</h2>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={
              <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-white" />
              </div>
            }>
              {show3D && <ThreeScene />}
            </Suspense>
          </div>
          <p className="text-slate-300 text-center mt-4">8 cubes optimisés en temps réel (RGESN 2.2)</p>
        </section>
      </div>
    </div>
  )
}

