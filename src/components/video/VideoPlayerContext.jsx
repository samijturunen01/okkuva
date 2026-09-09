import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const VideoPlayerContext = createContext({ current: null, open: () => {}, close: () => {} })

/**
 * Holds the video currently open in the modal player (one player for the
 * whole app so only one video ever plays with sound).
 */
export function VideoPlayerProvider({ children }) {
  const [current, setCurrent] = useState(null)
  const open = useCallback((video) => setCurrent(video), [])
  const close = useCallback(() => setCurrent(null), [])
  const value = useMemo(() => ({ current, open, close }), [current, open, close])
  return <VideoPlayerContext.Provider value={value}>{children}</VideoPlayerContext.Provider>
}

export function useVideoPlayer() {
  return useContext(VideoPlayerContext)
}
