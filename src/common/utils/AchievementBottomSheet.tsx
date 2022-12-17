import React from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
import X from '../icons/xx.svg';
import './AchievementBottomSheet.scss';

const sheetStyle = { borderRadius: '18px 18px 0px 0px' };
const sheetSnapPoints = [270, 270, 270, 270];

interface achievementType {
  achievementsId: number;
  desc: string;
  imgUrl: string;
  isActive: boolean;
  isMain: number;
  isMungple: boolean;
  name: string;
  registDt: string;
}

interface achievementBottomSheetType {
  text: string;
  achievement: achievementType | undefined;
  cancelButtonHandler: () => void;
  bottomSheetIsOpen: boolean;
}
function AchievementBottomSheet({
  text,
  achievement,
  cancelButtonHandler,
  bottomSheetIsOpen,
}: achievementBottomSheetType) {
  console.log('achievement', achievement);
  return (
    <Sheet
      className="confirm-bottom-sheet-container"
      isOpen={bottomSheetIsOpen}
      onClose={cancelButtonHandler}
      snapPoints={sheetSnapPoints}
    >
      <Sheet.Container style={sheetStyle}>
        <Sheet.Content>
          <div className="achievement-bottom-sheet">
            <div className="achievement-bottom-sheet-first-line">
              <div className="achievement-bottom-sheet-first-line-title">{text}</div>
              <div className="achievement-bottom-sheet-first-line-name">{achievement?.name}</div>
            </div>
            <div className="achievement-bottom-sheet-second-line">
              <div className="achievement-bottom-sheet-second-line-text">{achievement?.desc.split('/')[0]}</div>
            </div>
            <div className="achievement-bottom-sheet-second-line">
              <div className="achievement-bottom-sheet-second-line-text">{achievement?.desc.split('/')[1]}</div>
            </div>
            <div>
              <img
                src={achievement?.imgUrl}
                className="achievement-bottom-sheet-img"
                alt="achievement-bottom-sheet-img"
                width={103}
                height={113}
              />
            </div>
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
