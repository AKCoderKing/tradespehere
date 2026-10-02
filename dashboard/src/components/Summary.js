import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      setAllHoldings(res.data);
    });
  }, []);

  let totalInvestment = 0;
  let totalCurrentValue = 0;

  allHoldings.forEach((stock) => {
    totalInvestment += stock.avg * stock.qty;
    totalCurrentValue += stock.price * stock.qty;
  });

  const totalPL = totalCurrentValue - totalInvestment;
  const plPercentage = totalInvestment ? (totalPL / totalInvestment) * 100 : 0;
  const isProfit = totalPL >= 0;

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {(totalPL / 1000).toFixed(2)}k <small>{plPercentage > 0 ? "+" : ""}{plPercentage.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{(totalCurrentValue / 1000).toFixed(2)}k</span>{" "}
            </p>
            <p>
              Investment <span>{(totalInvestment / 1000).toFixed(2)}k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
