import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="loading">
      <div className="gooey">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
