export function combineClass(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
