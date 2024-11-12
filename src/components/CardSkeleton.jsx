import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="card-skeleton-container">
      <div className="book-card-skeleton">
        <Skeleton height={200} width="100%" />

        <div className="skeleton-text">
          <Skeleton width="80%" height={20} />
          <Skeleton width="60%" height={15} />
        </div>
      </div>

      <div className="book-card-skeleton">
        <Skeleton height={200} width="100%" />

        <div className="skeleton-text">
          <Skeleton width="80%" height={20} />
          <Skeleton width="60%" height={15} />
        </div>
      </div>

      <div className="book-card-skeleton">
        <Skeleton height={200} width="100%" />

        <div className="skeleton-text">
          <Skeleton width="80%" height={20} />
          <Skeleton width="60%" height={15} />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
