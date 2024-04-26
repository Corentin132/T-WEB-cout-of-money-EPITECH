export function getUser(jwt: string): Promise<User | null> {
  return fetch("http://localhost:4000/user/info", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("error Can't get User boring");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      return null;
    });
}
export interface User {
  email: string;
  username: string;
  role: "user" | "admin" | "superadmin" | "";
  createdAt: string;
  updatedAt: string;
}
