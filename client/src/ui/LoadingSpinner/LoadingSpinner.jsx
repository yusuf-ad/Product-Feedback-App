import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <main className="page-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
}

export default LoadingSpinner;
