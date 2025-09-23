import React from "react";

function CategorySelection({ categories, onSelectCategory }) {
  return (
    <div className="container my-4">
      <div className="row g-3">
        {categories.map((cat) => (
          <div key={cat.id} className="col-6 col-sm-4 col-md-3">
            <div
              className="card h-100 text-center py-3 shadow-sm"
              style={{ cursor: "pointer", borderRadius: "12px" }}
              onClick={() => onSelectCategory(cat)}
            >
              <h6 className="mt-2 mb-0">{cat.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelection;
