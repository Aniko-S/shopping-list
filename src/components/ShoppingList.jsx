function ShoppingList() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h1>Termék</h1>
          </div>
          <div className="col-4">
            <h1>Lelőhely</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8">alma</div>
          <div className="col-4">élelmiszerbolt</div>
        </div>
        <div className="row">
          <div className="col-8">pelenka</div>
          <div className="col-4">drogéria</div>
        </div>
      </div>
    </>
  );
}

export default ShoppingList;
