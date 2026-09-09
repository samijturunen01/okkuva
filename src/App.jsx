import { Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { Navbar } from './components/Navbar.jsx'
import { Footer } from './components/Footer.jsx'
import { SkipLink } from './components/SkipLink.jsx'
import { ScrollManager } from './components/ScrollManager.jsx'
import { VideoPlayerProvider } from './components/video/VideoPlayerContext.jsx'
import { VideoModal } from './components/video/VideoModal.jsx'
import { pages, preloadAllRoutes } from './routes.jsx'

function PageFallback() {
  return <div className="page-fallback" aria-hidden="true" />
}

export default function App() {
  // Warm up the other page chunks once the browser is idle.
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200))
    const handle = idle(() => preloadAllRoutes())
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(handle)
      else clearTimeout(handle)
    }
  }, [])

  return (
    <VideoPlayerProvider>
      <SkipLink />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <ScrollManager />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<pages.Home />} />
            <Route path="/hinnasto" element={<pages.Pricing />} />
            <Route path="/tulokset" element={<pages.Results />} />
            <Route path="/ota-yhteytta" element={<pages.Contact />} />
            <Route path="*" element={<pages.NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <VideoModal />
    </VideoPlayerProvider>
  )
}
