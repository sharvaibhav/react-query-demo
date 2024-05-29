import { useState, useEffect } from "react";

type UserData = {
  name: string;
  email: string;
};

export function UserDataBasic({ userId }: { userId: number }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, [userId]);

  return (
    <div>
      {userData && (
        <div>
          <h1>{userData.name}</h1>
          <p>Email: {userData.email}</p>
          <p> Input : {userId}</p>
        </div>
      )}
    </div>
  );
}
