function AllData() {
  const ctx = React.useContext(UserContext);
  return (
    <>
      <h5>All Data in Store</h5>
      {ctx.users.map((d, i) => {
        return (
          <Card
            key={d.name + i}
            bgcolor="primary"
            header={`User${i + 1}`}
            body={
              <>
                {`name: ${d.name}`}
                <br />
                {`email: ${d.email}`}
                <br />
                {`password: ${d.password}`}
                <br />
                {`balance: ${d.balance}`}
              </>
            }
          />
        );
      })}
    </>
  );
}
