import { useState, useEffect } from "react";

type UserData = {
  name: string;
  email: string;
  userId: number;
};

export function UserDataRace({ userId }: { userId: number }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Introduce a delay to simulate a long network request
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000));

      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserData({ ...data, userId: userId }); // This might set data from an old request
        })
        .catch((error) => {
          console.error("Fetch error: ", error);
        });
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {userData ? (
        <div>
          <h1>{userData.name}</h1>
          <p>Email: {userData.email}</p>
          <p>userId: {userData.userId}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
