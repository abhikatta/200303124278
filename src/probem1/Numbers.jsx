import React, { useState } from "react";
import axios from "axios";

const Numbers = () => {
  // output that holds numbers
  const [numbers, setNumbers] = useState([]);
  const handleNumbers = async () => {
    const urls = [
      "http://20.244.56.144/numbers/primes",
      "http://20.244.56.144/numbers/fibo",
      "http://20.244.56.144/numbers/odd",
      "http://20.244.56.144/numbers/rand",
    ];
    // store responses from the urls
    try {
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      console.log(responses);
      //  pick out only successfully fetched urlss
      const numbersData = responses
        .filter((response) => response.status === 200)
        .map((response) => response.data);
      console.log(numbersData);
      setNumbers(numbersData);
    } catch (error) {
      console.error("Error retrieving numbers:", error);
    }
  };
  return (
    <div className="App">
      <button onClick={handleNumbers}>Get Numbers</button>
      <ul>
        {numbers.map((numbersData, index) => (
          <li key={index}>{JSON.stringify(numbersData)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Numbers;
