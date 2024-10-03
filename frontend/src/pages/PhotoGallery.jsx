import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoAlbumsOutline } from "react-icons/io5";
import PhotosSkeletonLoader from "../components/PhotosSkeletonLoader";
import { FaArrowLeft } from "react-icons/fa";

const PhotoGallery = () => {
  const { albumId } = useParams(); // Extract albumId from the route
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
      );

      const result = await response.json();
      setLoading(false);
      setPhotos(result);
    };
    fetchPhotos();
  }, [albumId]);

  if (loading) {
    return <PhotosSkeletonLoader />;
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-center text-xl md:text-3xl lg:text-4xl font-bold mb-6 font-serif underline">
        Photos from Album - {albumId}
      </h1>
      <Link
        to="/albums"
        className="text-center bg-gradient-to-r from-blue-400 to-indigo-600 px-4 py-1.5 rounded-md flex items-center gap-3 w-44 hover:translate-x-2 transition-all shadow-md "
      >
        <FaArrowLeft />
        Go to Albums{" "}
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className=" p-4 rounded-md flex flex-col bg-slate-50 shadow-md hover:translate-y-1 transition-all"
          >
            <img src={photo.thumbnailUrl} alt={photo.title} className="mb-2" />
            <p className="text-lg text-center">{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
