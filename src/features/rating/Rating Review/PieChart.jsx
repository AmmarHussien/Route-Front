import { PieChart, Pie, Cell, Label } from "recharts";

function PieCharts({ data, COLORS, totalReviews }) {
  return (
    <PieChart width={316} height={316}>
      <Pie
        data={data}
        cx={160}
        cy={160}
        innerRadius={100}
        outerRadius={150}
        fill="#8884d8"
        dataKey="percentage"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <Label
          value={totalReviews} // Customize this text
          position="center"
          fill="#272424" // Change text color if needed
          style={{ fontSize: "14px", fontWeight: "600" }} // Customize the font size and weight
          dy={-10}
        />

        <Label
          value="Total Reviews" // Customize this text
          position="center"
          fill="#99A5BE" // Change text color if needed
          style={{ fontSize: "11px", fontWeight: "400" }} // Customize the font size and weight
          dy={10}
        />
      </Pie>
    </PieChart>
  );
}

export default PieCharts;
