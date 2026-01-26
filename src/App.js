import "./App.css";
import { useState } from "react";

export default function App() {
  const [price, setPrice] = useState("");
  const [numGuests, setNumGuests] = useState(0);
  const [tips, setTips] = useState([]);
  const bill = price;

  const tipsTotal = tips.reduce(
    (acc, x) => acc + (x / numGuests / 100) * +price,
    0,
  );
  const total = +bill + tipsTotal;

  function handleSubmit(e) {
    e.preventDefault();
    if (!price) return;
    if (numGuests === 0) return;
  }

  function handleReset(e) {
    e.preventDefault();
    setTips([]);
    setPrice("");
    setNumGuests(0);
  }

  function handleAddTip(newTip) {
    setTips((tips) => [...tips, newTip]);
  }
  console.log(tips);
  function handleChange(e) {
    e.preventDefault();
    const newTip = +e.target.value;
    handleAddTip(newTip);
  }

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
          tips={tips}
          setTips={setTips}
          value={tips}
          numGuests={numGuests}
          key={i}
          onChange={handleChange}
        ></SelectPercentage>
      ))}

      <Output
        price={price}
        tips={tips}
        total={total}
        numGuests={numGuests}
        tipsTotal={tipsTotal}
      />

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
function SelectPercentage({ question, tips, numGuests, onChange }) {
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
          <form name="servicePc" value={tips}>
            <select onChange={onChange}>
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

function Output({ price, total, numGuests, tipsTotal }) {
  const splitPrice = +price / numGuests;
  const splitTips = tipsTotal / numGuests;
  return (
    <div>
      {numGuests ? (
        <div>
          <h4>
            Total bill = £
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
            {(Math.round(+tipsTotal * 100) / 100)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            tips)
          </h4>
          <h4>
            Each guest pays £
            {(Math.round(+splitPrice * 100) / 100)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            + £
            {(Math.round(+splitTips * 100) / 100)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            tip
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
