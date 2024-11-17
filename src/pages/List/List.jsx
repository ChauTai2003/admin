import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => { // Sử dụng url từ props, không định nghĩa lại
  const [list, setlist] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`); // Sửa cú pháp interpolation
      if (response.data.success) {
        setlist(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Fetch list error:", error); // Thêm xử lý lỗi
      toast.error("An error occurred while fetching the list.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId }); // Sửa interpolation
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchlist(); // Gọi lại fetchlist sau khi xóa thành công
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Remove food error:", error);
      toast.error("An error occurred while removing the food.");
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={item._id} className="list-table-format"> {/* Thay index bằng item._id */}
              <img src={`${url}/images/${item.image}`} alt="" /> {/* Không thay đổi logic kiểm tra item.image */}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
