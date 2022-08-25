// resolve not found error in typescript
// https://frontend-digest.com/how-to-import-svgs-into-nextjs-8ec6100e613f
declare module '*.svg' {
  const content: any
  export default content
}
