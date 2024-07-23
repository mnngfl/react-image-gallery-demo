import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { fetchImages } from "./services/api";
import { useThrottle, useDebounce } from "./hooks";
import Gallery from "./components/Gallery/Gallery";

function App() {
  const [searchVal, setSearchVal] = useState("");
  const [query, setQuery] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ["images", query],
      queryFn: fetchImages,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage <= lastPage.totalPages) {
          return lastPage.nextPage;
        } else {
          return undefined;
        }
      },
      enabled: !!query,
    });
  const images = useMemo(() => {
    return data?.pages.flatMap((page) => page.images);
  }, [data?.pages]);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
    handleDebounced();
  };

  const handleDebounced = useDebounce(() => {
    let newQuery = searchVal.trim();

    if (searchVal.length > 100) {
      newQuery = newQuery.slice(0, 100);
      setSearchVal(newQuery);
    }
    setQuery(newQuery);
  });

  const handleScroll = useThrottle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="container">
      <h1 className="title">Image Gallery</h1>
      <input
        type="text"
        value={searchVal}
        maxLength={100}
        onChange={handleChange}
        placeholder="Search for images"
        className="input"
      />
      {error && <p>Error: {error.message}</p>}
      <Gallery images={images} />
      {isFetching && !isFetchingNextPage && <div>Loading...</div>}
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
}

export default App;
