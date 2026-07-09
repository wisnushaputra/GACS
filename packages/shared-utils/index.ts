export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const isArray = <T>(item: T|unknown): item is T[] => Array.isArray(item)