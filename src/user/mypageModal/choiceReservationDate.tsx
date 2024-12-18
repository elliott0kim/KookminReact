import { useState } from 'react';

type MyModalProps = {
    reservationList:string[];
    setChoiceReservation: (choiceReservation:string) => void;
    isOpen:boolean;
    onClose: () => void;
};

export const ChoiceReservationDate = ({reservationList, setChoiceReservation, isOpen, onClose}:MyModalProps) => {
    const [selectedReservationDateIndex, setSelectedReservationDateIndex] = useState<number | null>(null); // 선택된 시간 상태

    const handleSelectedReservationDateIndex = (dateIndex:number) => {
        setSelectedReservationDateIndex(dateIndex);
    }

    const closeCurrentModal = () => {
        if (selectedReservationDateIndex == null || selectedReservationDateIndex > 3)
        {
            alert("날짜를 선택하여주세요");
            return;
        }

        setChoiceReservation(reservationList[selectedReservationDateIndex]);
        onClose();
    }

    let formattedReservationList:string[] = []

    const formatDate = (input: string): string => {
        // 문자열을 Date 객체로 변환
        const date = new Date(input);
    
        // 한국어로 날짜와 시간 포맷 설정
        const formatter = new Intl.DateTimeFormat("ko-KR", {
            month: "long", // 10월
            day: "numeric", // 30일
            weekday: "long", // 수요일
            hour: "numeric", // 오후 11시
            minute: "numeric", // 50분
            hour12: true, // 12시간제
        });
    
        // Date 객체를 포맷
        return formatter.format(date);
    };

    // console.log(reservationList);
    reservationList.forEach(reservation => {
        // console.log(formatDate(reservation));
        formattedReservationList.push(formatDate(reservation));
    });

    return (
        <div className="subpage-wrap mypage modal-common modal-choice-date">
            <div className="modal-title-wrap">
                <p className="page-title">멘토링 날짜 선택</p>
                <button className="btn-ico-only" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <p className="page-title visual-txt-sm">멘토링이 가능한 날짜를 골라주세요.</p>
            <div className="btns-wrap bottom-btns-wrap pb-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                {selectedReservationDateIndex === 0?
                <a className="btn btn-line-white btn-refund btn-refund-edit choice-list on" onClick={() => handleSelectedReservationDateIndex(0)}>{formattedReservationList[0]}</a>
                :<a className="btn btn-line-white btn-refund btn-refund-edit choice-list" onClick={() => handleSelectedReservationDateIndex(0)}>{formattedReservationList[0]}</a>
                }
            </div>
            <div className="btns-wrap bottom-btns-wrap pb-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                {selectedReservationDateIndex === 1?
                <a className="btn btn-line-white btn-refund btn-refund-edit choice-list on" onClick={() => handleSelectedReservationDateIndex(1)}>{formattedReservationList[1]}</a>
                :<a className="btn btn-line-white btn-refund btn-refund-edit choice-list" onClick={() => handleSelectedReservationDateIndex(1)}>{formattedReservationList[1]}</a>
                }
            </div>
            <div className="btns-wrap bottom-btns-wrap pb-2" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                {selectedReservationDateIndex === 2?
                <a className="btn btn-line-white btn-refund btn-refund-edit choice-list on" onClick={() => handleSelectedReservationDateIndex(2)}>{formattedReservationList[2]}</a>
                :<a className="btn btn-line-white btn-refund btn-refund-edit choice-list" onClick={() => handleSelectedReservationDateIndex(2)}>{formattedReservationList[2]}</a>
                }
            </div>

            <div className="btns-wrap bottom-btns-wrap pb-3 pt-4" style={{padding: "0 0 0 0", margin:"0 0 0 0"}}>
                <a className="btn btn-line-white btn-refund btn-refund-edit" onClick={() => closeCurrentModal()} style={{backgroundColor:"#000", color:"#fff"}}>날짜 확정하기</a>
            </div>
        </div>
    );
};


export default ChoiceReservationDate;