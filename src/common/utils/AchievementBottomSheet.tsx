import React from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
import X from '../icons/xx.svg';
import './AchievementBottomSheet.scss';

const sheetStyle = { borderRadius: '18px 18px 0px 0px' };

interface achievementType {
  achievementsId: number;
  imgUrl: string;
  isActive: boolean;
  isMain: number;
  isMungple: boolean;
  name: string;
  registDt: string;
}

interface achievementBottomSheetType {
  achievement: any;
  cancelButtonHandler: () => void;
  bottomSheetIsOpen: boolean;
}
function AchievementBottomSheet({ achievement, cancelButtonHandler, bottomSheetIsOpen }: achievementBottomSheetType) {
  return (
    <Sheet
      className="confirm-bottom-sheet-container"
      isOpen={bottomSheetIsOpen}
      onClose={cancelButtonHandler}
      snapPoints={[300, 300, 100, 0]}
    >
      <Sheet.Container style={sheetStyle}>
        {/* <Sheet.Header /> */}
        <Sheet.Content>
          <div className="achievement-bottom-sheet">
            <div className="achievement-bottom-sheet-first-line">
              <div className="achievement-bottom-sheet-first-line-title">업적획득</div>
              <div className="achievement-bottom-sheet-first-line-name">{achievement?.name}</div>
            </div>
            <div className="achievement-bottom-sheet-second-line">
              <div className="achievement-bottom-sheet-second-line-sub-text">{achievement?.subtext}</div>
              <div className="achievement-bottom-sheet-second-line-text">{achievement?.subtext}</div>
            </div>
            <img
              src={achievement.imgUrl}
              className="achievement-bottom-sheet-img"
              alt="achievement-bottom-sheet-img"
              width={107}
              height={143}
            />
            <img
              src={X}
              className="achievement-bottom-sheet-x"
              alt="achievement-bottom-sheet-x"
              aria-hidden="true"
              onClick={cancelButtonHandler}
              width={21}
              height={21}
            />
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}

export default AchievementBottomSheet;
