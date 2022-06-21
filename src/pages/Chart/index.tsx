// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { Slider } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveBullet } from "@nivo/bullet";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    country: "Strat 1",
    "hot dog": 195,
    "hot dogColor": "hsl(159, 70%, 50%)",
    red: 150,
    redColor: "hsl(218, 70%, 50%)",
    yellow: 101,
    yellowColor: "hsl(289, 70%, 50%)",
    orange: 55,
    orangeColor: "hsl(121, 70%, 50%)",
    cyan: 129,
    cyanColor: "hsl(193, 70%, 50%)",
    green: 155,
    greenColor: "hsl(269, 70%, 50%)",
  },
  {
    country: "Strat 2",
    "hot dog": 90,
    "hot dogColor": "hsl(298, 70%, 50%)",
    red: 187,
    redColor: "hsl(256, 70%, 50%)",
    yellow: 112,
    yellowColor: "hsl(167, 70%, 50%)",
    orange: 27,
    orangeColor: "hsl(29, 70%, 50%)",
    cyan: 147,
    cyanColor: "hsl(113, 70%, 50%)",
    green: 195,
    greenColor: "hsl(210, 70%, 50%)",
  },
  {
    country: "Strat 3",
    "hot dog": 34,
    "hot dogColor": "hsl(317, 70%, 50%)",
    red: 38,
    redColor: "hsl(346, 70%, 50%)",
    yellow: 195,
    yellowColor: "hsl(322, 70%, 50%)",
    orange: 84,
    orangeColor: "hsl(47, 70%, 50%)",
    cyan: 66,
    cyanColor: "hsl(181, 70%, 50%)",
    green: 43,
    greenColor: "hsl(288, 70%, 50%)",
  },
  {
    country: "Strat 4",
    "hot dog": 11,
    "hot dogColor": "hsl(80, 70%, 50%)",
    red: 51,
    redColor: "hsl(28, 70%, 50%)",
    yellow: 86,
    yellowColor: "hsl(18, 70%, 50%)",
    orange: 131,
    orangeColor: "hsl(275, 70%, 50%)",
    cyan: 64,
    cyanColor: "hsl(73, 70%, 50%)",
    green: 139,
    greenColor: "hsl(114, 70%, 50%)",
  },
  {
    country: "Strat 5",
    "hot dog": 77,
    "hot dogColor": "hsl(305, 70%, 50%)",
    red: 39,
    redColor: "hsl(53, 70%, 50%)",
    yellow: 139,
    yellowColor: "hsl(351, 70%, 50%)",
    orange: 140,
    orangeColor: "hsl(24, 70%, 50%)",
    cyan: 156,
    cyanColor: "hsl(127, 70%, 50%)",
    green: 17,
    greenColor: "hsl(184, 70%, 50%)",
  },
];

interface IProps {
  data: any;
}

const MyResponsiveBar = ({ data }: IProps) => (
  <ResponsiveBar
    data={data}
    keys={["hot dog", "red", "yellow", "orange", "cyan", "green"]}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "cyan",
        },
        id: "dots",
      },
      {
        match: {
          id: "yellow",
        },
        id: "lines",
      },
    ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "country",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "ROI in $",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={function (e) {
      return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
    }}
  />
);

const data1 = [
  {
    id: "temp.",
    ranges: [62, 15, 85, 0, 100],
    measures: [93],
    markers: [80],
  },
  {
    id: "power",
    ranges: [
      0.02803423280433512, 0.30324760625760977, 1.6165833878336926, 0, 2,
    ],
    measures: [0.2814199220511634, 1.2800360746753192],
    markers: [1.227551324387963],
  },
  {
    id: "volume",
    ranges: [1, 26, 27, 9, 6, 26, 0, 60],
    measures: [8],
    markers: [56],
  },
  {
    id: "cost",
    ranges: [198785, 139887, 355575, 0, 500000],
    measures: [261966, 379530],
    markers: [445872],
  },
  {
    id: "revenue",
    ranges: [8, 1, 1, 0, 9],
    measures: [5],
    markers: [5.721286329349623, 7.049869662544528],
  },
];

const MyResponsiveBullet = ({ data }: IProps) => (
  <ResponsiveBullet
    data={data}
    margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
    spacing={46}
    titleAlign="start"
    titleOffsetX={-70}
    measureSize={0.2}
  />
);

export default function App() {
  return (
    <div style={{ height: 600, width: 1000 }}>
      <MyResponsiveBar data={data} />
      {/* <MyResponsiveBullet data={data1} /> */}
      <Slider defaultValue={30} />
      <Slider defaultValue={10} />
      <Slider defaultValue={40} />
      <Slider defaultValue={70} />
    </div>
  );
}
