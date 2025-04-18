import React from "react";

function Filter(props) {
  return (
    <div className="filter">
      <div className="result">تعداد محصولات : {props.count} محصول</div>
      <div className="sort">
        <div className="sort-title">مرتب سازی بر اساس</div>
        <div className="form-checkbox">
          <div className="form-group">
            <input
              id="x"
              type="radio"
              value="asc"
              name="radiovalues"
              onChange={props.sortProducts}
            />
            <label htmlFor="x">جدید ترین محصولات</label>
          </div>

          <div className="form-group">
            <input
              id="y"
              type="radio"
              value="desc"
              name="radiovalues"
              onChange={props.sortProducts}
            />
            <label htmlFor="y">قدیمی ترین محصولات</label>
          </div>
        </div>
      </div>
      <label htmlFor="w" className="brand">
        برندها
        <select id="w" onChange={props.filterProducts} value={props.brand}>
          <option value="">همه</option>
          <option value="mac">مک بوک ایر</option>
          <option value="asus1">ایسوس</option>
          <option value="hp">اچ پی</option>
          <option value="msi"> ام اس آی</option>
          <option value="apple">اپل</option>
        </select>
      </label>
    </div>
  );
}

export default Filter;
