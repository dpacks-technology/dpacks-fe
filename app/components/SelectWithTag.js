import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const MultiSelect = ({ items, selectedItems, onChange, placeholder, size="middle", labelOutside }) => {
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      {labelOutside && <label >{placeholder}</label>}
      <Select
      className='mt-2'
        mode="multiple"
        size={size}
        placeholder={placeholder}
        defaultValue={selectedItems}
        onChange={onChange}
        style={{ width: '100%' }}
      >
        {items.map(item => (
          <Option key={item.id} value={item.name}>{item.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export default MultiSelect;
