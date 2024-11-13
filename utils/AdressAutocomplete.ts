const API_BASE_URL = 'https://api.mapbox.com/search/searchbox/v1';
const access_token = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

export const getSuggestions = async (input: string, session_token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/suggest?q=${input}&language=en&session_token=${session_token}&access_token=${access_token}`
  );
  const json = await response.json();
  console.log('get suggestions');

  return json;
};

export const retrieveDetails = async (id: string, session_token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/retrieve/${id}?session_token=${session_token}&access_token=${access_token}`
  );
  const json = await response.json();
  console.log('retrieve details');

  return json;
};
