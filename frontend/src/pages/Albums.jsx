import React, { useEffect, useState } from "react";
import AlbumPagination from "../components/AlbumPagination";
import { Link } from "react-router-dom";
import AlbumSkeletonLoader from "../components/AlbumSkeletonLoader";

const Albums = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(10); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      ); // Example JSON data URL
      const result = await response.json();
      setData(result); // Set the data to state
      setLoading(false);
    };
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, []);

  // Calculate indices for the data subset to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (loading) {
    return <AlbumSkeletonLoader />;
  }

  if (error) {
    return <h2>Error fetching images</h2>;
  }

  return (
    <div className="container p-10 mx-auto">
      <h1 className="text-center text-xl md:text-3xl lg:text-4xl font-bold mb-6 font-serif underline ">
        Albums
      </h1>
      <div className="items-container grid place-content-center gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-10">
        {currentItems.map((item) => (
          <Link
            key={item.id}
            to={`/albums/${item.userId}`}
            className=" bg-gradient-to-r from-gray-600 to-gray-900 relative p-3 hover:scale-[0.98] transition-all  "
          >
            <p className="bg-white/90 h-full p-2 text-center ">{item.title}</p>
          </Link>
        ))}
      </div>
      <AlbumPagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Albums;
