import React from "react";
import { Link } from "react-router-dom";
import "../styles/collectionslist.css";

const CollectionList = ({ collections }) => {
  return (
    <div className="banner-collections-container">
      {collections.map((collection) => (
        <div key={collection.id} className="banner-collection-item">
          <div className="banner-collection-card">
            <img
              src={collection.imageUrl}
              alt={collection.name}
              className="banner-collection-image"
            />
            <div className="collection-overlay">
              <h3 className="banner-collection-name">{collection.name}</h3>
              <Link
                to={`/collection/${collection.name}`}
                className="shop-button"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
