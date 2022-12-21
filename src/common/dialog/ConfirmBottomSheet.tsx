import React from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
import './ConfirmBottomSheet.scss';

const sheetStyle = { borderRadius: '18px 18px 0px 0px' };
const sheetSnapPoints = [300,300,100,0]

interface confirmBottomSheetType {
  text: string;
  description: string;
  cancelText: string;
  acceptText: string;
  acceptButtonHandler: () => void;
  cancelButtonHandler: () => void;
  bottomSheetIsOpen: boolean;
}
function ConfirmBottomSheet({
  text,
  description,
  cancelText,
  acceptText,
  acceptButtonHandler,
  cancelButtonHandler,
  bottomSheetIsOpen,
}: confirmBottomSheetType) {
  return (
    <Sheet
      className="confirm-bottom-sheet-container"
      isOpen={bottomSheetIsOpen}
      onClose={cancelButtonHandler}
      snapPoints={sheetSnapPoints}
    >
      <Sheet.Container style={sheetStyle}>
        <Sheet.Content>
          <div className="confirm-bottom-sheet">
            <div className="confirm-bottom-sheet-title">
              <div className="confirm-bottom-sheet-title-text">{text}</div>
              <div className="confirm-bottom-sheet-title-sub-text">{description}</div>
            </div>
            <div className="confirm-bottom-sheet-button">
              <div className="confirm-bottom-sheet-button-cancle" aria-hidden="true" onClick={cancelButtonHandler}>
                {cancelText}
              </div>
              <div className="confirm-bottom-sheet-button-delete" aria-hidden="true" onClick={acceptButtonHandler}>
                {acceptText}
              </div>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}

export default React.memo(ConfirmBottomSheet);
