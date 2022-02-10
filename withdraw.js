function Withdraw() {
  const ctx = React.useContext(UserContext);
  const len = ctx.users.length;

  const [withdrawAmount, setWithdrawAmount] = React.useState("");
  // const [balance, setBalance] = React.useState("100");
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [disable, setDisable] = React.useState(true);

  const validate = (amount) => {
    if (isNaN(amount)) {
      setStatus(`Input must be a number`);
      setTimeout(() => setStatus(""), 3000);
      return false;
    } else {
      if (amount < 0) {
        setStatus(`Withdraw amount must be greater than 0`);
        setTimeout(() => setStatus(""), 3000);
        return false;
      } else if (parseFloat(amount) > ctx.users[len - 1].balance) {
        setStatus(`Not enough balance to withdraw`);
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      return true;
    }
  };

  React.useEffect(() => {
    if (withdrawAmount !== "" && disable == true) setDisable(false);
    if (withdrawAmount === "" && disable == false) setDisable(true);
  }, [withdrawAmount]);

  const handleWithdraw = () => {
    if (!validate(withdrawAmount)) return;
    ctx.users[len - 1].balance =
      ctx.users[len - 1].balance - parseFloat(withdrawAmount);
    setShow(false);
  };

  const clearForm = () => {
    setWithdrawAmount("");
    setShow(true);
  };

  return (
    <>
      <Card
        bgcolor="secondary"
        header="Withdraw"
        status={status}
        body={
          show ? (
            <>
              <h5>{`Current Balance: $${ctx.users[len - 1].balance}`}</h5>
              Withdraw Amount
              <br />
              <input
                type="input"
                className="form-control"
                id="withdraw"
                placeholder="Enter an amount"
                step={0.1}
                min={0}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                disabled={disable}
                className="btn btn-light"
                onClick={handleWithdraw}
              >
                Make a Withdraw
              </button>
            </>
          ) : (
            <>
              <h5>Withdraw Success</h5>
              <h6>{`Current Balance: $${ctx.users[len - 1].balance}`}</h6>
              <button
                type="submit"
                className="btn btn-light"
                onClick={clearForm}
              >
                Make another withdraw
              </button>
            </>
          )
        }
      />
    </>
  );
}
