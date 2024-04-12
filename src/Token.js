export const token = async () => {
  const clientId = "5c09b41300224c0392112b2df26e0e35";
  const clientSecret = "e6ecbab94c6d48389f8a3dcaae020e8d";
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await result.json();
  console.log(data);

  return data;
};
