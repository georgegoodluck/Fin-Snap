interface StatCardProps {
    label: string;
    value: string;
    subtext: string;
    accent: "income" | "expense" | "neutral";
}

const accentStyles = {
    income: "border-t-income  text-income",
    expense: "border-t-expense text-expense",
    neutral: "border-t-ink     text-ink",
};

export function StatCard({ label, value, subtext, accent }: StatCardProps) {
    return (
        <div className="bg-card border border-border border-t-2 rounded-2xl p-5
                    flex flex-col gap-1">
            <span className={`text-[10px] font-semibold uppercase tracking-widest
                        text-muted`}>
                {label}
            </span>
            <span className={`font-display text-4xl font-bold leading-none
                        ${accentStyles[accent]}`}>
                {value}
            </span>
            <span className="text-xs text-muted mt-1">
                {subtext}
            </span>
        </div>
    );
}