import axios from "axios";

const API_URL = "https://pixabay.com/api/";
const PAGE_SIZE = 20;

export const fetchImages = async ({ queryKey, pageParam = 1 }) => {
  const query = queryKey[1];
  const response = await axios.get(API_URL, {
    params: {
      key: import.meta.env.VITE_PIXABAY_API_KEY,
      q: query,
      image_type: "photo",
      per_page: PAGE_SIZE,
      page: pageParam,
    },
  });

  return {
    images: response.data.hits,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(response.data.totalHits / PAGE_SIZE),
  };
};
