import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [refreshTransactions, setRefreshTransactions] = useState(false); // State to trigger useEffect

  useEffect(() => {
    getTransactions().then(data => {
      setTransactions(data);
      console.log(data.length);
    });
  }, [refreshTransactions]); // useEffect now depends on refreshTransactions

  async function getTransactions() {
    const response = await fetch("http://localhost:4030/api/transactions");
    return await response.json();
  }

  const addNewTransaction = (ev) => {
    ev.preventDefault();

    const price = name.split(' ')[0];

    fetch("http://localhost:4030/api/transaction", {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        datetime,
        description
      })
    }).then(res => {
      res.json().then(json => {
        setName('');
        setDescription('');
        setDatetime('');
        console.log("result", json);
        setRefreshTransactions(prev => !prev); // Toggle refreshTransactions state
      });
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  return (
    <main>
      <h1 className='Head'>Money Tracker App</h1>
      <h2 className='start'>${balance}</h2>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(ev) => { setName(ev.target.value) }}
            placeholder="+200 new Bike"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(ev) => { setDatetime(ev.target.value) }}
          />
        </div>
        <div>
          <div className="description">
            <input
              type="text"
              value={description}
              onChange={(ev) => { setDescription(ev.target.value) }}
              placeholder="Description"
            />
          </div>
          <button type="submit">Add new Transaction</button>
        </div>
      </form>

      <div className="transactions">
        {Array.isArray(transactions) && transactions.length > 0 && transactions.map((trans) => (
          <div className="transaction" key={trans._id}>
            <div className="left">
              <div className="name">{trans.name}</div>
              <div className="description">{trans.description}</div>
            </div>
            <div className="right">
              <div className={"price " + (trans.price < 0 ? 'red' : 'green')}>{trans.price}</div>
              <div className="datetime">{trans.datetime}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
