import React from "react";

function ItemList({ items, onSelectItem }) {
  return (
    <div className="container my-4">
      <div className="row g-3">
        {items.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4">
            <div
              className="card h-100 text-center py-3 shadow-sm"
              style={{ cursor: "pointer", borderRadius: "12px" }}
              onClick={() => onSelectItem(item)}
            >
              <h6 className="mb-0">{item.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
