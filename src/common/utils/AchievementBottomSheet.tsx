import React from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
import './AchievementBottomSheet.scss';

const sheetStyle = { borderRadius: '18px 18px 0px 0px' };

interface achievementBottomSheetType {
  name: string;
  cancelButtonHandler: () => void;
  bottomSheetIsOpen: boolean;
}
function AchievementBottomSheet({ name, cancelButtonHandler, bottomSheetIsOpen }: achievementBottomSheetType) {
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
          <div className="confirm-bottom-sheet">
            <div className="confirm-bottom-sheet-title">
              <div className="confirm-bottom-sheet-title-text">업적획득</div>
              <div className="confirm-bottom-sheet-title-sub-text">{name}</div>
            </div>
            <img
              src=""
              className="achievement-page-header-prev-arrow"
              alt="achievement-page-prev-arrow"
              aria-hidden="true"
            />
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}

export default AchievementBottomSheet;
