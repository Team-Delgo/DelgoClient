import React, {useEffect} from "react";
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import FooterNavigation from "../../common/components/FooterNavigation";
import RecordHeader from "../../common/components/RecordHeader";
import Calender from "../../common/components/Calender";
import {analytics} from "../../index";

function CalendarPage() {
  const mutation = useAnalyticsLogEvent(analytics, "screen_view");
  
  useEffect(()=>{
    mutation.mutate({
      params: {
        firebase_screen: "Calendar",
        firebase_screen_class: "CalendarPage"
      }
    });
  },[]);
    return <>
      <RecordHeader/>
      <Calender />
      <FooterNavigation/>
    </>
};

export default CalendarPage;