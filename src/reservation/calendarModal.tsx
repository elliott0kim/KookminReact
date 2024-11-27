import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ButtonTracking } from '../components/ButttonTracking.js'
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

type MyModalProps = {
    mentoDate:string[];
    setMentoringDate: (mentoringDate:string) => void;
    isOpen:boolean;
    onClose: () => void;
};

export const CalendarSelect = ({mentoDate, setMentoringDate, isOpen, onClose}:MyModalProps) => {
    const location = useLocation();

    const today = new Date(); // 현재 날짜
    // 백엔드에서 남겨주는 날짜가.. JS랑 좀 다름..
    // 1 -> 월 , 2 -> 화, .... 7 -> 일
    const weekOfNum = {
        '7': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
    };
    const getDayName = (date: Date) => {
        const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        return days[date.getDay()];
    };    // console.log(mentoDate[0]);

    const [selectedTimeHour, setSelectedTimeHour] = useState(null); // 선택된 시간 상태
    const [createdConfirmButtons, setCreatedConfirmButtons] = useState([]); // 생성된 버튼의 상태

    const handleCreatedConfirmButtonClick = (timeHour) => {
        // console.log(timeHour)
        setSelectedTimeHour(timeHour); // 선택된 시간 업데이트
        // 클릭된 시간에 대한 새로운 버튼 추가
        setCreatedConfirmButtons((confirmButton) => 
        confirmButton.length === 0 
            ? ["해당 날짜로 선택하기"] 
            : confirmButton
        );
    };

    const handleConfirmButtonClick = (selectedDate, selectedTimeHour) => {
        // console.log(selectedDate)
        // console.log(selectedTimeHour)
        const parseChar = selectedTimeHour.split(" ")[0];
        let parseNum = parseInt(selectedTimeHour.split(" ")[1].slice(0, -1));
        if (parseChar == "오후" && parseNum != 12)
        {
            parseNum += 12;
        }
        let month:string = "";
        if ((selectedDate.getMonth() + 1) > 9)
        {
            month = `${selectedDate.getMonth() + 1}`;
        }
        else
        {
            month = `0${selectedDate.getMonth() + 1}`;
        }

        let day:string = "";
        if ((selectedDate.getDate()) > 9)
        {
            day = `${selectedDate.getDate()}`;
        }
        else
        {
            day = `0${selectedDate.getDate()}`;
        }
        ButtonTracking(location.pathname, "모달 내부 날짜선택 버튼");
        const selectedDateTime = `${selectedDate.getFullYear()}-${month}-${day} ${parseNum}:00:00`;
        // const selectedDateTime = `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 ${getDayName(selectedDate)} ${selectedTimeHour}`;
        // console.log(selectedDateTime);
        setMentoringDate(selectedDateTime);
        // console.log(selectedDateTime);
        onClose();
    };

    const mentoAvailableDateTime = {}; //여기에 수요일 오후 3시 이런식으로 들어가야함
    Object.entries(mentoDate[0]).forEach(([day, times]) => {
        // console.log(`${day}: ${times}`);
        let timeList = [];
        times.forEach(time => {
            //console.log(time);
            const timeHour = parseInt(time.split(':')[0], 10);
            if (timeHour > 12)
            {
                const changeTimeHour = timeHour - 12;
                timeList.push(`오후 ${changeTimeHour}시`);
            }
            else if (timeHour == 12)
            {
                timeList.push(`오후 12시`);
            }
            else
            {
                timeList.push(`오전 ${timeHour}시`);
            }
            
        });
        mentoAvailableDateTime[weekOfNum[day]] = timeList;
    });
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [dayOfWeek, setDayOfWeek] = useState(null);

    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date); // 선택된 날짜 저장
        const dayIndex = date.getDay(); // 선택된 날짜의 요일 인덱스
        setDayOfWeek(dayIndex); // 요일 문자열 설정
        setSelectedTimeHour(null);
        setCreatedConfirmButtons([]);
    };

    return (
        <div className='modal-layout'>
            <div className='bar'>
                <div className='text-layout'>
                    <div style={{fontSize:'16px', color:'#000', paddingTop:'10px'}}>멘토의 캘린더를 보고<br/>멘토와 함께 만나<br/> 이야기 나누고 싶은 날짜를<br/> 선택해주세요.</div>
                </div>
            </div>
            <div className='bar'>
                <Calendar
                    onChange={handleDateChange}  // 날짜 변경 핸들러 설정
                    value={selectedDate}         // 선택된 날짜 표시
                    locale='ko'
                    formatDay={(locale, date) => moment(date).format("D")} // 날짜 포맷에서 '일' 제거

                    // tileClassName: 지정된 날짜에 하이라이트 클래스 추가
                    tileClassName={({ date, view }) => {
                        const isPastDate = date < today; // 현재 날짜 이전인지 확인
                        
                        const availableDate = Object.keys(mentoAvailableDateTime).map(Number).includes(date.getDay()) ? true : false;
                        if (view === 'month' && (availableDate && !isPastDate)) {
                            return "highlight"; // CSS에서 'highlight' 클래스에 스타일 정의
                        }
                    }}

                    // tileDisabled: 지정된 날짜를 비활성화
                    tileDisabled={({ date, view }) => {
                        const isPastDate = date < today;
                        const availableDate = Object.keys(mentoAvailableDateTime).map(Number).includes(date.getDay()) ? true : false;
                        return (view === 'month' && (!availableDate || isPastDate));
                    }}

                    next2Label={null} // 다음 년도 버튼 숨기기
                    prev2Label={null} // 이전 년도 버튼 숨기기
                    onClickMonth={() => { return; }} // 월 클릭 시 처리 (비활성화)
                />

                {/* {selectedDate && (
                <p>선택된 날짜: {selectedDate.toLocaleDateString()} ({dayOfWeek})</p>
                )} */}

                <br />
                <div style={{display:'flex', flexDirection: 'row', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                    <img src="/images/available.png" alt="available" style={{width:'20px', height:'20px', marginRight:'10px'}}/>
                    <div style={{color:'#000', fontSize:'20px',marginRight:'20px'}}>가능</div>
                    <img src="/images/notAvailable.png" alt="notAvailable" style={{width:'20px', height:'20px', marginRight:'10px'}}/>
                    <div style={{color:'#000', fontSize:'20px',marginRight:'20px'}}>불가</div>
                </div>
                <br />
            </div>
            <div style={{width:'100%', paddingTop:"10px"}}>
            {!selectedDate ? (
                <div style={{ color: '#000', fontSize: '15px', lineHeight: '1.5' ,paddingBottom:"10px", paddingTop:"10px"}}>
                검은색 날짜를 클릭하면<br />멘토링 예약이 가능한 시간대를<br />살펴보실 수 있습니다.
                </div>
            ) : (
                <div>
                    {Object.entries(mentoAvailableDateTime).map(([day, timeHourList]) => 
                        parseInt(selectedDate.getDay()) === parseInt(day) ? (
                            <div>
                                {timeHourList.map(timeHour => (
                                    <div className="btns-wrap" key={timeHour} style={{paddingBottom:'10px'}}>
                                        <input
                                            type="button"
                                            className="btn btn-primary"
                                            value={`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 ${getDayName(selectedDate)} ${timeHour}`}
                                            style={{
                                                background: selectedTimeHour === timeHour ? '#F68536' : '#fff', // 클릭된 버튼 색상 변경
                                                borderColor:  (!selectedTimeHour ? '#000' : (selectedTimeHour === timeHour ? '#fff' : '#DBDBDB')), // 클릭된 버튼 색상 변경
                                                color: (!selectedTimeHour ? '#000' : (selectedTimeHour === timeHour ? '#fff' : '#DBDBDB')), // 클릭된 버튼 텍스트 색상 변경
                                                width: '100%'
                                            }}
                                            onClick={() => handleCreatedConfirmButtonClick(timeHour)} // 클릭 핸들러 추가
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div></div>
                        )
                    )}
                    <div style={{ marginTop: '20px' , paddingBottom:"10px"}}>
                        {createdConfirmButtons.map((buttonLabel, index) => (
                            <input
                                key={index}
                                type="button"
                                className="btn btn-secondary" // 다른 스타일 적용 가능
                                value={buttonLabel}
                                style={{ width: '100%', marginBottom: '10px' , backgroundColor:'#303030'}}
                                onClick={() => handleConfirmButtonClick(selectedDate, selectedTimeHour)} // 클릭 핸들러 추가
                            />
                        ))}
                    </div>
                </div>
            )}
            </div>

            <div>
                
            </div>
        </div>
    );
};


export default CalendarSelect;