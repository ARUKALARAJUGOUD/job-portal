const DashboardSkeleton = ({ rows = 4 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
        />
      ))}
    </div>
  );
};

export default DashboardSkeleton;