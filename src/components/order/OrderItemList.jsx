import React from 'react';
import OrderItem from './OrderItem';

function OrderItemList({ 
  items, 
  selectedItems, 
  setSelectedItems, 
  updateQuantity 
}) {
  return (
    <div className="order-items mb-3">
      {items.map((item, index) => (
        <OrderItem 
          key={index}
          item={item}
          index={index}
          isSelected={selectedItems.has(item.title)}
          onSelectionChange={(selected) => {
            const newSelection = new Set(selectedItems);
            if (selected) {
              newSelection.add(item.title);
            } else {
              newSelection.delete(item.title);
            }
            setSelectedItems(newSelection);
          }}
          updateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
}

export default OrderItemList; 