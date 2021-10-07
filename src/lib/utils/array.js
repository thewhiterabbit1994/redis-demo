

export const isArrayEmpty = arr => {
  if (arr && Array.isArray(arr) && arr[0]) return false

  return true
}