import React from "react";

type Props = {};

const AdminManagerPage = (props: Props) => {
  return <div className="adminPageManager">
      <div className="content">
        <h3>Thêm quản trị viên</h3>
        <div className="searchBar">
          <input type="text" />
          <button>Tìm</button>
        </div>
        <table className="table">
          <thead>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Avatar</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Option</th>
          </thead>
          <tbody className="tbody">
            <tr>
              <td>1</td>
              <td>Hoàng</td>
              <td>hoang@gamil.com</td>
              <td>14/09/2020</td>
              <td></td>
              <td>nam</td>
              <td>USER</td>
              <td>
                  <button>Xem thông tin chi tiết</button>
                  <button>Chỉnh sửa</button>
                  <button>Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>;
};

export default AdminManagerPage;
