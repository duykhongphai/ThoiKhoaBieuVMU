// ===========================================
// THỜI KHÓA BIỂU GENERATOR - PASTE VÀO CONSOLE
// ===========================================

(function() {
    console.log('🎓 Bắt đầu tạo thời khóa biểu...');
    
    function loadHtml2Canvas() {
        return new Promise((resolve, reject) => {
            if (window.html2canvas) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    function parseScheduleData() {
        const subjects = [];
        const rows = document.querySelectorAll('table tbody tr');
        
        let i = 0;
        while (i < rows.length) {
            const row = rows[i];
            const cells = row.querySelectorAll('td');
            
            // Kiểm tra xem có phải row chính (có đủ thông tin môn học) không
            if (cells.length >= 6) {
                const codeElement = cells[1]?.querySelector('span');
                const nameElement = cells[2]?.querySelector('a');
                const creditElement = cells[3]?.querySelector('span');
                const teacherElement = cells[5]?.querySelector('span');
                
                // Nếu có thông tin môn học đầy đủ
                if (nameElement) {
                    const code = codeElement?.textContent?.trim() || '';
                    const name = nameElement.textContent.trim().replace(/\s*\([^)]*\)\s*$/, '');
                    const credits = parseInt(creditElement?.textContent?.trim()) || 0;
                    const teacher = teacherElement?.textContent?.trim() || '';
                    
                    // Parse thời gian từ row hiện tại
                    const timeElement = cells[4];
                    const schedule1 = parseTimeInfo(timeElement);
                    
                    if (schedule1.day > 0) {
                        subjects.push({
                            code,
                            name,
                            credits,
                            day: schedule1.day,
                            periods: schedule1.periods,
                            room: schedule1.room,
                            teacher
                        });
                    }
                    
                    // Kiểm tra row tiếp theo có phải là lịch thứ 2 của cùng môn không
                    const nextRow = rows[i + 1];
                    if (nextRow) {
                        const nextCells = nextRow.querySelectorAll('td');
                        
                        // Nếu row tiếp theo chỉ có 1 cell (là cell thời gian do rowspan)
                        if (nextCells.length === 1) {
                            const schedule2 = parseTimeInfo(nextCells[0]);
                            
                            if (schedule2.day > 0) {
                                subjects.push({
                                    code,
                                    name,
                                    credits,
                                    day: schedule2.day,
                                    periods: schedule2.periods,
                                    room: schedule2.room,
                                    teacher
                                });
                            }
                            
                            i++; // Skip row tiếp theo vì đã xử lý
                        }
                    }
                }
            }
            
            i++;
        }
        
        console.log('📚 Đã parse được', subjects.length, 'lịch học từ', new Set(subjects.map(s => s.code)).size, 'môn:', subjects);
        return subjects;
    }
    
    function parseTimeInfo(timeElement) {
        const timeText = timeElement.textContent;
        let day = 0, periods = [], room = '';
        
        const dayMatch = timeText.match(/Thứ\s*(\d+)/);
        if (dayMatch) {
            day = parseInt(dayMatch[1]);
        }
        
        const periodMatch = timeText.match(/Tiết\s*([\d,\s]+)/);
        if (periodMatch) {
            periods = periodMatch[1].split(',').map(p => parseInt(p.trim())).filter(p => p);
        }
        
        const roomMatch = timeText.match(/Phòng\s*([^\n\r]*)/);
        if (roomMatch) {
            room = roomMatch[1].trim();
        }
        
        return { day, periods, room };
    }
    
    function createScheduleHTML(subjects) {
        const timeSlots = [
            "7:00-7:50", "8:00-8:50", "9:00-9:50", "10:00-10:50",
            "11:00-11:50", "13:00-13:50", "14:00-14:50", "15:00-15:50", "16:00-16:50", "17:00-17:50"
        ];
        
        const colors = [
            '#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', 
            '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD',
            '#00D2D3', '#FF9F43', '#10AC84', '#EE5A24'
        ];
        
        // Tạo map để gán màu cho mỗi môn (theo code)
        const uniqueCodes = [...new Set(subjects.map(s => s.code))];
        const colorMap = {};
        uniqueCodes.forEach((code, index) => {
            colorMap[code] = colors[index % colors.length];
        });
        
        let scheduleHTML = `
        <div id="scheduleImageContainer" style="
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 30px;
            margin: 0;
            width: 1100px;
            min-height: 750px;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <div style="
                background: white;
                border-radius: 20px;
                padding: 25px;
                box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                border: 1px solid #e9ecef;
            ">
                <!-- Schedule Table -->
                <table style="
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13px;
                    background: white;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
                ">
                    <thead>
                        <tr>
                            <th style="
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: white;
                                padding: 15px 10px;
                                text-align: center;
                                font-weight: 600;
                                font-size: 14px;
                                letter-spacing: 0.5px;
                                width: 120px;
                                border: none;
                            ">Tiết / Thứ</th>`;

        for (let day = 2; day <= 7; day++) {
            scheduleHTML += `
                            <th style="
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: white;
                                padding: 15px 10px;
                                text-align: center;
                                font-weight: 600;
                                font-size: 14px;
                                letter-spacing: 0.5px;
                                border: none;
                            ">Thứ ${day}</th>`;
        }
        
        scheduleHTML += `
                        </tr>
                    </thead>
                    <tbody>`;
        
        for (let period = 1; period <= 10; period++) {
            scheduleHTML += `
                        <tr>
                            <td style="
                                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                                font-weight: 600;
                                color: #495057;
                                padding: 12px 8px;
                                text-align: center;
                                border-right: 2px solid #dee2e6;
                                border-bottom: 1px solid #dee2e6;
                                min-height: 55px;
                            ">
                                <div style="font-size: 14px; margin-bottom: 3px; font-weight: 700;">Tiết ${period}</div>
                                <div style="font-size: 10px; color: #6c757d; font-weight: 500;">${timeSlots[period-1]}</div>
                            </td>`;
            
            // Các cột thứ
            for (let day = 2; day <= 7; day++) {
                const subject = subjects.find(s => s.day === day && s.periods.includes(period));
                
                if (subject) {
                    const color = colorMap[subject.code];
                    
                    scheduleHTML += `
                            <td style="
                                padding: 6px;
                                border-bottom: 1px solid #dee2e6;
                                border-right: 1px solid #dee2e6;
                                text-align: center;
                                vertical-align: middle;
                                min-height: 55px;
                                background: #fdfdfe;
                            ">
                                <div style="
                                    background: linear-gradient(135deg, ${color}e6, ${color});
                                    color: white;
                                    border-radius: 12px;
                                    padding: 8px 6px;
                                    font-size: 11px;
                                    line-height: 1.3;
                                    box-shadow: 0 3px 12px ${color}40;
                                    height: 100%;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    transition: all 0.3s ease;
                                    border: 1px solid ${color}80;
                                ">
                                    <div style="font-weight: 700; margin-bottom: 3px; font-size: 12px; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                                        ${subject.name.length > 18 ? subject.name.substring(0, 18) + '...' : subject.name}
                                    </div>
                                    <div style="font-size: 9px; opacity: 0.95; font-weight: 500;">${subject.room}</div>
                                </div>
                            </td>`;
                } else {
                    scheduleHTML += `
                            <td style="
                                padding: 6px;
                                border-bottom: 1px solid #dee2e6;
                                border-right: 1px solid #dee2e6;
                                text-align: center;
                                vertical-align: middle;
                                min-height: 55px;
                                background: linear-gradient(135deg, #fdfdfe 0%, #f8f9fa 100%);
                            "></td>`;
                }
            }
            
            scheduleHTML += `</tr>`;
        }
        
        scheduleHTML += `
                    </tbody>
                </table>
            </div>
        </div>`;
        
        return scheduleHTML;
    }

    async function downloadScheduleImage(subjects) {
        try {
            await loadHtml2Canvas();
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = createScheduleHTML(subjects);
            tempContainer.style.position = 'fixed';
            tempContainer.style.top = '-9999px';
            tempContainer.style.left = '-9999px';
            document.body.appendChild(tempContainer);
            const scheduleElement = tempContainer.querySelector('#scheduleImageContainer');        
            console.log('📸 Đang tạo ảnh...');
            const canvas = await html2canvas(scheduleElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: 1100,
                height: 750
            });
            const link = document.createElement('a');
            const fileName = `thoi-khoa-bieu-${new Date().toISOString().slice(0,10)}.png`;
            link.download = fileName;
            link.href = canvas.toDataURL('image/png', 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            document.body.removeChild(tempContainer);
            console.log('🎉 Đã tải ảnh thành công:', fileName);
        } catch (error) {
            console.error('❌ Lỗi khi tạo ảnh:', error);
            alert('Có lỗi xảy ra khi tạo ảnh. Vui lòng thử lại!');
        }
    }
    
    async function main() {
        try {
            console.log('🔍 Đang parse dữ liệu từ trang...');
            const subjects = parseScheduleData();
            
            if (subjects.length === 0) {
                console.warn('⚠️  Không tìm thấy dữ liệu thời khóa biểu!');
                alert('Không tìm thấy dữ liệu thời khóa biểu trên trang này!');
                return;
            }
            
            console.log('📊 Tìm thấy', subjects.length, 'lịch học');
            
            await downloadScheduleImage(subjects);
            
        } catch (error) {
            console.error('💥 Lỗi chung:', error);
            alert('Có lỗi xảy ra: ' + error.message);
        }
    }
    main();
    
})();

console.log(`
🎓 HƯỚNG DẪN SỬ DỤNG:
1. Mở trang thời khóa biểu của bạn
2. Nhấn F12 để mở Developer Tools  
3. Vào tab Console
4. Paste toàn bộ đoạn code này vào và nhấn Enter
5. Chờ một chút, ảnh sẽ được tải xuống tự động!

📝 Lưu ý: 
- Code hỗ trợ môn học có 2 buổi/tuần (rowspan)
- Cùng một môn sẽ có cùng màu trên các ngày khác nhau
`);
