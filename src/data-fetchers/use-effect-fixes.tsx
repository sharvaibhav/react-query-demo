import { useState, useEffect } from "react";

type UserData = {
  name: string;
  email: string;
};

const fetcher = async (url: string) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000)); // Simulate network delay
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function UserDataUseEffectFixes({ userId }: { userId: number }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetcher(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((data) => {
        if (isMounted) {
          setUserData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false; 
    };
  }, [userId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {userData && (
        <div>
          <h1>{userData.name}</h1>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
}
