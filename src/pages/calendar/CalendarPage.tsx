import React from "react";
import FooterNavigation from "../../common/components/FooterNavigation";
import RecordHeader from "../../common/components/RecordHeader";
import Calender from "../../common/components/Calender";

function CalendarPage() {
  console.log(document.body.scrollHeight);
  document.body.scrollTop = document.body.scrollHeight;
    return <>
      <RecordHeader/>
      <Calender />
      <FooterNavigation/>
    </>
};

export default CalendarPage;