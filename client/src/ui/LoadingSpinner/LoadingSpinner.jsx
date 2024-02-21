import "./LoadingSpinner.css";

function LoadingSpinner({ type }) {
  return (
    <div className={`lds-ring ${type}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingSpinner;
