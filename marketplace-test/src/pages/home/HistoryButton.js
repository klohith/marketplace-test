import { useHistory } from "react-router-dom";

function HistoryButton() {
  let history = useHistory();

  function handleClick() {
    history.push("history");
  }

  return (
    <button type="button" onClick={handleClick}>
      History
    </button>
  );
}

export default HistoryButton;
