const NotFound = () => {
  return (
    <>
      <div style={{ background: 'rgb(0 0 0 / 87%)', color: 'white', fontSize: '5vmax', height: '100vh', width: '100vw', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: "100" }} >
        <h1 className="next-error-h1" >404</h1>
        <div style={{ display: "inline-block", width: '20vmax', textAlign: "right", borderLeft: '1px solid White', marginLeft: '.7rem' }} >
          <p style={{ fontSize: '2vmax', margin: '1rem auto' }} >This page could not be found!</p>
        </div>
      </div>
    </>
  )
}

export default NotFound