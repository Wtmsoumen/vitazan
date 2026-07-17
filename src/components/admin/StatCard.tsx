import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: "teal" | "pink" | "purple" | "amber";
}

const colorMap = {
  teal: { bg: "bg-teal/10", text: "text-teal", icon: "bg-teal" },
  pink: { bg: "bg-pink/10", text: "text-pink", icon: "bg-pink" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", icon: "bg-purple-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", icon: "bg-amber-500" },
};

export default function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${c.icon}`}>
          <Icon size={22} className="text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5">
        {trend === "up" ? (
          <TrendingUp size={16} className="text-emerald-500" />
        ) : (
          <TrendingDown size={16} className="text-red-500" />
        )}
        <span className={`text-sm font-medium ${trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
          {change}
        </span>
        <span className="text-sm text-gray-400">vs last month</span>
      </div>
    </div>
  );
}
