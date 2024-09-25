import { PieChart, Pie, Cell, Label } from "recharts";

function PieCharts({ data, COLORS, totalReviews }) {
  return (
    <PieChart width={316} height={250}>
      <Pie
        data={data}
        cx={130}
        cy={130}
        innerRadius={80}
        outerRadius={110}
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
          style={{ fontSize: "18px", fontWeight: "600" }} // Customize the font size and weight
          dy={-10}
        />

        <Label
          value="Total Reviews" // Customize this text
          position="center"
          fill="#99A5BE" // Change text color if needed
          style={{ fontSize: "14px", fontWeight: "400" }} // Customize the font size and weight
          dy={10}
        />
      </Pie>
    </PieChart>
  );
}

export default PieCharts;
