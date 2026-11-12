export function Background() {
  return (
    <>
      <div className="aurora" aria-hidden="true">
        <div className="aurora__blob aurora__blob--a" />
        <div className="aurora__blob aurora__blob--b" />
        <div className="aurora__blob aurora__blob--c" />
      </div>
      <div className="gridlines hidden md:block" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
