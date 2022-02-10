function Deposit() {
  const ctx = React.useContext(UserContext);
  const len = ctx.users.length;

  const [depositAmount, setDepositAmount] = React.useState("");
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
        setStatus(`Deposit amount must be greater than 0`);
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      return true;
    }
  };

  React.useEffect(() => {
    if (depositAmount !== "" && disable == true) setDisable(false);
    if (depositAmount === "" && disable == false) setDisable(true);
  }, [depositAmount]);

  const handleDeposit = () => {
    if (!validate(depositAmount)) return;
    // setBalance(parseFloat(balance) + parseFloat(depositAmount));
    ctx.users[len - 1].balance =
      ctx.users[len - 1].balance + parseFloat(depositAmount);
    setShow(false);
  };

  const clearForm = () => {
    setDepositAmount("");
    setShow(true);
  };

  return (
    <>
      <Card
        bgcolor="success"
        header="Deposit"
        status={status}
        body={
          show ? (
            <>
              <h5>{`Current Balance: $${ctx.users[len - 1].balance}`}</h5>
              Deposit Amount
              <br />
              <input
                type="input"
                className="form-control"
                id="deposit"
                placeholder="Enter an amount"
                step={0.1}
                min={0}
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                disabled={disable}
                className="btn btn-light"
                onClick={handleDeposit}
              >
                Make a Deposit
              </button>
            </>
          ) : (
            <>
              <h5>Deposit Success</h5>
              <h6>{`Current Balance: $${ctx.users[len - 1].balance}`}</h6>
              <button
                type="submit"
                className="btn btn-light"
                onClick={clearForm}
              >
                Make another deposit
              </button>
            </>
          )
        }
      />
    </>
  );
}
