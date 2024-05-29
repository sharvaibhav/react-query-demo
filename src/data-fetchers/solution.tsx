import { useQuery } from "react-query";

type UserData = {
  id: number;
  name: string;
  email: string;
};

const fetchUserData = async (userId: number): Promise<UserData> => {
  // Introduce a random delay to simulate network latency
  const delay = Math.floor(Math.random() * 3000) + 1000; // Delay between 1 and 4 seconds
  await new Promise((resolve) => setTimeout(resolve, delay));

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function UserDataSolution({ userId }: { userId: number }) {
  const { data, error, isLoading } = useQuery<UserData, Error>(
    ["userdata", userId], // Use an array with userId as part of the query key
    () => fetchUserData(userId),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data && (
        <div>
          <h1>{data.name}</h1>
          <p>Email: {data.email}</p>
          <p>Input UserId: {userId}</p>
        </div>
      )}
    </div>
  );
}
