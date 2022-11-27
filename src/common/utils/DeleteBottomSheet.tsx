import { AnyCnameRecord } from 'dns';
import React from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';

const sheetStyle = { borderRadius: '18px 18px 0px 0px' };

interface deleteBottomSheetType {
  text: string;
  deleteButtonHandler: () => void;
  cancleButtonHandler: () => void;
  bottomSheetIsOpen: boolean;
}
function DeleteBottomSheet({ text, deleteButtonHandler, cancleButtonHandler, bottomSheetIsOpen }: deleteBottomSheetType) {
  return (
    <Sheet isOpen={bottomSheetIsOpen} onClose={cancleButtonHandler} snapPoints={[300, 300, 100, 0]}>
      <Sheet.Container style={sheetStyle}>
        {/* <Sheet.Header /> */}
        <Sheet.Content>
          <div className="delete-bottom-sheet">
            <div className="delete-bottom-sheet-title">
              <div className="delete-bottom-sheet-title-text">{text}을 삭제하실건가요?</div>
              <div className="delete-bottom-sheet-title-sub-text">지우면 다시 볼 수 없어요</div>
            </div>
            <div className="delete-bottom-sheet-button">
              <div className="delete-bottom-sheet-button-cancle" aria-hidden="true" onClick={cancleButtonHandler}>
                취소
              </div>
              <div className="delete-bottom-sheet-button-delete" aria-hidden="true" onClick={deleteButtonHandler}>
                삭제
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
