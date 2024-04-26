import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
interface KlineItem {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
}
interface CandlestickSeriesData {
  x: number;
  y: [string, string, string, string];
}
const CandlestickChart = ({ symbol }: { symbol: string }) => {
  const [series, setSeries] = useState<ApexAxisChartSeries>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/cryptos/candlestick/${symbol}`
        );
        const data: KlineItem[] = await response.json();
        const preparedData: CandlestickSeriesData[] = data.map((item) => ({
          x: item.timestamp,
          y: [item.open, item.high, item.low, item.close],
        }));
        setSeries([{ data: preparedData }]);
      } catch (error) {
        console.error("Error fetching candlestick data:", error);
      }
    };
    fetchData();
  }, [symbol]);
  const options = {
    chart: {
      type: "candlestick" as const, // Using 'as const' for string literal type
    },
    xaxis: {
      type: "datetime" as const, // Using 'as const' for string literal type
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div id="chart">
      <ApexCharts options={options} series={series} type="candlestick" />
    </div>
  );
};
export default CandlestickChart;
