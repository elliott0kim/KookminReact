import React, { useRef, useState } from 'react';
import { mento } from '../mento/mento';
import { useNavigate } from 'react-router-dom';

interface MentoListProps {
  mentoList: mento[];
}

export function Slider({ mentoList }: MentoListProps) {
  // console.log(mentoList)
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [itemNum, setItemNum] = useState(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const MIN_DRAG_DISTANCE = 60; // 미세한 거리는 무시
  const SLIDE_THRESHOLD = 80; // 슬라이드를 이동하기 위한 최소 거리
  const ITEM_WIDTH = 100; // 슬라이드 아이템의 너비 비율 (%)

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX); // 터치 시작 좌표 저장
    setIsDragging(true); // 드래깅 시작
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX; // 터치 이동 거리 계산

    // 미세 이동은 무시
    if (Math.abs(deltaX) < MIN_DRAG_DISTANCE) return;

      setEndX(currentX); // 마지막 터치 좌표 업데이트
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${(deltaX * 0.5) - itemNum * ITEM_WIDTH}%)`; // 슬라이드 이동
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false); // 드래깅 종료
    const deltaX = endX - startX; // 터치 이동 거리 계산
    const itemCount = mentoList.length - 1; // 슬라이드 가능한 최대 아이템 수

    if (deltaX > SLIDE_THRESHOLD && itemNum > 0) {
      // 오른쪽으로 슬라이드
      setItemNum((prev) => prev - 1);
    } else if (deltaX < -SLIDE_THRESHOLD && itemNum < itemCount) {
      // 왼쪽으로 슬라이드
      setItemNum((prev) => prev + 1);
    } else {
      // 슬라이드 이동이 부족한 경우 원래 위치로 복원
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${-itemNum * ITEM_WIDTH}%)`;
      }
    }
  };

  const handlePrevClick = () => {
    if (itemNum > 0) setItemNum((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (itemNum < mentoList.length - 1) setItemNum((prev) => prev + 1);
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태

  const handleButtonClick = async (selectedMento: mento) => {
    // console.log('mentoring...');
    // console.log(selectedMento)
    navigate(`/mento?mentoId=${selectedMento.mentorId}`, { state: { getMento: selectedMento } });
  };

  return (
    <div>
      <div className="slider-btns-wrap">
        <button className="btn-slider btn-slider-prev" onClick={handlePrevClick}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="btn-slider btn-slider-next" onClick={handleNextClick}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div className="slider">
        <div
          className="slider-items-wrap"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            display: 'flex',
            transition: isDragging ? 'none' : 'transform 0.5s ease',
            transform: `translateX(${-itemNum * ITEM_WIDTH}%)`,
          }}
        >
          {mentoList.map((mento, index) => (
            <div className="slider-item" key={mento.mentoId}>
              <div className="card dark-card">
                <div className="card-img-top-area">
                  <img src={mento.mentorImg} alt="mentoImg" />
                </div>
                <div className="card-body">
                  <p className="card-title">
                    <span>{mento.nickname}</span>
                    <span className="card-sub-title">
                      <span>{mento.grade}</span>학년
                    </span>
                  </p>
                  <div className="list-wrap">
                    <div className="list-item">
                      <div className="list-label">주전공</div>
                      <div className="list-content">{mento.major}</div>
                    </div>
                    <div className="list-item">
                      <div className="list-label">부전공</div>
                      <div className="list-content">{mento.minor}</div>
                    </div>
                    <div className="list-item">
                      <div className="list-label">소개글</div>
                      <div className="list-content">
                        <span>{mento.introduceTitle}</span>
                        <br />
                        <span>{mento.introduceContent}</span>
                      </div>
                    </div>
                  </div>

                  <div className="btns-wrap">
                    <div>
                      <button
                        onClick={() => handleButtonClick(mento)}
                        disabled={loading}
                        className="btn btn-primary"
                      >
                        {loading ? '로딩 중...' : '더 알아보기'}
                      </button>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
