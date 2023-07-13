import React, { useState } from "react";
import axios from "axios";

const Numbers = () => {
  const [numbers, setNumbers] = useState([]);

  const handleNumbers = async () => {
    const urls = [
      "http://20.244.56.144/numbers/primes",
      "http://20.244.56.144/numbers/fibo",
      "http://20.244.56.144/numbers/odd",
      "http://20.244.56.144/numbers/rand",
    ];

    try {
      const responses = await Promise.all(urls.map((url) => axios.get(url)));

      const numbersData = responses
        .filter((response) => response.status === 200)
        .map((response) => response.data);

      const sorted = extractNumbers(numbersData);
      setNumbers(sorted);
    } catch (error) {
      console.error("Error retrieving numbers:", error);
    }
  };

  const extractNumbers = (jsonData) => {
    const numbers = jsonData.reduce(
      (acc, curr) => [...acc, ...curr.numbers],
      []
    );

    const uniqueNumbers = [...new Set(numbers)];
    const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);
    // Return numbers as a JSON object
    return { numbers: sortedNumbers };
  };

  return (
    <div className="App">
      <button onClick={handleNumbers}>Get Numbers</button>
      <pre>{JSON.stringify(numbers, null, 2)}</pre>
    </div>
  );
};

export default Numbers;
