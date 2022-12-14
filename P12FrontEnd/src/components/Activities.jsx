import { getUserActivity } from "../service/userInformation";
import { useState, useEffect } from "react";
import BarChartUI from "./BarChartUI.jsx";
import Loading from "./Loading";
import PropTypes from "prop-types";

export default function Activities({ userId, isAPI }) {
  const [userActivity, setUserActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserActivity(userId, isAPI);
      setUserActivity(data.activity);
    };
    fetchData().catch(console.error);
  }, [userId]);

  if (!userActivity.length) return <Loading />;

  return (
    <div className="w-full h-80 bg-grey font-roboto shadow-boxSha rounded-[5px] relative">
      <p className="font-medium absolute left-8 top-6 text-[15px] text-[#20253A]">
        Activité quotidienne
      </p>
      <BarChartUI barData={userActivity} />
    </div>
  );
}

Activities.propTypes = {
  userId: PropTypes.number.isRequired,
};
