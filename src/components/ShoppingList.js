// ShoppingList.js
import React, { useState } from "react";
import Item from "./Item";
import Filter from "./Filter";
import ItemForm from "./ItemForm";
import initialItems from "../data/items";
import { v4 as uuid } from "uuid";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(initialItems);

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  function handleSearchChange(text) {
    setSearch(text);
  }

  function handleItemFormSubmit(newItem) {
    setItems([...items, newItem]);
  }

  const itemsToDisplay = items.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const nameMatch = item.name.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && nameMatch;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        search={search}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
