export function getFirstFormError(errors) {
  return Object.values(errors)[0]?.message ?? null
}
