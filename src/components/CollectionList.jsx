import React from "react";
import { Link } from "react-router-dom";

const CollectionList = ({ collections }) => {
  return (
    <div className="collections-grid">
      {collections.map((collection) => (
        <div key={collection.id} className="collection-item">
          <Link to={`/collection/${collection.name}`}>
            <div className="collection-card">
              <img
                src={collection.imageUrl}
                alt={collection.name}
                className="collection-image"
              />
              <h3 className="collection-name">{collection.name}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
