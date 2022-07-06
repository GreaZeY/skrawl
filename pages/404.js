import CreateSquares from "../Components/CreateSquares"


const NotFound = () => {
  return (
    <>
    <CreateSquares />
    <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',zIndex:"100" }} >
      <h1 className="next-error-h1" >404</h1>
      <div style={{ display: "inline-block", width: '20.5rem', textAlign: "right", borderLeft: '1px solid White', marginLeft: '.7rem' }} >
        <p style={{ fontSize: '1.5rem', margin: '1rem auto' }} >This page could not be found</p>
      </div>
    </div>
    </>
    )
}

export default NotFound