import React from "react";
import FooterNavigation from "../../common/components/FooterNavigation";
import RecordHeader from "../../common/components/RecordHeader";
import Calender from "../../common/components/Calender";

function CalendarPage() {
    return <>
      <RecordHeader/>
      <Calender />
      <FooterNavigation/>
    </>
};

export default CalendarPage;