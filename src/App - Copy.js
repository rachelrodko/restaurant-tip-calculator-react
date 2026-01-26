import "./App.css";
import { useState } from "react";

export default function App() {
  const [price, setPrice] = useState("");
  const [yourTip, setYourTip] = useState("0");
  const [friendTip, setFriendTip] = useState("0");
  const bill = price;
  const tip = ((+yourTip + +friendTip) / 2 / 100) * +price;
  const total = +bill + +tip;

  function handleSubmit(e) {
    e.preventDefault();
    if (!price) return;
  }

  function handleReset(e) {
    e.preventDefault();
    setPrice("");
    setYourTip(0);
    setFriendTip(0);
  }
  return (
    <div style={{ marginLeft: "15px" }}>
      <h2>Restaurant Tip Calculator 🍴</h2>
      <Price price={price} onSubmit={handleSubmit} setPrice={setPrice} />
      <ServicePc
        yourTip={yourTip}
        setYourTip={setYourTip}
        friendTip={friendTip}
        setFriendTip={setFriendTip}
      />
      <Output price={price} tip={tip} total={total} />
      <Reset onReset={handleReset} />
    </div>
  );
}
function Price({ price, onSubmit, setPrice }) {
  function handleChange(e) {
    if (!isFinite(e.target.value)) return;
    return setPrice(e.target.value);
  }
  return (
    <div style={{ marginBottom: "5px", display: "flex" }}>
      <label htmlFor="price" style={{ marginRight: "12px" }}>
        How much was the bill?
      </label>
      <form onSubmit={onSubmit}>
        <input
          placeholder="price"
          type="text"
          name="price"
          id="price"
          onChange={handleChange}
          value={price}
        />
      </form>
    </div>
  );
}

function ServicePc({ yourTip, setYourTip, friendTip, setFriendTip }) {
  return (
    <div>
      <ServicePcItem
        question={"How did you like the service?"}
        yourTip={yourTip}
        setYourTip={setYourTip}
        value={yourTip}
      ></ServicePcItem>
      <ServicePcItem
        question={"How did your friend like the service?"}
        yourTip={friendTip}
        setYourTip={setFriendTip}
        value={friendTip}
      ></ServicePcItem>
    </div>
  );
}

function ServicePcItem({ question, yourTip, setYourTip }) {
  return (
    <div style={{ marginBottom: "5px", display: "flex" }}>
      <label
        htmlFor="servicePc"
        className="question"
        style={{ marginRight: "12px" }}
      >
        {question}
      </label>
      <form name="servicePc" value={yourTip}>
        <select onChange={(e) => setYourTip(e.target.value)}>
          <option value="0">Dissatisfied (0%)</option>
          <option value="5">It was okay (5%)</option>
          <option value="10">It was good (10%)</option>
          <option value="20">Absolutely amazing! (20%)</option>
        </select>
      </form>
    </div>
  );
}

function Output({ price, tip, total }) {
  return (
    <div>
      <h4>
        You pay £
        {(Math.round(+total * 100) / 100)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        (£
        {(Math.round(+price * 100) / 100)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        + £
        {(Math.round(+tip * 100) / 100)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        tip)
      </h4>
    </div>
  );
}

function Reset({ onReset }) {
  return (
    <div>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
