import { getUserPerformance } from "../service/userInformation";
import { useState, useEffect } from "react";
import RadarChartUI from "./RadarChartUI";
import Loading from "./Loading";
import PropTypes from "prop-types";

export default function Performances({ userId, isAPI }) {
  const [userPerformance, setUserPerformance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserPerformance(userId, isAPI);
      setUserPerformance(data.getOrganizedData());
    };

    fetchData().catch(console.error);
  }, [userId]);

  if (!userPerformance.length) return <Loading />;

  return (
    <div className="w-[258px] h-[263px] bg-darkGrey rounded-[5px]">
      <RadarChartUI radarData={userPerformance} />
    </div>
  );
}

Performances.propTypes = {
  userId: PropTypes.number.isRequired,
};
