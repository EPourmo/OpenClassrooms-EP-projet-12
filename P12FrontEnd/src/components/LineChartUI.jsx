import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

export default function LineChartUI() {
  const dataMocked = {
    sessions: [
      {
        day: 1,
        sessionLength: 30,
      },
      {
        day: 2,
        sessionLength: 23,
      },
      {
        day: 3,
        sessionLength: 45,
      },
      {
        day: 4,
        sessionLength: 50,
      },
      {
        day: 5,
        sessionLength: 0,
      },
      {
        day: 6,
        sessionLength: 0,
      },
      {
        day: 7,
        sessionLength: 60,
      },
    ],
  };

  function dayOfWeek(dayIndex) {
    if (dayIndex) return ["L", "M", "M", "J", "V", "S", "D"][dayIndex - 1];
  }

  const CustomizedAxisTick = (props) => {
    const { x, y, stroke, payload } = props;
    const dayNumber = payload.value;
    const dayStr = dayOfWeek(dayNumber);
    // console.log(date);

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} fill="#FFF" fontSize={12} opacity={0.6}>
          {dayStr}
        </text>
      </g>
    );
  };

  const renderLegend = () => {
    return <p>Durée moyenne des sessions</p>;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const styleMinute = {
        paddingLeft: 7,
      };
      return (
        <div className="custom-tooltip">
          <p
            className="label"
            style={styleMinute}
          >{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomCursor = (props) => {
    const { y, width } = props;
    return (
      <Rectangle
        fill="rgb(0,0,0,0.1 )"
        stroke="rgb(0,0,0,0.1 )"
        x={props.points[0].x}
        y={y}
        width={width}
        height={500}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={dataMocked.sessions}>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={CustomizedAxisTick}
          height={45}
          padding={{ left: 15, right: 15 }}
        />
        <YAxis hide={true} />
        <Tooltip
          cursor={<CustomCursor />}
          content={CustomTooltip}
          wrapperStyle={{
            width: 39,
            height: 25,
            backgroundColor: "#FFF",
            fontSize: 8,
            outline: "none",
            fontWeight: "bold",
          }}
        />
        <Legend
          align="left"
          verticalAlign="top"
          content={renderLegend}
          wrapperStyle={{
            top: 0,
            width: 150,
            height: 48,
            padding: 0,
            marginTop: 14,
            marginLeft: 34,
            fontSize: 15,
            opacity: 0.5,
            color: "#FFF",
          }}
        />
        <Line
          type="monotone"
          dataKey="sessionLength"
          stroke="#FFFFFF"
          activeDot={{
            stroke: "#fff",
            strokeWidth: 5,
            r: 4,
            strokeOpacity: 0.4,
          }}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}