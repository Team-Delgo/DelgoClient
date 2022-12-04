import { AnyCnameRecord } from 'dns';
import React from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
import './DeleteBottomSheet.scss'

const sheetStyle = { borderRadius: '18px 18px 0px 0px' };

interface deleteBottomSheetType {
  text: string;
  description: string;
  cancelText: string;
  acceptText: string;
  acceptButtonHandler: () => void;
  cancelButtonHandler: () => void;
  bottomSheetIsOpen: boolean;
}
function DeleteBottomSheet({ text, description, cancelText, acceptText, acceptButtonHandler, cancelButtonHandler, bottomSheetIsOpen }: deleteBottomSheetType) {
  return (
    <Sheet isOpen={bottomSheetIsOpen} onClose={cancelButtonHandler} snapPoints={[300, 300, 100, 0]}>
      <Sheet.Container style={sheetStyle}>
        {/* <Sheet.Header /> */}
        <Sheet.Content>
          <div className="delete-bottom-sheet">
            <div className="delete-bottom-sheet-title">
              <div className="delete-bottom-sheet-title-text">{text}</div>
              <div className="delete-bottom-sheet-title-sub-text">{description}</div>
            </div>
            <div className="delete-bottom-sheet-button">
              <div className="delete-bottom-sheet-button-cancle" aria-hidden="true" onClick={cancelButtonHandler}>
                {cancelText}
              </div>
              <div className="delete-bottom-sheet-button-delete" aria-hidden="true" onClick={acceptButtonHandler}>
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

export default DeleteBottomSheet;
