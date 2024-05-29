import "./App.css";
import { useEffect, useState } from "react";
import { UserDataUseEffectFixes } from "./data-fetchers/use-effect-fixes";
import { UserDataBasic } from "./data-fetchers/use-effect-basic";
import { UserDataRace } from "./data-fetchers/use-effect-race";
import { UserDataSolution } from "./data-fetchers/solution";

function App() {
  const [userId, setUserId] = useState(1);

  // uncomment with race condition
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setUserId((prevUserId) => (prevUserId < 5 ? prevUserId + 1 : 1));
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <div className="container">
        <p> UserId: {userId}</p>
        {/* <UserDataBasic userId={1} /> */}
        {/* <UserDataRace userId={userId} /> */}
        {/* <UserDataUseEffectFixes userId={userId} /> */}
        <UserDataSolution userId={userId} />
      </div>
    </>
  );
}

export default App;
