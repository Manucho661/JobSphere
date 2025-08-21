import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function JobTrendsChart({
  data = defaultData,
  title = "Job Trends",
  height = 320,
}) {
  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-header bg-white border-0">
        <h5 className="card-title mb-0 text-primary fw-bold">{title}</h5>
      </div>
      <div className="card-body">
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 10, right: 24, bottom: 8, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tickMargin={8} />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #dee2e6",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Legend wrapperStyle={{ paddingTop: 8 }} />

              {/* Lines */}
              <Line
                type="monotone"
                dataKey="posted"
                name="Posted Jobs"
                stroke="#0d6efd" // Bootstrap primary
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="expired"
                name="Expired Jobs"
                stroke="#dc3545" // Bootstrap danger
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="applicants"
                name="Applicants"
                stroke="#6c757d" // Bootstrap secondary
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const defaultData = [
  { label: "Week 1", posted: 12, expired: 2, applicants: 38 },
  { label: "Week 2", posted: 15, expired: 3, applicants: 52 },
  { label: "Week 3", posted: 10, expired: 5, applicants: 41 },
  { label: "Week 4", posted: 18, expired: 4, applicants: 67 },
  { label: "Week 5", posted: 16, expired: 7, applicants: 59 },
];