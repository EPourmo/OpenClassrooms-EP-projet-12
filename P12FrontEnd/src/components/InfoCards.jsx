import { getUserMainInfo } from "../service/userInformation";
import { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import Loading from "./Loading";
import PropTypes from "prop-types";

export default function InfoCards({ userId, isAPI }) {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserMainInfo(userId, isAPI);
      setUserInfo(data.userDailyAllowances());
    };

    fetchData().catch(console.error);
  }, [userId]);

  if (!userInfo.length) return <Loading />;

  const cards = userInfo.map((item) => {
    return (
      <InfoCard
        key={item.id}
        icon={item.iconName}
        width={item.width}
        height={item.height}
        color={item.color}
        quantity={item.quantity}
        dataName={item.tag}
        bgColor={item.bgColor}
      />
    );
  });

  return (
    <div className="w-full flex justify-between xl:flex-col xl:h-[613px] xl:w-[258px]">
      {cards}
    </div>
  );
}

InfoCards.propTypes = {
  userId: PropTypes.number.isRequired,
};
