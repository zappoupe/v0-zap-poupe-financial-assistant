export default function DashboardLoading() {
  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/4"></div>
        <div className="h-4 bg-muted rounded w-1/3"></div>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
        ))}
      </div>
      
      <div className="grid gap-4 lg:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-96 bg-muted rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}