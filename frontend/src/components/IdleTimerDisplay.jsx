export default function IdleTimerDisplay({ remainingTime }) {
  return (
    <div style={{ padding: "10px", background: "#eee" }}>
      <p>Auto logout in: {Math.ceil(remainingTime / 1000)} seconds</p>
    </div>
  );
}
