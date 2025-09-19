# 🎓 Schedule Image Generator

> **Tạo ảnh thời khóa biểu đẹp mắt từ HTML table chỉ với một đoạn code JavaScript!**

## 🚀 Cách sử dụng

### **Bước 1: Mở trang thời khóa biểu**
```
Truy cập vào trang web có thời khóa biểu HTML table
(VD: Portal sinh viên, hệ thống quản lý học tập)
```

### **Bước 2: Mở Developer Tools**
```
Windows/Linux: F12 hoặc Ctrl + Shift + I
Mac: Cmd + Option + I
```

### **Bước 3: Vào tab Console**
```
Click vào tab "Console" trong Developer Tools
```

### **Bước 4: Paste và chạy code**
```javascript
// Copy toàn bộ code từ file schedule-generator.js
// Paste vào Console và nhấn Enter
```

### **Bước 5: Tải ảnh về**
```
✅ Code sẽ tự động:
   - Parse dữ liệu từ HTML table
   - Tạo thời khóa biểu đẹp mắt  
   - Download file PNG về máy
```

## 🔧 Cấu trúc code

### **Main Functions**
```javascript
parseScheduleData()      // Parse HTML table → JSON data
createScheduleHTML()     // JSON data → Styled HTML  
downloadScheduleImage()  // HTML → PNG file
loadHtml2Canvas()        // Load external library
```

### **Data Structure**
```javascript
const subject = {
    code: "17302",                    // Mã môn học
    name: "Kiến trúc máy tính",      // Tên môn học  
    day: 3,                          // Thứ trong tuần (2-7)
    periods: [3, 4, 5],              // Các tiết học
    room: "Phòng 703-C1",            // Phòng học
    teacher: "Nguyễn Trọng Đức",     // Giảng viên
    credits: 3                       // Số tín chỉ
};
```

### **Color Palette**
```javascript
const colors = [
    '#FF6B9D',  // Pink      '#4ECDC4',  // Teal
    '#45B7D1',  // Blue      '#96CEB4',  // Green  
    '#FECA57',  // Yellow    '#FF9FF3',  // Purple
    '#54A0FF',  // Sky       '#5F27CD',  // Violet
    '#00D2D3',  // Cyan      '#FF9F43',  // Orange
    '#10AC84',  // Emerald   '#EE5A24'   // Red
];
```

## 🎨 Tùy chỉnh

### **Thay đổi màu sắc**
```javascript
// Sửa mảng colors trong code
const colors = [
    '#YOUR_COLOR_1',
    '#YOUR_COLOR_2', 
    // ... more colors
];
```

### **Điều chỉnh khung giờ**
```javascript
// Sửa timeSlots array
const timeSlots = [
    "6:00-6:50",   // Thay đổi giờ bắt đầu
    "7:00-7:50", 
    // ... more time slots
    "18:00-18:50"  // Thêm tiết muộn hơn
];
```

### **Thay đổi kích thước ảnh**
```javascript
// Trong hàm downloadScheduleImage()
width: 1200,    // Tăng width
height: 800,    // Tăng height
scale: 3,       // Tăng resolution
```

### **Tùy chỉnh styling**
```javascript
// Sửa CSS trong createScheduleHTML()
background: 'linear-gradient(135deg, #yourcolor1, #yourcolor2)',
border-radius: '25px',  // Tăng độ bo góc
font-size: '16px',      // Tăng font size
```

## 📄 License

Dự án này được phân phối dưới **MIT License**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

```
MIT License

Copyright (c) 2025 Schedule Image Generator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

<div align="center">

**🎓 Made with ❤️ for Vietnamese students**

**⭐ Nếu project hữu ích, hãy cho một star nhé! ⭐**

[⬆️ Back to Top](#-schedule-image-generator)

</div>

---
