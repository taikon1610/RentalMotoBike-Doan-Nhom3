import React, { useState } from 'react';
import './BookingForm.css';

export default function BookingForm() {
  const [form, setForm] = useState({
    bikeId: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    pickupBranch: '',
    returnBranch: '',
    paymentMethod: 'cod'
  });

  const [isAvailable, setIsAvailable] = useState(null);
  const [price, setPrice] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkAvailability = () => {
    if (form.bikeId && form.startDate && form.endDate) {
      setIsAvailable(true);
      setPrice(300000);
      setMessage('✔ Xe khả dụng!');
    } else {
      setIsAvailable(false);
      setMessage('❌ Vui lòng nhập đầy đủ thông tin để kiểm tra.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAvailable) {
      setMessage('⚠ Hãy kiểm tra xe khả dụng trước khi đặt!');
      return;
    }
    setMessage('✅ Đặt thuê xe thành công!');
  };

  return (
    <div className="booking-container">
      <h2>🛵 Đặt thuê xe máy</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Mã xe cần thuê:</label>
            <input type="text" name="bikeId" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phương thức thanh toán:</label>
            <select name="paymentMethod" onChange={handleChange}>
              <option value="cod">Thanh toán tại chi nhánh</option>
              <option value="online">Thanh toán trực tuyến</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ngày nhận:</label>
            <input type="date" name="startDate" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Giờ nhận:</label>
            <input type="time" name="startTime" onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ngày trả:</label>
            <input type="date" name="endDate" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Giờ trả:</label>
            <input type="time" name="endTime" onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Chi nhánh nhận xe:</label>
            <select name="pickupBranch" onChange={handleChange} required>
              <option value="">-- Chọn --</option>
              <option value="Q1">Quận 1</option>
              <option value="Q3">Quận 3</option>
              <option value="Q5">Quận 5</option>
            </select>
          </div>
          <div className="form-group">
            <label>Chi nhánh trả xe:</label>
            <select name="returnBranch" onChange={handleChange} required>
              <option value="">-- Chọn --</option>
              <option value="Q1">Quận 1</option>
              <option value="Q3">Quận 3</option>
              <option value="Q5">Quận 5</option>
            </select>
          </div>
        </div>

        <button type="button" className="check-btn" onClick={checkAvailability}>Kiểm tra xe</button>

        {isAvailable && (
          <p className="success">✔ Xe có sẵn. Tổng chi phí: <strong>{price.toLocaleString()} VND</strong></p>
        )}

        <button type="submit" className="submit-btn">Xác nhận thuê</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
