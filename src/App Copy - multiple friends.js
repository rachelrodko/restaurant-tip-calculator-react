import "./App.css";
import { useState } from "react";

export default function App() {
  const [price, setPrice] = useState("");
  const [numGuests, setNumGuests] = useState(0);
  const [yourTip, setYourTip] = useState("0");
  const [friendTip, setFriendTip] = useState([]);
  const bill = price;
  const tip = ((+yourTip + +friendTip) / 2 / 100) * +price;
  const total = +bill + +tip;

  function handleSubmit(e) {
    e.preventDefault();
    if (!price) return;
    if (numGuests === 0) return;
    console.log("hi");
  }

  function handleReset(e) {
    e.preventDefault();
    setPrice("");
    setYourTip(0);
    setFriendTip(0);
    setNumGuests(0);
  }

  // function handleAddFriendTip(newTip) {
  //   setFriendTip((tips) => [...tips, newTip]);
  //   console.log(friendTip);
  // }

  return (
    <div style={{ marginLeft: "15px" }}>
      <h2>Restaurant Tip Calculator 🍴</h2>

      <Price price={price} onSubmit={handleSubmit} setPrice={setPrice} />
      <NumFriends
        numGuests={numGuests}
        setNumGuests={setNumGuests}
        onSubmit={handleSubmit}
      />
      {Array.from({ length: numGuests }, (x, i) => (
        <SelectPercentage
          question={
            i === 0
              ? `How did you like the service?`
              : `How did guest #${i} like the service?`
          }
          friendTip={i === 0 ? yourTip : friendTip}
          setFriendTip={i === 0 ? setYourTip : setFriendTip}
          value={i === 0 ? yourTip : friendTip}
          numGuests={numGuests}
          key={i}
        ></SelectPercentage>
      ))}
      {/* <SelectPercentage
        question={"How did you like the service?"}
        yourTip={yourTip}
        setYourTip={setYourTip}
        value={yourTip}
        numGuests={numGuests}
      ></SelectPercentage>

      <SelectPercentage
        question={"How did your friend like the service?"}
        yourTip={friendTip}
        setYourTip={setFriendTip}
        value={friendTip}
        numGuests={numGuests}
      ></SelectPercentage> */}

      <Output price={price} tip={tip} total={total} numGuests={numGuests} />

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
          placeholder="Price"
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
function NumFriends({ numGuests, setNumGuests, onSubmit }) {
  return (
    <div style={{ marginBottom: "5px", display: "flex" }}>
      <label style={{ marginRight: "12px" }}>How big was your party?</label>
      <form onSubmit={onSubmit}>
        <select
          value={numGuests}
          onChange={(e) => setNumGuests(+e.target.value)}
        >
          {Array.from({ length: 7 }, (x, i) => i).map((x, i) => (
            <option value={x} key={x}>
              {x} guest{x !== 1 ? "s" : null}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
function SelectPercentage({
  question,
  yourTip,
  setYourTip,
  friendTip,
  setFriendTip,
  numGuests,
}) {
  return (
    <div>
      {numGuests ? (
        <div style={{ marginBottom: "5px", display: "flex" }}>
          <label
            htmlFor="servicePc"
            className="question"
            style={{ marginRight: "12px" }}
          >
            {question}
          </label>
          <form name="servicePc" value={friendTip}>
            <select onChange={(e) => setFriendTip(e.target.value)}>
              <option value="0">Dissatisfied (0%)</option>
              <option value="5">It was okay (5%)</option>
              <option value="10">It was good (10%)</option>
              <option value="20">Absolutely amazing! (20%)</option>
            </select>
          </form>
        </div>
      ) : null}
    </div>
  );
}

function Output({ price, tip, total, numGuests }) {
  return (
    <div>
      {numGuests ? (
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
      ) : null}
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
