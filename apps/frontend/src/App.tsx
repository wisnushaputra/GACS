import { useThemeStore } from './themeStore'

function App() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <button onClick={toggleTheme}>Toggle Theme ({theme})</button>
    </h1>
  )
}

export default App
